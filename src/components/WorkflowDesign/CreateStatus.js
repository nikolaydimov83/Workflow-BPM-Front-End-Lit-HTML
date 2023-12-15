import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import workflowServiceFactory from "../../api/services/workflowServiceFactory";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { loadFormData } from "../../utils/handleFormData";
import styles from "./CreateStatus.module.css"
import WorkflowCreateEditNav from "./WorkflowCreateEditNav";
import { useNavigate, useParams } from "react-router";

export default function CreateStatus(){
    const workflowApi=useService(workflowServiceFactory);
    const ctxGlobal=useContext(GlobalContext);
    const [roles,setRoles]=useState([]);
    const [statuses,setStatuses]=useState([]);
    const navigate=useNavigate();
    const {id}=useParams();
    const {        
            onChangeUserForm,
            onSubmitUserForm,
            formData,
            updateSomeFormFields,
           }=useForm(
                    {
                        statusName:'',
                        statusType:{},
                        nextStatuses:[],
                    },handleOnSbmtStatusCreateFrm);
                    
    function handleOnSbmtStatusCreateFrm(){
        try {
            let action=id?workflowApi.editStatus:workflowApi.createstatuses
            const checkedData=loadFormData(formData);
            action(checkedData,id)
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
            if(!id){
              //updateSomeFormFields({statusType:data[0]?._id});   
            }
                       
        }).catch((err)=>{
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
            ctxGlobal.handleError(err);
        });
        if(id){
            workflowApi.getStatusById(id)
            .then((data)=>{
                updateSomeFormFields({
                    statusName:data.statusName,
                    statusType:data.statusType._id,
                    nextStatuses:data.nextStatuses.map(stat=>stat._id),
                }); 
            })
            .catch((err)=>{
                ctxGlobal.handleError(err);
            })
        }
    },[id,ctxGlobal]);



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
            
                <select 
                    onChange={onChangeUserForm} 
                    value={formData.nextStatuses} 
                    className={styles["multi"]} 
                    multiple 
                    name='nextStatuses' 
                    id='nextStatuses'
                    >
                
                {
                    statuses.map(stat=>(
                        <option 
                            key={stat._id} 
                            value={stat._id}
                            selected={formData.nextStatuses.includes(stat._id)}
                            >{stat.statusType.role}: {stat.statusName}
                            
                        </option>))}
            
                </select>
                <button type="submit">Save</button>
                
                </form>
            

            </div>
        </section>
    )
}