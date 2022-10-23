const Product = require('../models/Product');
const User = require('../models/User')
const router = require('express').Router();

router.post('/products/:userid/new', async (req,res) => {
    const {name, img, price, desc} = req.body
    console.log(name)
    const userid = req.params.userid
    
    await Product.create({name, img, price, desc, author: userid})

    res.send({message: 'Product Created'})
})

router.get('/products', async (req,res) => {
    const products = await Product.find({}) 

    res.send(products)
})

router.get('/products/:productid', async (req,res) => {
    const product = await Product.findById(req.params.productid).populate('reviews')
    // console.log(product)
    res.send(product)
})
module.exports = router;