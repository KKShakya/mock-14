const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const userRouter = require('./routes/user.router');
const appointmentsRouter = require('./routes/appointemts.route');
require('dotenv').config();


const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors())


app.use(express.json())
app.use('/user',userRouter)
app.use('/appointments',appointmentsRouter);

app.get('/',(req,res)=>{
  res.status(200).send("Welcome to Masai Hospitals");
})


app.listen(PORT, async ()=>{
try {
  await connectDB;
  console.log(`server is connected to Db on ${PORT}`);
} catch (error) {
  console.log("error",error.message);
}
})