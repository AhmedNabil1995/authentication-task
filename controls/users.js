const UserModel = require('../models/users');



async function getAllUsers(req,res){
    try{
        let users = await UserModel.find({});
        res.json(users);
    }catch(err){
        res.status(500).json({err : "DB error"})
    }
}


async function getUserByID(req,res){

    let {id} = req.params;

    try{
    let user = await UserModel.findById(id);
    res.json(user);
    }catch(err){
        res.status(500).json({err : "DB error"})
    }
}

async function createUser(req,res){

    let body = req.body;

    let user = {
        firstName : body.firstName,
        lastName : body.lastName,
        email : body.email,
        birth : new Date(body.birth),
    }

    let newUser = new UserModel(user);

    try{
    let addeduser = await newUser.save();
    res.json(addeduser);
    }catch(err){
        res.status(500).json({err : "DB error"})
    }
}

async function updateUser(req,res){
    let {id} = req.params;
    let body = req.body;

    try{
    let updateduser = await UserModel.findByIdAndUpdate(id,body);
    res.json(updateduser);
    }catch(err){
        res.status(500).json({err : "DB error"})
    }
}


async function deleteUser(req,res){

    let {id} = req.params;

    try{

    let deletedpost = await UserModel.findByIdAndDelete(id);

    res.json(deletedpost);

    }catch(err){
        res.status(500).json({err : "DB error"});
    }
}


module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}