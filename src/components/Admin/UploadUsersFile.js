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
        <>
       
            <section id="create">

                <div className={styles.formLarge}>
                <h2>Създай потребители от файл</h2>                
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

            <section id="edit">       
              <div className={styles.formLarge}>
                <h2>Промени потребители от файл</h2>
                <form name="sendFileWithUsersToEdit" onSubmit={onSubmitUserForm} className={styles["inlineDiv"]}>
                    <div >
                        <label for='fileEdit'>File</label>
                        <input
                        onChange={onChangeUserForm}
                        value={formData.fileEdit}
                        type="file"
                        name="fileEdit"
                        id="file"
                        placeholder="Изберете път на файла"
                        
                        
                        />

                        <button type="submit" id="editUsrBtn">Изпрати</button>
                            
                    </div>
                </form>
                </div>
            </section>            

            <section id="uploadIapply">
                
              <div className={styles.formLarge}>
                
                <h2>Зареди Iapply данна ръчно</h2>
                <form name="sendFileIapplyManualUpld" onSubmit={onSubmitUserForm} className={styles["inlineDiv"]}>
                    <div >
                        <label for='iapplyEdit'>File</label>
                        <input
                        onChange={onChangeUserForm}
                        value={formData.fileEdit}
                        type="file"
                        name="iapplyEdit"
                        id="file"
                        placeholder="Изберете път на файла"
                        
                        
                        />

                        <button type="submit" id="iapplyBtn">Изпрати</button>
                            
                    </div>

                </form>                
              </div>
            </section>

            <section id="uploadRequests">
                
                <div className={styles.formLarge}>
                  
                  <h2>Мигриране на заявки</h2>
                  <form name="sendFileTransferRequests" onSubmit={onSubmitUserForm} className={styles["inlineDiv"]}>
                      <div >
                          <label for='transferFile'>File</label>
                          <input
                          onChange={onChangeUserForm}
                          value={formData.fileEdit}
                          type="file"
                          name="transferFile"
                          id="file"
                          placeholder="Изберете път на файла"
                          />
                          <button type="submit" id="transferBtn">Изпрати</button>
                              
                      </div>
  
                  </form>                
                </div>
              </section>
        </>
            
    )
}