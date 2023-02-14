const { Schema, model,Types } = require("mongoose");

const UserActiveDir = require("./UserActiveDir");

async function getId(email){

    //let email=this.email;
    let userId= await UserActiveDir.findOne({email:email})
    console.log(userId.id)
    return userId.id
}

const userSchema=new Schema({
    email:{type:String,unique:true,required:true, validate:{
        validator:async (value)=>{
            let result=await UserActiveDir.findOne({email:value})
            return result
        },
        message:(props)=>{return `${props.value} is not found in the active directory!` }
    }},
    hashedPass:{type:String,required:true},
    userStaticInfo:{type:Types.ObjectId,ref:'UserActiveDir'}
});

userSchema.pre('save', async function() {
    let email=this.email
    let userId=await getId(email)
    if (userId) {
      this.userStaticInfo = userId
      this.userStatus='Active';
      
    }else{
        this.userStatus='Inactive';
    }
  });
  

userSchema.index({email:1},{
    collation:{
        locale:'en',
        strength:2
    }
});





const User=model('User', userSchema);

module.exports=User;