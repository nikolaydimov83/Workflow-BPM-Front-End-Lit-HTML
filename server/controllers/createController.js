const { Types } = require('mongoose');
const { serverSendMail, emailAdress, prepareMailContent } = require('../emailClient/mail');

const Request = require('../models/Request');
const Subject = require('../models/Subject');
const { readIapplyData } = require('../services/iapplyServices');
const { createRequest } = require('../services/requestServices');
const { findWorkflowBySubjectId } = require('../services/subjectServices');
const { parseError } = require('../utils/utils');
const createController=require('express').Router();

const emailSubjectForCreate='New Request Created'

createController.get('/',async (req,res)=>{
    try {
        
        let subjects=await Subject.find({canBeInitiatedByRole:req.user.role});
        res.status(201);
        res.json({subjects});
    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

})

createController.post('/',async (req,res)=>{
    try {
        
        let body = await prepareBodyForRequestCreate(req);
        let request=await createRequest(body);
        let emailContent=prepareMailContent(request)
        serverSendMail(emailAdress,req.user.email,emailSubjectForCreate,emailContent)
        res.status(201);    
        res.json({request});
    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

})
//
module.exports=createController;

async function prepareBodyForRequestCreate(req) {
    let body = req.body;
    let iApplyId = body.iApplyId;
    let requestWorkflow = await findWorkflowBySubjectId(body.subjectName);
    body.requestWorkflow = requestWorkflow.id;
    let status = requestWorkflow.allowedStatuses[0];
    body.status = status.id.toString('hex');
    body.statusIncomingDate = (new Date())
    body.statusSender = req.user.email;

    body.history = [];

    let historyEntry = { status: status, incomingDate: body.statusIncomingDate, statusSender: req.user.email };
    body.history.push(historyEntry);

    let iApplyData = await readIapplyData(iApplyId);
    body.amount = iApplyData.amount;
    body.ccy = iApplyData.ccy;
    body.clientEGFN = iApplyData.clientEGFN;
    body.clientName = iApplyData.clientName;
    body.finCenter = iApplyData.finCenter;
    body.iApplyId = iApplyData.iApplyId;
    body.product = iApplyData.product;
    body.refferingFinCenter = iApplyData.refferingFinCenter;
    return body;
}
