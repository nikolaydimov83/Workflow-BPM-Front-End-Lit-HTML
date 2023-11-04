const Subject = require("../models/Subject");

async function createSubject(subjectName,workflow,canBeInitiatedByRole){
    let subject=await Subject.create({subjectName,assignedToWorkflow:workflow,canBeInitiatedByRole});
    return subject
}

async function editSubjectName(subject,subjectName){
    subject.subjectName=subjectName;
    subject.save();
}

async function findWorkflowBySubjectId(subjectId){
    let subject=await Subject.findById(subjectId).populate('assignedToWorkflow');
    return subject.assignedToWorkflow
}

async function findAllSubjectsByRole(role){
    return await Subject.find({canBeInitiatedByRole:role})
}

module.exports={createSubject,editSubjectName,findWorkflowBySubjectId,findAllSubjectsByRole}