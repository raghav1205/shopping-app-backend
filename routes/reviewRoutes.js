const router = require('express').Router()
const Review = require('../models/Review')
const Product = require('../models/Product')
const User  = require('../models/User')

router.post('/products/:productid/review', async (req, res) => {
    try{
        const {rating, description, userId} = req.body
        console.log(req.body, 'hell')
        console.log(rating, description, userId)
        const productid = req.params.productid
        const user = await User.findById(userId)
        console.log(user)
        const username = user.username
        console.log(username)
        const review = await Review.create({rating,description, user: username})
        const product = await Product.findById(productid)
        console.log(product)
        product?.reviews?.push(review)
        await product.save()
        res.send({message: 'Review added'})
    }
    catch(err){ 
        console.log(err)
    }
})
     
router.delete('/products/:productid/review/:reviewid', async (req, res) => {
    try{
        const productid = req.params.productid
        const reviewid = req.params.reviewid
        const userid = req.body.userid
        console.log(userid)
        const user = await User.findById(userid)
        const review = await Review.findById(reviewid)
        console.log(user) 
        if(user.username !== review.user){
            res.send({message: 'You are not authorized to delete this review'})
        }
        const product = await Product.findById(productid)
        product?.reviews?.pull(reviewid)
        await product.save()
        await Review.findByIdAndDelete(reviewid)
        res.send({message: 'Review deleted'})
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router 