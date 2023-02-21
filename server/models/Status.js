//{statusName,statusDate,nextStatuses:[],statusSender:User}

const { Schema, model,Types } = require("mongoose");
let types=['LA', 'Branch','Closed']


const requestSchema=new Schema({
    statusName:{type:String, required:true},
    nextStatuses:{type:[Types.ObjectId],ref:'Status'},
    statusCreateDate:{type:Date,default:Date.now,immutable:true},
    statusType:{type:String,enum:types}
});

requestSchema.index({statusName:1},{
    collation:{
        locale:'bg',
        strength:2
    }
});


const Status=model('Status', requestSchema);

module.exports=Status;