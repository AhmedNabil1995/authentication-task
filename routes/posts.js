const express = require('express');
const {getAllPosts,getPostByID,createPost,updatePost,deletePost} = require('../controls/posts')
const router = express.Router();


router.get('/',getAllPosts);

router.get('/:id',getPostByID);

router.post('/',createPost);

router.patch('/:id',updatePost);

router.delete('/:id',deletePost);


module.exports = router;