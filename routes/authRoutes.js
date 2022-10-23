
const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

// Register
router.post('/register', async (req, res) => {
        console.log(req.body);
    try{
        const {username, email, password, userType} = req.body;
        const user = new User({username, email, userType});
        await User.register(user, password);
        res.status(201).send({message: 'User registered'}); 
    }
    catch(e){
        res.send(e);
    }
})
router.post('/login',function(req, res, next) {
passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { 
      // *** Display message without using flash option
      // re-render the login form with a message
      return res.status(401).send({message: info.message})
    }
    req.logIn(user, async function(err) {
      if (err) { return next(err); }
      console.log(req.user)
      const user = await User.findById(req.user._id)
      return res.status(201).send({message :  'Login successful', data : {email: req.user.email, username: req.user.username,
         id: req.user._id, cart: user.cart, userType: user.userType}});
    });
  })(req, res, next)}
);

router.get('/logout', (req, res) => {
  
      req.logout((err)=> {
          if (err) { return next(err); }
          return res.status(201).send({message :  'Logout successful'})
      });
 
   
})

module.exports = router;