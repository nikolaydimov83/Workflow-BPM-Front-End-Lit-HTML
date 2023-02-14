const dataController=require('express').Router();

dataController.get('/',async (req,res)=>{
    
    res.json([]);
})

module.exports=dataController;