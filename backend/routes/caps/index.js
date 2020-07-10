const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const CapCodes = require('../../models/cap-codes')
const UserCaps = require('../../models/user-caps')
const CapTypes = require('../../models/cap-types')

const keyGenerate = require('../../utils/keyGenerator')
const counter = require('../../utils/counter')
// const isAuth = require('../../middleware/isAuth')
// const jwt = require('jsonwebtoken')

// for admin
router.post('/add', async (req, res) => {
    // console.log(req.file.path)
    const { name, price, amount } = req.body
    
    const { id } = await CapTypes.create({
        stickerUrl: req.file.path,
        name,
        price,
        amount
    })
    
    const capType = await CapTypes.findByPk(id)

    if (capType !== null) {
        for (let i = 1; i <= amount; i++) {
            capType.createCapcode({
                secretCode: keyGenerate(7)
            })
        }
        res.status(200).json({
            msg: `You have created a new ${name} cap!`,
            data: capType
        })
    }

})

router.post('/fetch', async (req, res) => {
    const {username} = req.body
    const user = await User.findOne({where: {username}})
    const userCaps = await user.getCapcodes()
    let data = [];
    for (let i = 0; i < userCaps.length; i++) {
        const captype = await CapTypes.findOne({where: {id: userCaps[i]['captypeId']}})
        data.push(captype)
    }
    
    res.json({
        data
    })
    
})

router.get('/', (req, res) => {
    CapTypes.findAll().then(caps => {
        res.status(200).json({
            data: caps
        })
    })
})

router.post('/', async (req, res) => {
    const {username} = req.body
    const user = await User.findOne({where: {username}})
    user.getCapcodes().then(caps => {
        res.status(201).json({
            data: caps
        })
    })
})

router.post('/balance', (req, res) => {
    User.findOne({where: {username: req.body.username}})
    .then(user => {
        res.status(201).json({
            data: user.capsBalance
        })
    }) 
})

// for all simple users
router.post('/collect', async (req, res) => {
    const { capCode, username } = req.body
    
    const cap = await CapCodes.findOne({where: { secretCode: capCode }})
    const user = await User.findOne({where: {username}})
    
    if(cap !== null) {

        // const capCollected = await Caps.findOne({where: { captypeId: cap.id, userId }})
        // console.log("WORKS")
        if (cap.active) {
            // console.log("WORKS")
            // if (capCollected === null) {
                // const userCap = UserCaps.findOne({where: {capcodeId: cap.id}})
                user.addCapcode(cap, {through: UserCaps})
                const captype = await cap.getCaptype()
                user.increment({capsBalance: captype.price})
                cap.active = false
                await cap.save()
                const { count } = await CapCodes.findAndCountAll({where: {captypeId: captype.id, active: true}})
                res.status(201).json({
                    amountLeft: count,
                    amountGiven: captype.amount,
                    price: captype.price,
                    imageUrl: captype.stickerUrl,
                    name: captype.name,
                    msg: `You won ${captype.name}! Such caps already left ${count} and you earn ${captype.price}!`
                })
            // } 
        } else {
            res.status(400).json({
                msg: `Such cap is already used`
            })
        }
            // capCollected.increment({capsCollected: 1})
    }  else {
        res.status(400).json({
            msg: `OOOpss! Idk that cap`
        })
    } 
        // cap.decrement({amount: 1})
        // user.increment({capsBalance: cap.price})
    
})

// for admin
router.delete('/remove', async (req, res) => {
    const { name } = req.body
    const Captype = await CapTypes.findOne({where: {name}})
    const capId = Captype.id

    CapCodes.destroy({
        where: {
            captypeId: capId
        }
    }).then(result => {
        Captype.destroy({
            where: {
                name
            }
        }).then(result => {
            res.json({
                msg: `Deleted all caps with name ${name}`
            })
        })
    })
    
    
      

    // const cap = await CapTypes.findOne({where: { secretCode: capCode }})
    
    // if (cap !== null) {
    //     Caps.destroy({
    //         where: { 
    //             capId: cap.id
    //         }
    //     })
    // }
    
    
})

module.exports = router
