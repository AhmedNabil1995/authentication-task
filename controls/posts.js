const PostModel = require('../models/posts');



async function getAllPosts(req,res){
    
    try{
        let posts = await PostModel.find().populate("author");
        res.json(posts);
    }catch(err){
        res.status(500).json({err : "DB error"})
    }
}


async function getPostByID(req,res){

    let {id} = req.params;

    try{
        let post = await PostModel.findOne({_id:id}).populate("author");
        res.json(post);
    }catch(err){
        res.status(500).json({err : "DB error"})
    }
}

async function createPost(req,res){

    let body = req.body;

    let newPost = new PostModel(body);

    try{

    let newpost = await newPost.save();

    res.json(newpost);

    }catch(err){

        res.status(500).json({err : "DB error"});

    }
}

async function updatePost(req,res){
    let {id} = req.params;
    let body = req.body;

    try{

    let updatedPost = await PostModel.findByIdAndUpdate(id,body)
    res.json(updatedPost);

    }catch(err){

        res.status(500).json({err : "DB error"});

    }
}


async function deletePost(req,res){

    let {id} = req.params;

    try{

    let deletedPost = await PostModel.findByIdAndDelete(id);
    res.json(deletedPost);

    }catch(err){

        res.status(500).json({err : "DB error"});
    }
}


module.exports = {
    getAllPosts,
    getPostByID,
    createPost,
    updatePost,
    deletePost
}