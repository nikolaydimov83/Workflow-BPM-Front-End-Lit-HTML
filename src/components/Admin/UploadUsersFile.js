import { useNavigate, useParams } from "react-router";
import adminServiceFactory from "../../api/services/adminServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { useForm } from "../../hooks/useForm";
import { loadFormData } from "../../utils/handleFormData";
import { serviceFactory } from "../../api/api";
import styles from './Admin.module.css';

export default function UploadUsersFile(){
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

                    },handlOnSubmitCreateUsersFromFile);

    function handlOnSubmitCreateUsersFromFile(formData,e){
        try {
            const toProcess = new FormData();
            toProcess.append('file', formData);
            adminApi[e.target.name](toProcess,formData.type, formData.size)
            .then(()=>{

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
                <h2>Създай потребители от файл</h2>
                <div className={styles.formLarge}>
                
                <form name="sendFileWithUsersToCreate" onSubmit={onSubmitUserForm} className={styles["inlineDiv"]}>
                    <div >
                        <label for='file'>File</label>
                        <input
                        onChange={onChangeUserForm}
                        value={formData.file}
                        type="file"
                        name="file"
                        id="file"
                        placeholder="Изберете път на файла"
                        
                        
                        />

                        <button type="submit" id="editUsrBtn">Изпрати</button>
                            
                    </div>

                </form>
                </div>
            </section>
    )
}