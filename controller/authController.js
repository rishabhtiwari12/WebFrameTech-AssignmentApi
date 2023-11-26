const express=require('express')
const jwt = require('jsonwebtoken');
const User = require('./../models/userModels.js');
const bcrypt = require('bcryptjs');

exports.signup=async(req,res)=>{
     
    try {
        const { name,email,password,passwordConfirm } = req.body;
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        
    
        // Create a new user
        const newUser = new User({
          name,
          email,
          password,
          passwordConfirm
        });
    
        // Save the user to the database
        await newUser.save();
    
        // Generate JWT token
        const token = jwt.sign(
          { userId: newUser._id, email: newUser.email },
           process.env.JWT_SECRET, // Replace with your own secret key
          { expiresIn: '1h' } // Token expiration time
        );
    
        res.status(201).json({
            status: 'success',
            token,
            data: {
              newUser
            }
          });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
}

exports.login=async(req,res)=>{
    try {
        const { email, password } = req.body;
      
        
        const user = await User.findOne({ email }).select('+password');
        
      
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
    
        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch)
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
             process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
          );
      
    
        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }


}

exports.protect=async(req,res,next)=>{
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
    
      const bearer = bearerHeader.split(' ');
  
    
      const token = bearer[1];
  
      // Verify the token
      jwt.verify(token,  process.env.JWT_SECRET, (err, authData) => {
        if (err) {
          res.sendStatus(403); // Forbidden if token is invalid
        } else {
          // If token is valid, add the user data to the request object for further handling
          req.authData = authData;
          next(); 
        }
      });
    } else {
      // No token provided
      res.sendStatus(401); // Unauthorized
    }

}