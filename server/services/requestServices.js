const Request = require("../models/Request");
const Status=require('../models/Status');
const { sortWithType } = require("../utils/utils");

async function createRequest(requestObject){
    return await (await Request.create(requestObject)).populate('status');
}

async function getAllUserPendingRequests(user,sortCriteria){
    let userFinCenter=user.finCenter;
    let userRole=user.role;
    const allStatusesRelatedToUserRole=await Status.find({statusType:userRole})
    
    if(!(userRole.includes('Branch'))){
        let result= await Request.find({}).where('status').in(allStatusesRelatedToUserRole).populate('status requestWorkflow subjectId').lean();
        
        result.sort((a,b)=>{
            return ((new Date(b.statusIncomingDate) - new Date(a.statusIncomingDate)));
        })

        return result
    }else{
        const result = await Request.find({})
        .or([{finCenter:userFinCenter},{refferingFinCenter:userFinCenter}])
        .where('status').in(allStatusesRelatedToUserRole).populate('status requestWorkflow subjectId').lean();

        result.sort((a,b)=>{
            return ((new Date(a.deadlineDate) - new Date(b.deadlineDate)));
        })

        return result
    }

}

async function sortTable(user, sortProperty,sortIndex){
    let data=await getAllUserPendingRequests(user);
    let type= Request.schema.path(sortProperty).instance
    let result=sortWithType(data,type,sortProperty,sortIndex)
    return result
}

async function getRequestById(id){
    return await Request.findById(id)
        .populate({path:'status',populate: { path: 'nextStatuses' }})
        .populate('requestWorkflow')
        .populate('comments').populate('subjectId')
        .lean()
}
async function editRequestStatus(requestId,newStatusId,email){
    let request = await Request.findById(requestId);
    request.status=newStatusId;
    request.statusIncomingDate = (new Date())
    request.statusSender = email;
    let historyEntry = { status:newStatusId, incomingDate: request.statusIncomingDate, statusSender: email };
    request.history.push(historyEntry);
    request.save();
    return request
}



module.exports={createRequest,getAllUserPendingRequests,sortTable,getRequestById,editRequestStatus}