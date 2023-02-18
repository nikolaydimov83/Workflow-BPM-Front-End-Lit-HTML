const Subject = require("../models/Subject");

async function createSubject(subjectName,workflow,canBeInitiatedByRole){
    let subject=await Subject.create({subjectName,assignedToWorkflow:workflow,canBeInitiatedByRole});
    return subject
}

async function editSubjectName(subject,subjectName){
    subject.subjectName=subjectName;
    subject.save();
}   

module.exports={createSubject,editSubjectName}