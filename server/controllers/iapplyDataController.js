const IApply = require('../models/IApply');
const { parseError } = require('../utils/utils');

const iApplyConroller=require('express').Router();

iApplyConroller.get('/:id',async (req,res)=>{
    try {
        console.log('Here')
        let iApplyId=req.params.id
        let iApplyData=await IApply.findOne({iApplyId})
        if(!iApplyData){
            throw new Error('I-apply ID not fount!');
        }
        res.status(201);
        res.json({iApplyData});
    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

})
//
module.exports=iApplyConroller;