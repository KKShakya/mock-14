const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DocModel } = require('../models/appointments.model');
const { authenticate } = require('../middlewares/authenticate.middleware');
// const { userModel } = require('../models/user.model');


const router = express.Router();
// router.use(authenticate);
router.get('/',async (req,res)=>{
  let {filter,sort,search,page} = req.query;
  let docs;
try {
  if(filter&&search&&sort){
    docs = await DocModel.find({'name':search,specialization:filter}).sort({date : sort}).skip((page-1)*4).limit(4)
  }
  else if(search){
     docs = await DocModel.find({'name':search}).skip((page-1)*4).limit(4)
  }else  if(sort){
    sort = sort=='asc'?1:-1;
    console.log(sort)
    docs = await DocModel.find().sort({date : sort}).skip((page-1)*4).limit(4)
 }else  if(filter){
  docs = await DocModel.find({specialization:filter}).skip((page-1)*4).limit(4)
}
 else{
  docs = await DocModel.find({})
 }
  res.status(200).json(docs);
} catch (error) {
  res.status(400).send({'msg': error.message});
}
})


router.post('/',async (req,res)=>{
 try {
   const doc = new DocModel(req.body);
   await doc.save();
   res.status(200).send({'msg':'Posted successfully'})
 } catch (error) {
  res.status(400).send({'msg': error.message});
 }

})


router.patch('/:id',async (req,res)=>{
  const _id = req.params.id;

  try {
    const doc = await DocModel.findByIdAndUpdate({_id},req.body);
    
    res.status(200).send({'msg':'Booked successfully'});
  } catch (error) {
   res.status(400).send({'msg': error.message});
  }
 
})


module.exports = router;