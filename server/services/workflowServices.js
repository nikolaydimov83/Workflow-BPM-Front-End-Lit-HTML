const { default: mongoose } = require("mongoose");
const Role = require("../models/Role");
const Workflow = require("../models/Workflow");
const { getActiveDirUserByID } = require("./adminServices");


async function createRole(roleInfo){
    let result=await Role.create(roleInfo)
    
    return result
}

async function editRole(roleInfo,id){
    roleInfo.role='';
    if (roleInfo.roleType=='Branch'){
        roleInfo.role=roleInfo.roleType+roleInfo.roleName;
    }else{
        roleInfo.role=roleInfo.roleName;
    }
   // const session = await mongoose.startSession();
    //let oldRole=(await Role.findById(id)).role.toString();
    let result;
    //await session.startTransaction();
    
    //try {
        
        
        result=await Role.findByIdAndUpdate(id,roleInfo);
  //      let updatedUsers=await editAllUsersWithRole(oldRole,session);
    //    await session.commitTransaction();
    //} catch (error) {
    //  await session.abortTransaction();
    /*  throw error;
    } finally {
      session.endSession();
    }*/

    
    return result
}

async function getAllRoles(){
    let result=await Role.find({}).lean()
    return result
}


async function getRoleById(id){
    let result=await Role.findById(id).lean()
    return result
}



async function createWorkflow(workflowName,allowedStatuses=[]){

    let workflow=await Workflow.create({workflowName,allowedStatuses});
    return workflow
}
async function addAllowedStatus(workflowName,status){
    const workflow=await Workflow.findOne({workflowName});
    if (!workflow){
        throw new Error('Workflow with this name was not found!')
    }
    workflow.allowedStatuses.push(status);
    workflow.save();

}

async function removeAllowedStatus(status,workflowName){
   const workflowDB=await Workflow.findOne(workflowName);
   if (!workflowDB){
    throw new Error('Workflow with this name does not exist')
   }
   let index=workflowDB.allowedStatuses.indexOf(status.id);
   if (index>-1){
        workflowDB.allowedStatuses.splice(index,1);
        workflowDB.save();
   }else{
    throw new Error('Status not found!')
   }
   

}

async function getWorkflowById(workflowId){
    return await Workflow.findById(workflowId).populate('rolesAllowedToFinishRequest').populate('allowedStatuses');

}

async function checkUserRoleIsPriviliged(workflowId,user){
    let userFromActiveDir=await getActiveDirUserByID(user.userStaticInfo);
    let dbWorkFlow=await getWorkflowById(workflowId);
    if(dbWorkFlow.rolesAllowedToFinishRequest.findIndex((a)=>a.id.toString()==userFromActiveDir.role.toString())>-1){
        return true
    }else{
        return false
    }
}


    
 
 



module.exports={createWorkflow,
                addAllowedStatus,
                removeAllowedStatus,
                getWorkflowById,
                checkUserRoleIsPriviliged,
                createRole,
                editRole,
                getAllRoles,
                getRoleById
            }