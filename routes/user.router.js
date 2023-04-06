const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');


const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const oldUser = await userModel.find({ email });
    if (oldUser.length > 0) {
      return res.status(200).send({ 'msg': 'User already exists' });
    }
    const encrypt = await bcrypt.hash(password, 5);
    const user = new userModel({ email, password: encrypt, confirmPassword: encrypt });
    await user.save();
    res.status(200).send({ 'msg': 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ 'msg': error.message });

  }

})





router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await userModel.find({ email });
    //  console.log(oldUser)
    if (oldUser.length > 0 && (await bcrypt.compare(password, oldUser[0].password))) {

      const token = jwt.sign({ "userID": oldUser[0]._id }, process.env.KEY, { expiresIn: "2h" });

      return res.status(200).send({ 'msg': 'Login Successful', "token": token });
    } else {

      res.status(200).send({ 'msg': 'Invalid Credentials' });
    }


  } catch (error) {
    res.status(400).send({ 'msg': error.message });

  }

})

module.exports = router;