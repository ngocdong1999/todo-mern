const express = require('express');
const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

// @route GET /api/auth
// @desc Checked if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) return res.status(400).json({success: false, message: 'User not found'})
        res.json({success: true, user});

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error'})

    }
    
})

// @route POST /api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    // Check required username and password
    if(!username || !password){
        return res.status(400).json({success: false, message: 'Missing username or/and password' });
    }
    try{
        // Check username already registered
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({success: false, message: 'Username already registered'})
        }

        // All good
        const hashPassword = await argon2.hash(password);
        const newUser = new User({username, password: hashPassword});
        await newUser.save();

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ success: true, message: 'User created successfuly', accessToken});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error'})

    }
})

// @route POST /api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    // Check required username and password
    if(!username || !password)
        return res.status(400).json({success: false, message: 'Missing username or/and password'})

    try {
        // Check for existing user
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({success: false, message: 'Incorrect username or password'});
        }
        
        // Check for password of user
        const passwordValid = await argon2.verify(user.password, password);
        if(!passwordValid){
            return res.status(400).json({success: false, message: 'Incorrect username or password'});
        }

        // All good
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({success: true, message: 'User logged successfully', accessToken})

    } catch (error) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error'})
        
    }
})

module.exports = router;