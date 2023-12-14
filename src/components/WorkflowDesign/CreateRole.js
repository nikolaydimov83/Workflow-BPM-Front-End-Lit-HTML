import { useNavigate } from "react-router";
import workflowServiceFactory from "../../api/services/workflowServiceFactory";
import { useForm } from "../../hooks/useForm"
import { useService } from "../../hooks/useService";
import { loadFormData } from "../../utils/handleFormData"
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import styles from './CreateRole.module.css'
import WorkflowCreateEditNav from "./WorkflowCreateEditNav";

export default function CreateRole(){
    const workflowApi=useService(workflowServiceFactory);
    const navigate=useNavigate();
    const ctxGlobal=useContext(GlobalContext);
    const {
        onChangeUserForm,
        onSubmitUserForm,
        formData,
        updateFormFields,
        clearFormFileds
    } = useForm({
        roleType:'',
        roleName:''
    },handleCreateRoleFormSbmt)
    function handleCreateRoleFormSbmt(){

        try {
        const checkedData=loadFormData(formData);
        workflowApi.createroles(checkedData)
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
                <button type="submit">Create Role</button>
            </form>
            </div>
        </section>
    )
}