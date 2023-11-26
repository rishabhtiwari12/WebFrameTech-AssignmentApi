const express=require('express');
const router=express.Router();
const taskController=require('../controller/taskController.js')
const authController=require('../controller/authController.js')
router
     .post('/createTask', authController.protect, taskController.createTask)
     .get('/getAllTask', taskController.getAllTask)
     .get('/getOneTask/:id', taskController.getOneTask)
     .post('/updateTask/:id',authController.protect, taskController.update)
     .delete('/deleteTask/:id',taskController.deleteTask)
     
router.
     get('/lastSevenDayCompleted',taskController.getStats)

module.exports=router