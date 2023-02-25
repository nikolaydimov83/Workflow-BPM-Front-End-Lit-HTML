const Comment = require("../models/Comment");



async function createCommnet(body,user){
    return await Comment.create({body,commentOwner:user.id})
}

module.exports={createCommnet}