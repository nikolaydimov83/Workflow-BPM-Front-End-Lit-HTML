const { Schema, model,Types } = require("mongoose");


const rolesSchema=new Schema({
    branchNumber:{type:Number,required:true, min:1,max:999,unique:true},
    roleName:{type:String},
    role:{type:String,unique:true},
    roleCreateDate:{type:Date,default:Date.now,immutable:true}
});

rolesSchema.pre('save', async function(){
    if(this.branchNumber>=111){
        
        let roleNameRoot=this.roleName.replace('Branch','');
        if(!roleNameRoot){
            roleNameRoot=branchNumber+'All';
        }
        this.role='Branch'+roleNameRoot;
    }else{
        this.role=this.roleName;
    }
})

rolesSchema.index({branchNumber:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

rolesSchema.index({role:1},{
    collation:{
        locale:'en',
        strength:2
    }
})


const Role=model('Role', rolesSchema);

module.exports=Role;