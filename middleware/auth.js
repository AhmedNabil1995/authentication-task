const jwt = require('jsonwebtoken');


const auth = (req,res,next)=>{

    const token = req.headers['token'];

    if(!token){
        res.status(403).send("A token is required for authentication")
    }

    try{

         let decode = jwt.verify(token,'ITI')
         console.log(decode)
          req.user = decode;
    }catch(err){
        res.status(400).send('Invalid Token')
    }

    next();
}

module.exports = auth