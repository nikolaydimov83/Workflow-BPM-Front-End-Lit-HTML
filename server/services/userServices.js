const User = require("../models/User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const InvalidToken = require("../models/InvalidToken");
const key='QwD457808756_A_D!@#cckznn%$*';
const resetKey='BHJBHJxmal7y7887#NJIU$^(';





async function register(email,password){
    let user=await User.findOne({email:email});
    if (user){
        throw new Error('User already exists')
    }
    hashedPass=await bcrypt.hash(password,10)
    let createdUser=await User.create({email,hashedPass});
    let token=createToken(createdUser,key);

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
    let token=createToken(user,key);
    return{_id:user._id,accessToken:token,email:user.email}
}

async function createResetPassToken(email){
    const user=await User.findOne({email:email})
    if(!user){
        throw new Error('Your email does not exist in the database!')
    }
    let token=createToken(user,resetKey);
    return {resetToken:token,email:user.email,_id:user._id}
}

async function changePassword(user,password){
    let userDB=await User.findById(user._id);
    if (!userDB){
        throw new Error('User do not exist!')
    }
    hashedPass=await bcrypt.hash(password,10);
    userDB.hashedPass=hashedPass;
    userDB.save();
    let token=createToken(userDB,key);

    return {_id:userDB._id,accessToken:token,email:userDB.email}
}

function createToken(user,key){
    const payload={_id:user._id,email:user.email,role:user.role}
    let token=jwt.sign(payload,key);
    return token
}

async function verifyToken(req,res,tokenString){
    let token=req.headers['x-authorization'];
    if(await InvalidToken.findOne({token:tokenString})||await InvalidToken.findOne({token:token})){
        return 'Invalid token'
    }
    if(tokenString){
        try {
            let user=jwt.verify(tokenString,resetKey);
            return user
        } catch (error) {
            throw error
        }
    }

    if (!token){
        return 'No user'
    }else{
        try {
            let user=jwt.verify(token,key);
            return user
        } catch (error) {
            return 'Invalid token'
        }
        
    }
}

module.exports={register,verifyToken,login,createResetPassToken,changePassword,key}