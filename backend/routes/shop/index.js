const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Product = require('../../models/products')
const UserProducts = require('../../models/user-products')
const SaleStory = require('../../models/sale-story')

router.get('/', (req, res) => {
    Product.findAll({where: {active: true}})
    .then(products => {
        res.status(201).json({
            data: products
        })
    })
})

router.post('/fetch', async (req, res) => {
    const {username} = req.body
    const user = await User.findOne({where: {username}})
    const prods = await user.getProducts()

    let data = [];
    for (let i = 0; i < prods.length; i++) {
        let {name, imageUrl, description, address, price} = prods[i] 
        data.push({
            name,
            imageUrl,
            description,
            address,
            price,
            amount: prods[i].userproduct.amount,
            lastPurchase: prods[i].userproduct.updatedAt
        })
    }
    
    res.json({
        data
    })
})

router.post('/buy', async (req, res) => {

    const {username, productid} = req.body

    const user = await User.findOne({where: {username}})
    const product = await Product.findByPk(productid)

    if(user.capsBalance >= product.price) {
        user.decrement({capsBalance: product.price})
        
        let userProducts = await UserProducts.findOne({where: {userId: user.id, productId: product.id}})

        if (userProducts !== null) {
            userProducts.increment({amount: 1})
        } else {
            user.addProduct(product, {through: UserProducts})
        }
        product.decrement({amount: 1})

        if(product.amount === 0) {
            product.active = false
            await product.save()
        }

        SaleStory.create({
            username: user.username,
            productName: product.name,
            productImage: product.imageUrl,
            productPrice: product.price
        })
        
        res.status(201).json({
            price: product.price,
            imageUrl: product.imageUrl,
            title: product.name,
            description: "Go to the next address to take it: " + product.address
        })
    } else {
        res.status(400).json({
            msg: 'Недостаточно средств'
        })
    }

})

module.exports = router