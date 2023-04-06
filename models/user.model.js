const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  password:{
  type:String,
  required:true,
},
  confirmPassword:String,

})

const userModel = mongoose.model('user',userSchema);

module.exports  = {userModel};