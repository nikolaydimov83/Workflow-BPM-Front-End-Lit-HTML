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




/*    Status name	Next Statuses	Role
1	Предварителен преглед	[2]	LA
2	За изпълнение от клона	[3]	Branch
3	В ЦУ за подготовка на договорна документация	[4,6]	LA
4	Документация в клона за подпис	[5]	Branch
5	Изпратена в ЦУ за преглед на документи и изпълнение	[6,7,8,9,10]	LA
6	Върната в клона за корекции или отстраняване на пропуски	[3,5]	Branch
7	Приключена с изпълнени от клиента условия	[]	Closed
8	Приключена с наложено наказание	[]	Closed
9	Приключена с мемо от Кредитния отдел	[]	Closed
10	Приключена с погасен кредит	[]	Closed*/




/*const requestSchema=new Schema({
    statusName:{type:String, required:true},
    nextStatuses:{type:[Types.ObjectId],ref:'Status'},
    statusCreateDate:{type:Date,default:Date.now,immutable:true},
    statusType:{type:String,enum:roles}
});*/

module.exports={createStatus,assignStatusWithNextStatuses}