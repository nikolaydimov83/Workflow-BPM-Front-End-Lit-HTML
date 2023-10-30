const Role = require("../models/Role");
const Status = require("../models/Status");

async function createStatus(statusName,statusType,nextStatuses){
    if(!nextStatuses){
        nextStatuses=[]
    }
    let status=await Status.create({statusName,statusType,nextStatuses});
    return status
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
                checkIfStatusIsClosed
            }