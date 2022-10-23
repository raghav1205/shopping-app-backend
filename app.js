const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const LocalStrategy = require('passport-local')
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
dotenv.config();
const path = require('path')
 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
app.use(cors())

const uri = process.env.MONGO_URI
console.log(uri)
mongoose.connect(uri, { useNewUrlParser: true})
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error(err))

const User = require('./models/User')


// Routes
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const cartRoutes = require('./routes/cartRoute')
const secret = process.env.SECRET
const sessionConfig = {
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 ,
        maxAge: 1000 
    }
}

app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'))

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    })
 
app.use(authRoutes)
app.use(productRoutes)
app.use(reviewRoutes)
app.use(cartRoutes)



 
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server started on port 8080')
})