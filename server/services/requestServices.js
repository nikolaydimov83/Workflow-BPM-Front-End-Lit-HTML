const Request = require("../models/Request");

async function createRequest(requestObject){
    return await Request.create(requestObject)
}

module.exports={createRequest}