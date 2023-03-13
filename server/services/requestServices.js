const Request = require("../models/Request");
const Status=require('../models/Status');
const { sortWithType } = require("../utils/utils");
const { createCommnet } = require("./commentServices");
const { getWorkflowById, checkUserRoleIsPriviliged } = require("./workflowServices");

async function createRequest(requestObject){
    return await (await Request.create(requestObject)).populate('status');
}

async function getAllUserPendingRequests(user){
    let userFinCenter=user.finCenter;
    let userRole=user.role;
    const allStatusesRelatedToUserRole=await Status.find({statusType:userRole})
    
    if(!(userRole.includes('Branch'))){
        let result= await Request.find({}).where('status').in(allStatusesRelatedToUserRole).populate('status requestWorkflow subjectId comments').lean();
        
        result.sort((a,b)=>{
            return ((new Date(b.statusIncomingDate) - new Date(a.statusIncomingDate)));
        })

        return result
    }else{
        const result = await Request.find({})
        .or([{finCenter:userFinCenter},{refferingFinCenter:userFinCenter}])
        .where('status').in(allStatusesRelatedToUserRole).populate('status requestWorkflow subjectId comments').lean();

        result.sort((a,b)=>{
            return ((new Date(a.deadlineDate) - new Date(b.deadlineDate)));
        })

        return result
    }

}

async function getAllPassedDeadlineUsrPndngReqs(user){
    let userFinCenter=user.finCenter;
    let userRole=user.role;
    let currentDate = new Date().toISOString();
    const allRelevantStatuses=await Status.find({}).where('statusType').ne('Closed');
    
    if(!(userRole.includes('Branch'))){
        let result= await Request.find({}).where('status').in(allRelevantStatuses).where('deadlineDate').lte(currentDate).populate('status requestWorkflow subjectId comments').lean();
        
        result.sort((a,b)=>{
            return ((new Date(b.deadlineDate) - new Date(a.deadlineDate)));
        })

        return result
    }else{
        const result = await Request.find({})
        .or([{finCenter:userFinCenter},{refferingFinCenter:userFinCenter}]).where('status').in(allRelevantStatuses)
        .where('deadlineDate').lte(currentDate).populate('status requestWorkflow subjectId comments').lean();

        result.sort((a,b)=>{
            return ((new Date(a.deadlineDate) - new Date(b.deadlineDate)));
        })

        return result
    }

}

async function sortTable(data, sortProperty,sortIndex){
    if(!sortProperty){
        sortProperty='statusIncomingDate';
    }
    let type= Request.schema.path(sortProperty).instance
    let result=sortWithType(data,type,sortProperty,sortIndex)
    return result
}

async function getRequestById(id){
    return await Request.findById(id)
        .populate({path:'status',populate: { path: 'nextStatuses' }})
        .populate('requestWorkflow')
        .populate('comments').populate('subjectId').populate({path:'comments',populate: { path: 'commentOwner' }})
        .lean()
}
async function getRequestsByClientEGFN(clientEGFN){
    let result= await Request.find({clientEGFN:clientEGFN})
        .populate({path:'status',populate: { path: 'nextStatuses' }})
        .populate('requestWorkflow')
        .populate('comments').populate('subjectId').populate({path:'comments',populate: { path: 'commentOwner' }})
        .lean()
        return result.sort((a,b)=>{
            return ((new Date(b.statusIncomingDate) - new Date(a.statusIncomingDate)));
        })
}
async function getRequestsBySearchString(searchString){
    
    const iApplyRegex=/^[A-Z]{2}[0-9]+$/
    const EGFNRegex=/^[0-9]{9,10}$/
    const finCenter=/^[0-9]{1,3}$/
    let searchType;
    
    if(iApplyRegex.test(searchString)){
        searchType='iApplyId'
    }

    let result= await Request.find({})
        .where(searchType).equals(searchString)
        .populate({path:'status',populate: { path: 'nextStatuses' }})
        .populate('requestWorkflow')
        .populate('comments').populate('subjectId').populate({path:'comments',populate: { path: 'commentOwner' }})
        .lean()
        return result.sort((a,b)=>{
            return ((new Date(b.statusIncomingDate) - new Date(a.statusIncomingDate)));
        })
}
async function editRequestStatus(requestId,newStatusId,email){
    let statusIncomingDate = (new Date());
    let historyEntry = { status:newStatusId, incomingDate: statusIncomingDate, statusSender: email };
    let request=await Request.findByIdAndUpdate(requestId,{   
                        $push: { history: historyEntry },
                        $set:{
                            status:newStatusId,
                            statusIncomingDate:statusIncomingDate,
                            statusSender:email}})
                        .populate('status')
                        .populate('comments');
    return request
}

async function changeRequestDeadline(requestId,newData, user){
    let comment=await addCommentToRequest(requestId,newData.newComment,user);


    let request=await Request.findByIdAndUpdate(requestId,{   
            
                        $set:{deadlineDate:newData.newDeadline}
                    })
                        .populate('status')
                        .populate('comments');
    return request
}


async function getUserRights(databaseRequest, user,newStatusId) {
    
    if (await checkUserRoleIsPriviliged(databaseRequest.requestWorkflow._id,user)){
        return {userCanChangeStatus:true, userPrivileged:true}
    }

    if(newStatusId){

        if ((databaseRequest.status.nextStatuses.filter((s) => s._id == newStatusId)).length == 0) {
            return {userCanChangeStatus:false, userPrivileged:false}
    }

    }

    if (databaseRequest.status.statusType != user.role) {
        return {userCanChangeStatus:false, userPrivileged:false}
    }

    if (user.role.includes('Branch')) {
        if (user.finCenter != databaseRequest.finCenter && user.finCenter != databaseRequest.refferingFinCenter) {
            return {userCanChangeStatus:false, userPrivileged:false}
        }

    }

    return {userCanChangeStatus:true, userPrivileged:false}

}

async function addCommentToRequest(requestId,commentText,user){
    let commnet=await createCommnet(commentText,user);
    let request=await Request.findByIdAndUpdate(requestId,{ 
                        $push: { comments: commnet.id } })
                        .populate('status')
                        .populate('comments')
    return request

}


module.exports={
                    createRequest,
                    getAllUserPendingRequests,
                    getAllPassedDeadlineUsrPndngReqs,
                    sortTable,
                    getRequestById,
                    editRequestStatus,
                    changeRequestDeadline,
                    getUserRights,
                    addCommentToRequest,
                    getRequestsByClientEGFN,
                    getRequestsBySearchString
                }