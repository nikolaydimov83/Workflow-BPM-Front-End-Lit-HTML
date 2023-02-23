const Request = require('../models/Request');
const Workflow = require('../models/Workflow');
const { getAllUserPendingRequests, getAllUserPendingRequests1, sortTable } = require('../services/requestServices');

const dataController=require('express').Router();

dataController.get('/',async (req,res)=>{
    let user=req.user;

   try {

    let pendingList=await getAllUserPendingRequests(user)
    res.status(201);    
    res.json(pendingList);
   
    
   } catch (error) {
   console.log(error)
   }

});
dataController.post('/',async (req,res)=>{
    let user=req.user;
    let sortProperty=req.body.sortCriteria;
    let sortIndex=req.body.sortIndex
    
    

   try {
    let sortedData=await sortTable(user,sortProperty,sortIndex)
    res.status(201);    
    res.json(sortedData);
   
    
   } catch (error) {
   console.log(error)
   }

});

module.exports=dataController;