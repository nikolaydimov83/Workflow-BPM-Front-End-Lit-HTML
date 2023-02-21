const Request = require('../models/Request');
const { getAllUserPendingRequests, getAllUserPendingRequests1 } = require('../services/requestServices');

const dataController=require('express').Router();

dataController.get('/',async (req,res)=>{
    let user=req.user;
    let userFinCenter=user.finCenter;
    let userRole=user.role;
   try {
    
    const list=await getAllUserPendingRequests(user)
    console.log(list)
   } catch (error) {
   console.log(error)
   }

});

module.exports=dataController;