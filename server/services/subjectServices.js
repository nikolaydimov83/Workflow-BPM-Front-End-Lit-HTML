const Subject = require("../models/Subject");
const Workflow = require("../models/Workflow");

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
    let allWorkflows=await Workflow.find({}).populate('initialStatus');
    let workflows=allWorkflows.filter((workflow)=>workflow.initialStatus.statusType.toString()==role.toString());
    let result=new Set()

    for (const workflow of workflows) {
        let subjects=await Subject.find({assignedToWorkflow:workflow.id})
        subjects.forEach((subject)=>{
            result.add(subject)
        })
    }

    return Array.from(result)//await Subject.find({canBeInitiatedByRole:role})
}

async function getAllSubjects(){
        return Subject.find({}).populate('assignedToWorkflow');
}

module.exports={createSubject, 
                editSubjectName,
                findWorkflowBySubjectId,
                findAllSubjectsByRole,
                getAllSubjects}