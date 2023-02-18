
const { verifyToken } = require('../services/userServices');
const { parseError } = require('../utils/utils');

const guestAllowedAdresses=['login','register','resetPass'];
module.exports=()=>async (req,res,next)=>{
    const result=await verifyToken(req,res);
    const requestType=req.originalUrl.split('/')[2];
    try {
    if(result!=='No user'&&result!=='Invalid token'){
        req.user=result;
        req.user.isGuest=false;

        if (guestAllowedAdresses.includes(requestType)&&requestType!='resetPass'){
            throw new Error('You are already logged!');
        }

    }else{

        if(!guestAllowedAdresses.includes(requestType)){
           throw new Error('You are not logged! Please login in order to proceed');
        }

        req.user={isGuest:true}
    }

    next();

    } catch (error) {
        res.status(401);
        res.json({message:parseError(error)});
    }

}

