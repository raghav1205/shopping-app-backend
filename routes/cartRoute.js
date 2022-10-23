const User = require('../models/User');
const Product = require('../models/Product');
const router = require('express').Router();

router.get('/cart/:userid', async (req, res) => {
    const userid = req.params.userid;
    const user = await User.findById(userid);
    const cart = user.cart;
    const totalAmount = cart.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0);
    res.status(200).send({cart, totalAmount});
    
})

router.delete('/cart/:productid/decrement', async (req, res) => {
    const productid = req.params.productid
    console.log(productid)
  
    const userid = req.body.userid 
    const user = await User.findById(userid)
    let cart = user.cart
    const product = cart.find(product => product.id == productid)
   
    if(product){
        product.count--
        if(product.count === 0){
        
            cart = cart.filter(product => product.id === productid)
            console.log(cart)
        }
    }
    await user.save() 
    res.send({message: 'Reduced Count'})
})

router.post('/cart/:productid/increment', async (req, res)=>{
    const productid = req.params.productid
    console.log(productid)

    const userid = req.body.userid
    const user = await User.findById(userid)
    const cart = user.cart
    const product = cart.find(product => product.id == productid)
   
    if(product){
        product.count++
    }
 
    await user.save()
    res.send({message: 'Increased Count'})
})

router.post('/product/:productid/cart',async (req, res) => {
    const productid = req.params.productid;
    const userid = req.body.userid;
    const user = await User.findById(userid)
    console.log(user)
    const cart = user.cart;
    const product = cart.find(product => product.id == productid);
    if(product){
        product.count++;
    }
    else{
        const product = await Product.findById(productid);
        cart.push({
            name: product.name, 
            price: product.price, 
            img: product.img,
            id: product._id
        }) 
    }
    await user.save();
    res.send({message: 'Product added to cart'});


})

module.exports = router;