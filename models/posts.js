const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({

    title : String,
    author : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
});



const PostModel = mongoose.model('Post',PostSchema);

module.exports = PostModel;
