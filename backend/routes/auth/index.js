const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const isAuth = require('../../middleware/isAuth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// router.get('/:id', isAuth, (req, res) => {
//     const {id} = req.params
    
// })

router.post('/register', (req, res) => {
    const {username, password, email} = req.body
    // console.log(req.body)
    User.count({where: {username}, raw: true})
    .then(result => {
        // console.log(result)
        if (result !== 0) {
            return false
        }
        return true
    }).then(result => {
        // console.log(result)
        if(result) {
            User.create({
                username,
                password,
                email
            })
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    })
})

router.post('/login', (req, res) => {
    User.findOne({where: { username: req.body.username }, raw: true})
    .then(user => {
        console.log(user)
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign({
                data: user.username
            }, 'ekingswannasecret', {expiresIn: 60 * 60 * 24 * 7})
            res.status(200).json({
                username: user.username,
                isAdmin: user.isAdmin,
                token: token,
                balance: user.capsBalance
            })
        } else {
            res.sendStatus(403)
        }
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(404)
    })
})

module.exports = router