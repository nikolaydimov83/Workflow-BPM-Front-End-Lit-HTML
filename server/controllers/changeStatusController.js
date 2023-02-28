const { prepareMailContent, serverSendMail, emailAdress } = require('../emailClient/mail');
const Request = require('../models/Request');
const Status = require('../models/Status');
const User = require('../models/User');
const Workflow = require('../models/Workflow');
const { getRequestById, editRequestStatus, userCanEditRequest } = require('../services/requestServices');
const { parseError } = require('../utils/utils');

const changeStatusController=require('express').Router();
const emailSubjectForChangeStatus='PlanB Status Changed!'
changeStatusController.post('/:id',async (req,res)=>{
    let requestId=req.params.id;
    let newStatusId=req.body.nextStatus;
    let user=req.user;
  


   try {
    let databaseRequest=await getRequestById(requestId);

    if(!userCanEditRequest(databaseRequest, user,newStatusId)){
        throw new Error('You are not allowed to change the status of the request!')
    };

    

    let response=await editRequestStatus(requestId,newStatusId,user.email)

    

    let emailContent=prepareMailContent(response)
    let userListForEmail=await User.find({})
        .or([{finCenter:response.finCenter},{finCenter:response.refferingFinCenter}])
        .lean();
        userListForEmail.forEach((user)=>{

            serverSendMail(emailAdress,user.email,emailSubjectForChangeStatus,emailContent)
        })
    if(response.requestCreatorEmail!=user.email){
        serverSendMail(emailAdress,response.requestCreatorEmail,emailSubjectForChangeStatus,emailContent)
    }
    res.status(201);    
    res.json(response);
   } catch (error) {
    res.status(400);
    res.json({message:parseError(error)});
   }

});


module.exports=changeStatusController;


