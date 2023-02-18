const IApply = require('../models/IApply');
const Subject = require('../models/Subject');
const { parseError } = require('../utils/utils');

const createController=require('express').Router();

createController.get('/',async (req,res)=>{
    try {
        req.user.role
        let subjects=await Subject.find({canBeInitiatedByRole:req.user.role});
        let iApplyData=await IApply.findOne({iApplyId:req.body.iApplyId})
        res.status(201);
        res.json({subjects});
    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

})
//
module.exports=createController;