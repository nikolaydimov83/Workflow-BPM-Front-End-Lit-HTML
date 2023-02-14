const { Schema, model } = require("mongoose");

const userActiveDirSchema=new Schema({
    email:{type:String, immutable: true},
    branchNumber:{type:Number,immutable:true},
    branchName:{type:String,immutable:true}
});


const UserActiveDir=model('UserActiveDir', userActiveDirSchema);

module.exports=UserActiveDir;