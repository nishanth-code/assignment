const express = require('express')
const app = express()
const session = require('express-session')
const helmet = require('helmet')
const profile = require('./models/profile')
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const dbConnect = require("./controllers/dbconfig")

dbConnect();

const sessionDetails = {
    secret: 'userCredentials',
    resave: false,
    saveUninitialized: true,
    
    cookie:{
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        maxAge: 1000*60*60*24,
        sameSite: 'lax',
    }
  }
app.use(session(sessionDetails))
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet())
  
  
passport.use(new passportLocal(profile.authenticate()));
passport.serializeUser(profile.serializeUser());
passport.deserializeUser(profile.deserializeUser());

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({msg:"hello welcome to  rest api"})
})

app.use('/profile',require('./routes/profileroutes'))
app.use('/todo',require('./routes/todoRoutes'))

app.listen(5000, () => {
    console.log("port running on 5000");
});


//global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Internal Server Error'
      }
    });
  });
  