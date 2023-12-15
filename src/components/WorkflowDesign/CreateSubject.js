import { useNavigate, useParams } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import workflowServiceFactory from "../../api/services/workflowServiceFactory";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { loadFormData } from "../../utils/handleFormData";
import styles from "./CreateSubject.module.css"
import WorkflowCreateEditNav from "./WorkflowCreateEditNav";


export default function CreateSubject(){
    const workflowApi=useService(workflowServiceFactory)
    const ctxGlobal=useContext(GlobalContext);
    const [workflows,setWorkflows]=useState([]);
    const navigate=useNavigate();
    const {id}=useParams()
    const {        
            onChangeUserForm,
            onSubmitUserForm,
            formData,
            updateSomeFormFields,
           }=useForm(
                    {
                        subjectName:'',
                        assignedToWorkflow:'',
                    },handleOnSbmtSubjectCreateFrm);
                    
    function handleOnSbmtSubjectCreateFrm(){
        try {
            let action=id?workflowApi.editSubject:workflowApi.createsubjects;
            const checkedData=loadFormData(formData);
            action(checkedData,id)
            .then(()=>{
                navigate('/subjects')
              })
              .catch((err)=>{
                ctxGlobal.handleError(err);
              })            
            } catch (error) {
                ctxGlobal.handleError(error)
            }
    }                
    useEffect(()=>{
        workflowApi.workflows()
        .then((data)=>{
            setWorkflows(data);
           
        }).catch((err)=>{
     ;
            ctxGlobal.handleError(err);
        });
        if(id){
            workflowApi.getSubjectById(id)
            .then((data)=>{
                updateSomeFormFields({
                    subjectName:data.subjectName,
                    assignedToWorkflow:data.assignedToWorkflow
                }); 
            })
            .catch((err)=>{
     
                ctxGlobal.handleError(err);
            })
        }
    },[]);    
    return (
        <section id="createWorkflow">
            <WorkflowCreateEditNav/>
            <div className={styles["formLarge"]}>
            <h2>Create Workflow</h2>
            
            <form className={styles["inlineDiv"]} onSubmit={onSubmitUserForm}>
            <label for='subjectName'>Subject Name</label>
                <input 
                    onChange={onChangeUserForm}
                    value={formData.subjectName}
                    type="text" 
                    name="subjectName" 
                    id="subjectName" 
                    placeholder="Name of the subject" 
                />
                
                <label for='assignedToWorkflow'>Assign to workflow</label>
                <select  
                    onChange={onChangeUserForm}
                    value={formData.assignedToWorkflow}                    
                    name="assignedToWorkflow" 
                    id="assignedToWorkflow"
                >
                    {workflows.map((workflow)=>
                    <option key={workflow._id} value={workflow._id}>{workflow.workflowName}</option>)}
                </select>
                
                <button type="submit">Save</button>
                
                </form>
            

            </div>
        </section>
    )
}