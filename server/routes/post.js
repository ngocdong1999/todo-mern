const express = require('express');
const Post = require('../models/Post');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

// @route PUT /api/posts/:id
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    //Check required
    if(!title){
        return res.status(400).json({success: false, message:'Title is not required'})
    }

    try {
        let updatePost = { 
            title, 
            description: description || '', 
            status: status || 'TO DO', 
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
        }

        const postUpdateCondition = {_id: req.params.id, user: req.userId}

        updatePost = await Post.findByIdAndUpdate(postUpdateCondition, updatePost, {new: true})

        // User not authorised to update post or post not found
        if(!updatePost)
            return res.status(401).json({success: false, message: 'Post not found or user not authorised'});
        
        res.json({ success: true,message: 'Updated post successfully', post: updatePost})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error'})
    
    }
})


// @route GET /api/posts
// @desc Read posts
// @access Private
router.get('/', verifyToken ,async (req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).sort({createdAt: 'desc'}).populate('user', ['username']);
        if(!posts)
            return res.status(200).json({success: true, message:''});
        res.json({success: true, posts})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error'})
    
    }
})

// @route POST /api/posts
// @desc Create post
// @access Private
router.post('/' ,verifyToken ,async (req, res) => {
    const { title, description, status, url } = req.body;

    //Check required
    if(!title){
        return res.status(400).json({success: false, message:'Title is not required'})
    }

    try {
        const newPost = new Post({
            title, 
            description, 
            status: status || 'TO DO', 
            url: url.startsWith('https://') ? url : `https://${url}`,
            user: req.userId,
        });
        await newPost.save();

        res.json({ success: true, message: 'Post created successfully', post: newPost})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error'})
    
    }
})

// @route DELETE /api/posts/:id
// @desc Delete post
// @access Private

router.delete('/:id', verifyToken ,async (req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}

        deletePost = await Post.findOneAndDelete(postDeleteCondition)

        // User not authorised to update post or post not found
        if(!deletePost)
            return res.status(401).json({success: false, message: 'Post not found or user not authorised'});
        
        res.json({ success: true,message: 'Deleted post successfully', post: deletePost})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error'})
    
    }
})

module.exports = router;

