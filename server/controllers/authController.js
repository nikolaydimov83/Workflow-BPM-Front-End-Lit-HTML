const { body } = require('express-validator');
const { register, login } = require('../services/userServices');
const { parseError } = require('../utils/utils');

const authController=require('express').Router();

authController.post('/register',async (req,res)=>{
    try {
        
        let user=await register(req.body.email,req.body.password);
        res.status(202);
        res.json(user);

    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

    ;
})

authController.post('/login',
                body('password').isLength(3).withMessage('Password must be at least 3 chars long'),
                async(req,res)=>{
    try {
        let user=await login(req.body.email,req.body.password);
        res.status(202);
        res.json(user);
    } catch (error) {
        
        res.status(403)
        res.json({message:parseError(error)});
    }
})

authController.get('/logout',async(req,res)=>{
    try {
        const token=req.headers['x-authorization'];
        res.status(201);
        res.json({message:'Success!'});
    } catch (error) {
        res.status(403)
        res.json({message:parseError(error)});
    }
})


module.exports=authController;