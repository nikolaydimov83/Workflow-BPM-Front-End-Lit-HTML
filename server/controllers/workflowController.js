
const { createRole, getAllRoles, getRoleById, editRole } = require('../services/workflowServices');
const { parseError } = require('../utils/utils');


const workflowController=require('express').Router();

workflowController.post('/roles',async(req,res)=>{
    try {
        
        let data=await createRole(req.body);
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(401);
        res.json({message:parseError(error)});
    }


});

workflowController.get('/roles',async(req,res)=>{
    try {
        
        let data=await getAllRoles();
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(401);
        res.json({message:parseError(error)});
    }


});

workflowController.get('/roles/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let data=await getRoleById(id)
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(401);
        res.json({message:parseError(error)});
    }


});

workflowController.put('/roles/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let data=await editRole(req.body,id);
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(401);
        res.json({message:parseError(error)});
    }


});



module.exports=workflowController;


