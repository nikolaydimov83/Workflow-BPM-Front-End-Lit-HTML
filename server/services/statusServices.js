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

async function editStatusName(status,statusName){
    status.statusName=statusName;
    status.save();
}

async function emptyNextStatuses(status){
   
    status.nextStatuses.length=0;
    status.save();
}





module.exports={createStatus,assignStatusWithNextStatuses,editStatusName,emptyNextStatuses}