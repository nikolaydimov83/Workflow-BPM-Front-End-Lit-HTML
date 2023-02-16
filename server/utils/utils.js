const UserActiveDir = require("../models/UserActiveDir");

function parseError(error){
if (error.name=='ValidationError'){
return Object.values(error.errors).map((e)=>e.message).join('/n');

}else if(error.name){
    return error.message
}else {
    return error.map((e)=>e.msg).join('/n')
}
}

function checkUserEnrolled(instance,req) {
    let userHasEnrolled=false
    if (instance.enrolledUsers.length > 0) {
        if (instance.enrolledUsers.find((user) => user._id.toString() === req.userData._id.toString())) {
            userHasEnrolled = true;
        }
    }
    return userHasEnrolled;
}

function renameBodyProperties(req) {
    //Array of arrays for properties to remove. Each array consists of 
    //roperty name from form as first parameter, property name of Shema as second
    const propertiesToRename=[]
    let instance = req.body;
    propertiesToRename.forEach((prop)=>{
        instance[prop[1]]=instance[prop[0]];
        delete instance[prop[0]]
    })

    return instance;
}



module.exports={parseError,renameBodyProperties,checkUserEnrolled}


