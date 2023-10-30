const { Schema, model,Types } = require("mongoose");


const rolesSchema=new Schema({
    role:{type:String},
    roleCreateDate:{type:Date,default:Date.now,immutable:true},
    roleType:{type:String, enum:["Branch","HO"],required:true},
    roleName:{type:String,required:true,unique:true}
});

rolesSchema.pre('save',function(){
    if (this.roleType=='Branch'){
        this.role=this.roleType+this.roleName;
    }else{
        this.role=this.roleName;
    }
});

rolesSchema.index({role:1},{
    collation:{
        locale:'en',
        strength:2
    }
});


const Role=model('Role', rolesSchema);

module.exports=Role;