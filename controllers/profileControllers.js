const todo = require('../models/todo')
const profile = require('../models/profile')
const jwt = require('jsonwebtoken');
const passport = require("passport");


const newAccount = async(req,res) =>{
    const {username,email,password}=req.body
    const account = new profile({username:username,email:email})
    const newAccount = await profile.register(account,password)
    if(newAccount){
        res.status(200).json({msg:'created sucessfully'})
    } else{
        res.status(500).json({msg:'unsucessful'})
    }

}

const retrive = async(req,res) =>{
    const uid = req.userid
    const currentUser = await profile.findById(uid).populate('todos')
    res.status(200).json(currentUser)
}

const update = async(req,res)=>{
    const uid = req.userid
    const currentUser = await profile.findById(uid)
    const {username,password,email} = req.body
    await profile.findByIdAndUpdate(uid,{username:username,email:email})
    
    const hashedpassword = await currentUser.setPassword(password, async(err) => {
        if (err) {
           res.status(500).json({err});
        }
            console.log('hit')
            await currentUser.save()
        res.status(200).json({msg:'profile updated sucessfully'})}
)

    }

const deleteAccount = async(req,res) =>{
    const uid = req.userid
    const currentUser = await profile.findById(uid).populate('todos')
    const {todos} = currentUser
    await todo.deleteMany({_id:{$in:todos}})
    await profile.findByIdAndDelete(uid)
    res.status(200).json({msg:'profile deleted sucessfully'})



}


 module.exports = {retrive,newAccount,deleteAccount,update}
        
