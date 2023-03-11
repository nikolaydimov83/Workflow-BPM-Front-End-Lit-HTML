
const { getAllUserPendingRequests, sortTable, getRequestById, getUserRights, getAllPassedDeadlineUsrPndngReqs } = require('../services/requestServices');
const { getWorkflowById } = require('../services/workflowServices');

const reportsContoller=require('express').Router();

reportsContoller.get('/',async (req,res)=>{
    let user=req.user;

   try {

    let pendingList=await getAllPassedDeadlineUsrPndngReqs(user)
    res.status(201);    
    res.json(pendingList);
   
    
   } catch (error) {
   console.log(error)
   }

});

reportsContoller.post('/',async (req,res)=>{
    let user=req.user;
    let sortProperty=req.body.sortCriteria;
    let sortIndex=req.body.sortIndex
    
    

   try {
    data=await getAllPassedDeadlineUsrPndngReqs(user);
    let sortedData=await sortTable(data,sortProperty,sortIndex)
    res.status(201);    
    res.json(sortedData);
   
    
   } catch (error) {
   console.log(error)
   }

});


module.exports=reportsContoller;