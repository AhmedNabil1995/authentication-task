const express = require('express');
const morgan = require('morgan');
const UserModel = require('./models/users');
const bcrypt = require('bcryptjs');
const jtw = require('jsonwebtoken');
const auth = require('./middleware/auth');


const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const mongoose = require('mongoose');

const PORT = 5000;
const DB_CONNECTION = 'mongodb://localhost:27017/blogs';

const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :http-version :response-time '));

app.use('/welcome',auth,(req,res)=>{
    res.status(200).send('welcome..')
})

app.post('/register',async (req,res)=>{
    const {firstName,lastName,email,password} = req.body;

    if(!(firstName&&lastName&&email&&password)){
        res.status(400).send('All input is required');
    }

    try{
        const olduser = await UserModel.find({email});
        if(olduser.length){
            console.log(olduser);
             res.status(409).send(`User Already Exist. Please Login`)
        }else{

        let encyptedPassword = await bcrypt.hash(password,10);
        let user = await UserModel.create({
            firstName,
            lastName,
            email,
            password : encyptedPassword
        })

        const token = jtw.sign({id:user._id,email},'ITI',{expiresIn:'1hr'});

        user.token = token;
        res.status(201).json(user);
    }
    }catch(err){
        res.status(500).json({code:'error DB'});
        console.log(err);
    }
})

app.post('/login',async(req,res)=>{

    try{

        const {email,password} = req.body;

        if(!(email&&password)){
            res.status(400).send('All input is required')
        }else{
    
          let user =  await UserModel.findOne({email});
    
          if(user && (await bcrypt.compare(password,user.password))){
    
            const token = jtw.sign({id:user._id,email},'ITI',{expiresIn : '1hr'})
            user.token = token;
            res.status(201).json(user);
          }else{
            res.status(400).json('Invalid Credentials');
          }
        }

    }catch(err){
        console.log(err);
        res.status(400).send('err')
    }

})


app.use('/users',usersRouter);
app.use('/posts',postsRouter);



mongoose.connect(DB_CONNECTION,(err)=>{
    if(!err) return console.log(`connected to database successfuly`)
    console.log(err);
})

app.listen(PORT,(err)=>{
    if(!err) return console.log(`server is running on port ${PORT}`)
    console.log(err);
})

