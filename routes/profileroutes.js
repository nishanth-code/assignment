const express = require('express')
const profile = express.Router()
const profileController = require('../controllers/profileControllers')
const passport = require("passport");
const jwtToken = require('../middlewares/generatejwt')
const islogedin = require('../middlewares/islogedin')
const asynchandler = require('../errorHandler/asyncHandler')

profile.get('/',islogedin,asynchandler(profileController.retrive))
profile.post('/signup',asynchandler(profileController.newAccount))
profile.post('/signin',passport.authenticate('local'),asynchandler(jwtToken))
profile.put('/edit',islogedin,asynchandler(profileController.update))
profile.delete('/delete',islogedin,asynchandler(profileController.deleteAccount))

module.exports = profile