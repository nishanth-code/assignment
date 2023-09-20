const express = require('express')
const todoRouter = express.Router()
const islogedin = require('../middlewares/islogedin')
const todocontroller = require('../controllers/todoController')
const asynchandler = require('../errorHandler/asyncHandler')


todoRouter.get('/',islogedin,asynchandler(todocontroller.retriveAll))
todoRouter.get('/:id',islogedin,asynchandler(todocontroller.retrive))
todoRouter.post('/add',islogedin,asynchandler(todocontroller.add))
todoRouter.put('/edit/:id',islogedin,asynchandler(todocontroller.update))
todoRouter.delete('/delete/:id',islogedin,asynchandler(todocontroller.deleteTodo))

module.exports = todoRouter