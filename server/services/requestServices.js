const Request = require("../models/Request");
const Status=require('../models/Status')

async function createRequest(requestObject){
    return await (await Request.create(requestObject)).populate('status');
}

async function getAllUserPendingRequests(user){
    realRequestInDB=await Request.findById('63f3667c9d28cf6aec9d1b0d').populate('status');
    statusType=realRequestInDB.status.statusType;
    let requestsList=await Request.find({}).where('status.statusType').nin([statusType]).populate('status')
    return requestsList
}

async function getAllUserPendingRequests1(user) {
    let requestsList = await Request.find({
        $or: [
          {'status.statusType': 'LA'},
          {'status.statusType': 'Branch'},
          {'status.statusType': 'Closed'}
        ]
      }).exec();
  }

module.exports={createRequest,getAllUserPendingRequests}