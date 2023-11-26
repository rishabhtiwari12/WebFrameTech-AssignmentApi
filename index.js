const express=require('express');
const Connection=require('./Database/db.js')
const mongoose =require('mongoose')
const userRouter=require('./routes/userRoutes.js')
const taskRouter=require('./routes/taskRoutes.js')
const dotenv=require('dotenv');
const app=express();
const bodyParser=require('body-parser');

let port=3000;
dotenv.config();


app.use(bodyParser.json())

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


app.use('/api/v1/user',userRouter)
app.use('/api/v1/task',taskRouter)


Connection(USERNAME,PASSWORD)

app.listen(port,(req,res)=>{
   console.log(`server is running on port ${port}`);
})