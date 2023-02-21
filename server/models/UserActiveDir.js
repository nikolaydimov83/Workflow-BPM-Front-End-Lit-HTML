const { Schema, model } = require("mongoose");

const userActiveDirSchema=new Schema({
    email:{type:String, immutable: true},
    branchNumber:{type:Number,immutable:true},
    branchName:{type:String,immutable:true}
});

userActiveDirSchema.index({email:1},{
    collation:{
        locale:'en',
        strength:2
    }
});
userActiveDirSchema.pre('save',()=>{
console.log(`ПИПАШ В АКТИВНАТА ЮЗЪРСКА ДИРЕКТОРИЯ!!!!!!!!!!!!
ВИЖ ЗАЩО СЕ СЛУЧВА ТАКА.
НЕ Е ОК!!!!!!!`)
})

const UserActiveDir=model('UserActiveDir', userActiveDirSchema);

module.exports=UserActiveDir;