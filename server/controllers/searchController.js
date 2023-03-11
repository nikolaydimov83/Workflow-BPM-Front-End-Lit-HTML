
const { getRequestsByClientEGFN, sortTable } = require('../services/requestServices');
const { parseError } = require('../utils/utils');

const searchController=require('express').Router();

searchController.post('/EGFN',async (req,res)=>{
    try {
        
        const EGFN=req.body.searchData;
        let serverResponseData=await getRequestsByClientEGFN(EGFN)
        let sortedData=await sortTable(serverResponseData,req.body.sortCriteria,req.body.sortIndex)
        res.status(201);
        res.json(sortedData);
    } catch (error) {
        res.status(400);
        res.json({message:parseError(error)});
    }
    

})
//
module.exports=searchController;