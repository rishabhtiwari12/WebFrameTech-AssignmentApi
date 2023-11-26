const express=require('express')
const Task = require('./../models/taskModel.js');
const moment=require('moment')

exports.createTask=async(req,res)=>{
    try {
        const { title, description, assignedUser, dueDate } = req.body;
    
        // Create a new task based on Task model
        const newTask = new Task({
          title,
          description,
          assignedUser,
          dueDate
        });
    
        // Save the new task to the database
        const createdTask = await newTask.save();
    
        res.status(201).json(createdTask); // Return the newly created task
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.getAllTask=async(req,res)=>{
    try {
    
        const tasks = await Task.find();
    
        res.status(200).json(
            {
                data:tasks
            }
        ); 
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.getOneTask=async(req,res)=>{
    try {
        const taskId = req.params.id;
    
        
        const task = await Task.findById(taskId);
    
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        res.status(200).json(
            {
                data:task
            }
        ); // Return the task as a JSON response
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.update=async(req,res)=>{
    try {
        const taskId = req.params.id;
        const updateData = req.body; // Data to update the task
    
        // Find the task by its ID and update it
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
    
        if (!updatedTask) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        res.status(200).json(updatedTask); // Return the updated task as a JSON response
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.deleteTask=async(req,res)=>{
    try {
        const taskId = req.params.id;
    
        
        const deletedTask = await Task.findByIdAndDelete(taskId);
    
        if (!deletedTask) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        res.status(200).json({ message: 'Task deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.getStats=async(req,res)=>{
    try {
        
        const dateSevenDaysAgo = moment().subtract(7, 'days').toDate();
    
        
        const completedTasksCount = await Task.countDocuments({
          completionStatus: true, 
          createdAt: { $gte: dateSevenDaysAgo } 
        });
    
        res.status(200).json({ 
            
                count:completedTasksCount,
            
         });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}