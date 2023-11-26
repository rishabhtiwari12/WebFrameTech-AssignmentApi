const express=require('express');
const router=express.Router();
const authController=require('../controller/authController.js')
router
     .post('/signup',authController.signup)
     .post('/login',authController.login)


module.exports=router