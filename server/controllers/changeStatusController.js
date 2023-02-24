const Request = require('../models/Request');
const Workflow = require('../models/Workflow');
const { getAllUserPendingRequests, getAllUserPendingRequests1, sortTable, getRequestById, editRequestStatus } = require('../services/requestServices');
const { parseError } = require('../utils/utils');

const changeStatusController=require('express').Router();

changeStatusController.post('/:id',async (req,res)=>{
    let requestId=req.params.id;
    let newStatusId=req.body.nextStatus
    let user=req.user;
    
    

   try {
    let databaseRequest=await getRequestById(requestId);
    if((databaseRequest.status.nextStatuses.filter((s)=>s._id==newStatusId)).length==0){
        throw new Error('You are trying to assign status that is not allowed in this workflow step!')
    }
    let response=await editRequestStatus(requestId,newStatusId,user.email)

    res.status(201);    
    res.json(response);
   
    
   } catch (error) {
    res.status(400);
    res.json({message:parseError(error)});
   }

});


module.exports=changeStatusController;