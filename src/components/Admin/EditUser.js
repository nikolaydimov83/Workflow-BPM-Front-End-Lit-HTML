import { useNavigate, useParams } from "react-router";
import adminServiceFactory from "../../api/services/adminServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { useForm } from "../../hooks/useForm";
import { loadFormData } from "../../utils/handleFormData";
import styles from './Admin.module.css'

export default function EditUser(){
    const {id}=useParams();
    const [userDetails,setUserDetails]=useState({listOfRoles:[]});
    const adminApi=useService(adminServiceFactory);
    const ctxGlobal=useContext(GlobalContext);

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
                        userStatus:'',
                        id:''
                    },handleOnSbmtUsrEditFrm)

    useEffect(()=>{
        adminApi.getUserFromAdminById(id)
        .then((data)=>{
            data.id=data._id;
            setUserDetails({...data});
            updateFormFields(
                {            
                    branchNumber:data.branchNumber,
                    branchName:data.branchName,
                    email:data.email,
                    role:data.role,
                    userStatus:data.userStatus,
                    id:data.id
                })
            
            

            
        }).catch((err)=>{
            navigate('/dashboard/'+id);
            ctxGlobal.handleError(err);
        })
    },[id]);

    function handleOnSbmtUsrEditFrm(){
        try {
            let checkedData=loadFormData(formData);
            let serverResponseData=adminApi.editUserFromAdmin(id,checkedData)
            .then(()=>{
              navigate('/dashboard/')
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
                <h2>Промени потребител</h2>
                <div className={styles["formLarge"]}>
                
                <form onSubmit={onSubmitUserForm} className={styles.inlineDiv}>
                    <div class="inlineDiv">
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
                        
                        disabled
                        
                        />
                        <label for='role'>Role</label>
                        <select 
                            class="details-property-info" 
                            name="role"
                            onChange={onChangeUserForm}
                            value={formData.role}
                        >
                            {userDetails.listOfRoles.map((role)=>
                            <option key={role._id} value={role._id} selected={role.selected} >{role.role}</option>)}
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
                        <label for='User Id'>User Id</label>
                        <input
                        onChange={onChangeUserForm}
                        value={formData.id}                        
                        type="text"
                        name="id"
                        id="id"
                        
                        disabled
                        
                        />
                        <button type="submit" id="editUsrBtn">Изпрати</button>
                            
                    </div>

                </form>
                </div>
            </section>
    )
}