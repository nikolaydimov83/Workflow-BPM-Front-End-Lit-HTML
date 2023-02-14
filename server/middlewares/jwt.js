const jwt=require('jsonwebtoken');
const { key, verifyToken } = require('../services/userServices');


module.exports=()=>async (req,res,next)=>{
    const result=await verifyToken(req,res);
    if(result!=='No user'&&result!=='Invalid token'){
        req.user=result
    }
    next();
}

