import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import workflowServiceFactory from "../../api/services/workflowServiceFactory";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { loadFormData } from "../../utils/handleFormData";
import styles from "./CreateStatus.module.css"
import WorkflowCreateEditNav from "./WorkflowCreateEditNav";

export default function CreateStatus(){
    const workflowApi=useService(workflowServiceFactory)
    const navigate=useNavigate();
    const ctxGlobal=useContext(GlobalContext)
    const [roles,setRoles]=useState([]);
    const [statuses,setStatuses]=useState([])
    const {        
            onChangeUserForm,
            onSubmitUserForm,
            formData,
            updateSomeFormFields,
           }=useForm(
                    {
                        statusName:'',
                        statusType:'',
                        nextStatuses:[],
                    },handleOnSbmtStatusCreateFrm);
                    
    function handleOnSbmtStatusCreateFrm(){
        try {
            const checkedData=loadFormData(formData);
            workflowApi.createstatuses(checkedData)
            .then(()=>{
                navigate('/statuses')
              })
              .catch((err)=>{
                ctxGlobal.handleError(err);
              })            
            } catch (error) {
                ctxGlobal.handleError(error)
            }
    }                
    useEffect(()=>{
        workflowApi.roles()
        .then((data)=>{
            setRoles(data);
            updateSomeFormFields({statusType:data[0]?._id});            
        }).catch((err)=>{
            navigate('/statuses');
            ctxGlobal.handleError(err);
        });
        workflowApi.statuses()
        .then((data)=>{
            data.sort((stat1,stat2)=>{
                if(stat1.statusType.role.toLowerCase()>stat2.statusType.role.toLowerCase()){
                  return -1
                }else{
                  return 1
                }
                
              });
            setStatuses(data);
            //updateSomeFormFields({nextStatuses:[data[0]?._id]});            
        }).catch((err)=>{
            navigate('/statuses');
            ctxGlobal.handleError(err);
        });
    },[]);



    return (
        <section id="createRole">
            <WorkflowCreateEditNav/>
            <div className={styles["formLarge"]}>
            <h2>Create Status</h2>
            
            <form className={styles["inlineDiv"]} onSubmit={onSubmitUserForm}>
                
                <input
                    onChange={onChangeUserForm}
                    value={formData.statusName} 
                    type="text" 
                    name="statusName" 
                    id="statusName" 
                    placeholder="Name of the status" 
                />
                
                <select value={formData.statusType} onChange={onChangeUserForm} name="statusType" id="statusType">
                    {roles.map((role)=><option key={role._id} value={role._id}>{role.role}</option>)}
                </select>
            
                <select onChange={onChangeUserForm} value={formData.nextStatuses} className={styles["multi"]} multiple name='nextStatuses' id='nextStatuses'>
                
                {
                    statuses.map(stat=><option key={stat._id} value={stat._id}>{stat.statusType.role}: {stat.statusName}</option>)}
            
                </select>
                <button type="submit">Create Status</button>
                
                </form>
            

            </div>
        </section>
    )
}