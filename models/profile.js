const mongoose = require('mongoose')
const schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose') 

const profileSchema = new schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    todos:[{type:schema.Types.ObjectId,ref:'todo'}]
})

profileSchema.methods.updatePassword = async function (newPassword) {
    this.password = await bcrypt.hash(newPassword, 10);
    const ack = await this.save();
    return ack
};




profileSchema.methods.comparePassword = async function (candidatePassword) {
return await bcrypt.compare(candidatePassword, this.password);

};
profileSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('profile',profileSchema)