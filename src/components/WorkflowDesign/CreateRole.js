import workflowServiceFactory from "../../api/services/workflowServiceFactory";
import { useForm } from "../../hooks/useForm"
import { useService } from "../../hooks/useService";
import { loadFormData } from "../../utils/handleFormData"
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import styles from './CreateRole.module.css'
import WorkflowCreateEditNav from "./WorkflowCreateEditNav";
import { useNavigate, useParams } from "react-router";

export default function CreateRole(){
    const {id}=useParams();
    const workflowApi=useService(workflowServiceFactory);
    const ctxGlobal=useContext(GlobalContext);
    const navigate=useNavigate();
    const {
        onChangeUserForm,
        onSubmitUserForm,
        formData,
        updateFormFields
    } = useForm({
        roleType:'',
        roleName:''
    },handleCreateRoleFormSbmt)
    useEffect(()=>{
        if(id){
            workflowApi.getRoleById(id)
            .then((data)=>{
                updateFormFields({roleName:data.roleName,roleType:data.roleType});
            })
            .catch((err)=>{
                ctxGlobal.handleError(err);
            })
        }
    },[id]);
    function handleCreateRoleFormSbmt(){

        try {
        const checkedData=loadFormData(formData);
        let action=id?workflowApi.editRole:workflowApi.createroles
        
        action(checkedData,id)
        .then(()=>{
            navigate('/roles')
          })
          .catch((err)=>{
            ctxGlobal.handleError(err);
          })            
        } catch (error) {
            ctxGlobal.handleError(error)
        }

    }
    return (
        <section id="createRole">
            <WorkflowCreateEditNav/>
            <h2>Create Role</h2>
            <div className={styles["formLarge"]}>
            
            <form className={styles["inlineDiv"]} onSubmit={onSubmitUserForm} >
                <input 
                    onChange={onChangeUserForm} 
                    value={formData.roleType}
                    type="text" 
                    name="roleType" 
                    id="roleType" 
                    placeholder="Branch or HO" 
                />
                <input
                    onChange={onChangeUserForm} 
                    value={formData.roleName}
                    type="text"
                    name="roleName"
                    id="roleName"
                    placeholder="Role name"
                />
                <button type="submit">Save</button>
            </form>
            </div>
        </section>
    )
}