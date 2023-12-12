import { useNavigate, useParams } from "react-router";
import adminServiceFactory from "../../api/services/adminServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { useForm } from "../../hooks/useForm";
import { loadFormData } from "../../utils/handleFormData";
import { serviceFactory } from "../../api/api";
import styles from './Admin.module.css';

export default function CreateUser(){
    const adminApi=useService(adminServiceFactory);
    const api=useService(serviceFactory);
    const ctxGlobal=useContext(GlobalContext);
    const [roles,setRoles]=useState([]);
    const navigate=useNavigate();
    const {        
            onChangeUserForm,
            onSubmitUserForm,
            formData,
            updateFormFields,
           }=useForm(
                    {
                        branchNumber:'',
                        branchName:'',
                        email:'',
                        role:'',
                        userStatus:''
                    },handleOnSbmtUsrCreateFrm)

    useEffect(()=>{
        api.get('/workflow/roles')
        .then((data)=>{
            setRoles(data);
            updateFormFields(
                {            
                    branchNumber:'',
                    branchName:'',
                    email:'',
                    role:data[0]._id,
                    userStatus:''
                });
            
            

            
        }).catch((err)=>{
            navigate('/dashboard');
            ctxGlobal.handleError(err);
        })
    },[]);

    function handleOnSbmtUsrCreateFrm(){
        try {
            let checkedData=loadFormData(formData);
            let serverResponseData=adminApi.createUserFromAdmin(checkedData)
            .then(()=>{
              navigate('/dashboard')
            })
            .catch((err)=>{
              ctxGlobal.handleError(err);
            })
            
          
          } catch (error) {
            ctxGlobal.handleError(error);
          }
    }

    return (
            <section id="create">
                <h2>Създай потребител</h2>
                <div className={styles.formLarge}>
                
                <form onSubmit={onSubmitUserForm} className={styles["inlineDiv"]}>
                    <div >
                        <label for='branchNumber'>Branch Number</label>
                        <input
                        onChange={onChangeUserForm}
                        value={formData.branchNumber}
                        type="text"
                        name="branchNumber"
                        id="branchNumber"
                        placeholder="Въведе номер на роля/клон"
                        
                        
                        />

                        <label for='branchName'>Branch Name</label>
                        <input
                        onChange={onChangeUserForm}
                        value={formData.branchName}
                        type="text"
                        name="branchName"
                        id="branchName"
                        placeholder="Въведе име на клон или роля в ЦУ"
                        
                        
                        />

                        <label for='email'>Email</label>
                        <input
                        onChange={onChangeUserForm}
                        value={formData.email}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Мейл на потребителя"
                        
                        />
                        <label for='role'>Role</label>
                        <select 
                            class="details-property-info" 
                            name="role"
                            onChange={onChangeUserForm}
                            value={formData.role}
                        >
                            {roles.map((role)=>
                            <option key={role._id} value={role._id} >{role.role}</option>)}
                        </select>
                        <label for='userStatus'>User Status</label>
                        <input
                        onChange={onChangeUserForm}
                        value={formData.userStatus}
                        type="text"
                        name="userStatus"
                        id="userStatus"
                        placeholder="Active/Inactive"
                        
                        
                        />
                        <button type="submit" id="editUsrBtn">Изпрати</button>
                            
                    </div>

                </form>
                </div>
            </section>
    )
}