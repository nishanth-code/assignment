const todo = require('../models/todo')
const profile = require('../models/profile')


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
    await currentUser.setPassword(password, async(err) => {
        if (err) {
          return res.status(500).json({err});
        }else{
            await currentUser.save()
        return res.status(200).json({msg:'profile updated sucessfully'})}
        })
    }

const deleteAccount = async(req,res) =>{
    const uid = req.userid
    const currentUser = await profile.findById(uid).populate('todo')
    const {todos} = currentUser
    await todo.deleteMany({_id:{$in:todos}})
    res.status(200).json({msg:'profile deleted sucessfully'})



}
 module.exports = {retrive,newAccount,deleteAccount,update}
        
