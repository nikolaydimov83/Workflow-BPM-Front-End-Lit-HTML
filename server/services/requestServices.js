const Request = require("../models/Request");
const Status=require('../models/Status')

async function createRequest(requestObject){
    return await (await Request.create(requestObject)).populate('status');
}

module.exports={createRequest}