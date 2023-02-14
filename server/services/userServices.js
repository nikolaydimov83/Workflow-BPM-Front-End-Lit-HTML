const User = require("../models/User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const key='QwD457808756_A_D!@#cckznn%$*';




async function register(email,password){
    let user=await User.findOne({email:email});
    if (user){
        throw new Error('User already exists')
    }
    hashedPass=await bcrypt.hash(password,10)
    let createdUser=await User.create({email,hashedPass});
    let token=createToken(createdUser);

    return {_id:createdUser._id,accessToken:token,email:createdUser.email}

}

async function login(email,password){
    let user=await User.findOne({email:email});
    if (!user){
        throw new Error('Wrong username or password!');
    }
    let checkPass=await bcrypt.compare(password,user.hashedPass);
    if(!checkPass){
        throw new Error('Wrong username or password!')
    }
    let token=createToken(user);
    return{_id:user._id,accessToken:token,email:user.email}
}

function createToken(user){
    const payload={_id:user._id,email:user.email}
    let token=jwt.sign(payload,key);
    return token
}

async function verifyToken(req,res){
    let token=req.headers['x-authorization'];
    if (!token){
        return 'No user'
    }else{
        try {
            let user=jwt.verify(token,key);
            return user
        } catch (error) {
            return 'Invalid Token'
        }
        
    }
}

module.exports={register,verifyToken,login,key}