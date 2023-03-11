const { prepareMailContent, serverSendMail, emailAdress } = require('../emailClient/mail');
const User = require('../models/User');
const { getRequestById, editRequestStatus, getUserRights, editRequest, changeRequestDeadline } = require('../services/requestServices');
const { parseError } = require('../utils/utils');

const editController=require('express').Router();
const emailSubjectForChangeRequestEdit='PlanB Request Data Changed!'

editController.put('/:id',async (req,res)=>{
    let requestId=req.params.id;
    let newDeadline=req.body.newDeadline;
    let newComment=req.body.commentText;
    let user=req.user;
  


   try {
    if(!newDeadline||!newComment){
        throw new Error('Missing deadline or comment. This fields are compulsory')
    }
    let databaseRequest=await getRequestById(requestId);

    if(!(await(getUserRights(databaseRequest, user))).userPrivileged){
        throw new Error('You are not allowed to change data in the request!')
    };
    if(databaseRequest.status.statusType=='Closed'){
        throw new Error('This request is closed! You are not allowed to change it!')
    }

    

    let response=await changeRequestDeadline(requestId,{newComment,newDeadline},user)

    

    let emailContent=prepareMailContent(response)
    let userListForEmail=await User.find({})
        .or([{finCenter:response.finCenter},{finCenter:response.refferingFinCenter}])
        .lean();
        userListForEmail.forEach((user)=>{

            serverSendMail(emailAdress,user.email,emailSubjectForChangeRequestEdit,emailContent)
        })
    if(response.requestCreatorEmail!=user.email){
        serverSendMail(emailAdress,response.requestCreatorEmail,emailSubjectForChangeRequestEdit,emailContent)
    }
    res.status(201);    
    res.json(response);
   } catch (error) {
    res.status(400);
    res.json({message:parseError(error)});
   }

});


module.exports=editController;


