const express = require('express')
const router = express.Router()
const News = require('../../models/news')
const SaleStory = require('../../models/sale-story')
const User = require('../../models/user')
const Product = require('../../models/products')

// Add a new seller
// router.post('/add', (req, res) => {

//     const {username, password, email} = req.body

//     User.build({
//         username,
//         password,
//         email,
//         seller: true
//     }).then(result => {
//         res.status(200).json({
//             msg: `You have created a new SELLER!`
//         })
//     })
    
// })

router.post('/add', (req, res) => {

    const {content} = req.body
    
    News.create({content})
    .then(result => {
        res.status(200).json({
            msg: "You have created a page new"
        })
    })
})


router.delete("/remove", (req, res) => {

    const {username} = req.body
    
    User.destroy({where: {username}})
    .then(result => {
        res.status(200).json({
            msg: `You have deleted a SELLER!`
        })
    })
})

router.get('/story', (req, res) => {
    SaleStory.findAll({order: [['createdAt', 'DESC']]}).then(story => {
        res.status(201).json({
            data: story
        })
    })
})

router.post('/addproduct', (req, res) => {
    const {name, price, description, amount, address} = req.body
    Product.create({
        name,
        description,
        amount,
        imageUrl: req.file.path,
        address,
        price
    })
    res.status(201).json({
        msg: 'Created new product'
    })
})

router.post('/hideproduct', async (req, res) => {
    const {productid} = req.body
    const product = await Product.findByPk(productid)
    product.active = false
    await product.save()
    res.status(201).json({
        msg: 'Hidden product'
    })
})

module.exports = router