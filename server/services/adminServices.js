const User = require("../models/User");
const UserActiveDir = require("../models/UserActiveDir")



async function createUser(user){
    let result=UserActiveDir.create(user);
    return result
}

async function getAllActiveDirUsers(){
    let result = await UserActiveDir.find({});
    return result
}

async function getActiveDirUserByID(id){
    let result = await UserActiveDir.findById(id);
    return result
}

async function editUserById(id,newUser){
    let user=await getActiveDirUserByID(id);
    user.email=newUser.email;
    user.branchNumber=newUser.branchNumber;
    user.branchName=newUser.branchName;
    user.userStatus=newUser.userStatus;
    let userFromUsers=await User.findOne({email:user.email});
    await user.save();
    await userFromUsers.save();
   
}

module.exports={getAllActiveDirUsers,getActiveDirUserByID,editUserById,createUser}