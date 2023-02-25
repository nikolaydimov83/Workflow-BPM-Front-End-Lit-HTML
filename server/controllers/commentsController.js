const IApply = require('../models/IApply');
const { readIapplyData } = require('../services/iapplyServices');
const { parseError } = require('../utils/utils');

const commentsController=require('express').Router();

commentsController.get('/:id',async (req,res)=>{
    try {

        res.status(201);
        res.json({iApplyData});
    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

})
//
module.exports=commentsController;