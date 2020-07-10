const express = require('express')
const router = express.Router()
const News = require('../../models/news')

router.get('/', async (req, res) => {

    const currentPage = req.query.page || 1
    const perPage = 5
    
    const news = await News.findAll({
        order: [['createdAt', 'DESC']],
        offset: (currentPage - 1) * perPage,
        limit: perPage
    })

    for(let i = 0; i < news.length; i++) {
        news[i].content = JSON.parse(news[i].content)
    }

    res.json({
        data: news
    })
     
})

router.get('/:id', async (req, res) => {

    const newspaper = await News.findByPk(req.params.id)

    res.status(201).json({
        data: JSON.parse(newspaper.content)
    })
    
})


module.exports = router