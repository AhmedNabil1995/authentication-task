const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    password: String,
    email : String,
    birth : Date,
    token: String
});



const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;
