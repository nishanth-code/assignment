const todo = require('../models/todo')
const profile = require('../models/profile')

const add = async(req,res) => {
    const {title,description} = req.body
    const uid = req.userid
    const currentUser = await profile.findById(uid)
    const newTodo = new todo({title:title,description:description})
    currentUser.todos.push(newTodo)
    await newTodo.save()
    await currentUser.save()
    res.status(200).json({msg:'added sucessfully'})
}

const update = async(req,res) =>{
    const {title,description,status} = req.body
    const id = req.params.id
    await todo.findByIdAndUpdate(id,{title:title,description:description,completed:status})
    res.status(200).json({msg:'updated sucessfully'})
}

const retriveAll = async(req,res) =>{
    const uid = req.userid
    const currentUser = await profile.findById(uid).populate('todos')
    const {todos} = currentUser
    res.status(200).json(todos)

}

const retrive = async(req,res) =>{
    const id = req.params.id
    const todos = await todo.findById(id)
    res.status(200).json(todos)

}
const deleteTodo = async(req,res)=>{
    const uid = req.userid
    const currentUser = await profile.findById(uid)
    const tid = req.params.id
    await todo.findByIdAndDelete(tid)
    currentUser.todos.splice(currentUser.todos.indexOf(tid),1)
    await currentUser.save()

    res.status(200).json({msg:'deleted sucessfully'})
}


module.exports = {add,update,retriveAll,retrive,deleteTodo}