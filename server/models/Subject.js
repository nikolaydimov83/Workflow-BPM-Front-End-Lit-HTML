const { Schema, model,Types } = require("mongoose");


const subjectSchema=new Schema({
    subjectName:{type:String, required:true, unique:true},
    subjectCreateDate:{type:Date,default:Date.now,immutable:true},
    assignedToWorkflow:{type:Types.ObjectId,ref:'Workflow'},
    canBeInitiatedByRole:{type:String, required:true,enum:['LA','Branch','COKS']}
});

subjectSchema.index({subjectName:1},{
    collation:{
        locale:'bg',
        strength:2
    }
});


const Subject=model('Subject', subjectSchema);

module.exports=Subject;