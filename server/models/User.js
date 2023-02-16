const { Schema, model,Types } = require("mongoose");

const UserActiveDir = require("./UserActiveDir");

async function getId(email){

    //let email=this.email;
    let user= await UserActiveDir.findOne({email:email})
    //console.log(userId.id)
    return user
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
    userStaticInfo:{type:Types.ObjectId,ref:'UserActiveDir'},
    role:{type:String}
 
});

userSchema.pre('save', async function() {
    let email=this.email
    let user=await getId(email)
    if (user) {
      this.userStaticInfo = user.id
      this.userStatus='Active';
      this.role=user.branchNumber==101?'LA':'Branch'
      
    }else{
        this.userStatus='Inactive';
        throw new Error('User is no longer employee!');
    }
  });
  
  userSchema.post('init', async function() {
    let email=this.email
    let userId=await getId(email)
    if (userId) {
      this.userStaticInfo = userId
      this.userStatus='Active';
      
    }else{
        this.userStatus='Inactive';
        throw new Error('User is no longer employee!');
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