const Role = require("../models/Role");
const Status = require("../models/Status");
const { getAllRoles } = require("./workflowServices");

async function createStatus(statusInfo){
    let nextStatuses=statusInfo.nextStatuses;
    let statusName=statusInfo.statusName;
    let statusType=statusInfo.statusType;

    await checkStatus(nextStatuses, statusType);


    let status=await Status.create({statusName,statusType,nextStatuses});
    return status
}

async function editStatus(statusInfo){
    let nextStatuses=statusInfo.nextStatuses;
    let statusName=statusInfo.statusName;
    let statusType=statusInfo.statusType;
    
    await checkStatus(nextStatuses,statusType);
    return await Status.findByIdAndUpdate(statusInfo.id,{statusName,statusType,nextStatuses})
}

async function checkStatus(nextStatuses, statusType) {
    if (!nextStatuses) {
        nextStatuses = [];
    }
    if (nextStatuses.constructor !== Array) {
        nextStatuses = [nextStatuses];
    }
    let allRoles = await getAllRoles();
    let allStatuses = await getAllStatuses();

    if (allRoles.findIndex((role) => role._id == statusType) == -1) {
        throw new Error('Status type is invalid value - please choose status type that corresponds to specific role');
    }
    if (nextStatuses.length > 0) {
        nextStatuses.forEach((status) => {
            if (allStatuses.findIndex((statusFromAllStatuses) => statusFromAllStatuses._id == status) == -1) {
                throw new Error(`Status from next Statuses with ID ${status} is not found in the statuses database. You can assign only existing statuses as next status`);
            }
        });
    }
   
}

async function getAllStatuses(){
    let result = await Status.find({}).populate('nextStatuses statusType').lean();
    return result
}

async function getStatusById(id){
    return Status.findById(id).populate('nextStatuses statusType');
}

async function assignStatusWithNextStatuses(status,arrayOfNextStatuses){
    arrayOfNextStatuses.forEach(element => {
        status.nextStatuses.push(element)
    });
    status.save();
}
async function getAllClosedStatuses(){
    let closedRole=await Role.findOne({role:'Closed'});
    let result =await Status.find({statusType:closedRole.id});
    return result
}

async function checkIfStatusIsClosed(status){
    let closedRole=await Role.findOne({role:'Closed'});
    return status.statusType.toString() === closedRole.id.toString();
}

async function editStatusName(status,statusName){
    status.statusName=statusName;
    status.save();
}

async function emptyNextStatuses(status){
   
    status.nextStatuses.length=0;
    status.save();
}







module.exports={createStatus,
                assignStatusWithNextStatuses,
                editStatusName,
                emptyNextStatuses, 
                getAllClosedStatuses,
                checkIfStatusIsClosed,
                getAllStatuses,
                getStatusById,
                editStatus

            }