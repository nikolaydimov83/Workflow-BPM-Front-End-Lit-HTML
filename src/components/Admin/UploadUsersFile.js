import { useNavigate, useParams } from "react-router";
import adminServiceFactory from "../../api/services/adminServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { useForm } from "../../hooks/useForm";
import styles from './UploadUsersFile.module.css';
import Spinner from "../Dashboard/Spinner/Spinner";

export default function UploadUsersFile(){
    const adminApi=useService(adminServiceFactory);
    const ctxGlobal=useContext(GlobalContext);
    const [isBusy,setIsBusy]=useState(false);
    const {        
            onChangeUserForm,
            onSubmitUserForm,
            formData,
           }=useForm(
                    {

                    },handlOnSubmitCreateUsersFromFile);

    function handlOnSubmitCreateUsersFromFile(formData,e){
        try {
          setIsBusy(true);
            const toProcess = new FormData();
            toProcess.append('file', formData);
            adminApi[e.target.name](toProcess,formData.type, formData.size)
            .then(()=>{
              setIsBusy(false);
            })
            .catch((err)=>{
              ctxGlobal.handleError(err);
              setIsBusy(false);
            })
            
          
          } catch (error) {
            ctxGlobal.handleError(error);
            setIsBusy(false);
          }
    }

    return (
        <>
       
            {isBusy?<Spinner/>:''}
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
              <section id="uploadChangeRequestsOwner">
                
                <div className={styles.formLarge}>
                  
                  <h2>Change Requests Owners</h2>
                  <form name="sendFileChangeOwners" onSubmit={onSubmitUserForm} className={styles["inlineDiv"]}>
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
              <section id="uploadChangeRequestsBranches">
                
                <div className={styles.formLarge}>
                  
                  <h2>Change Requests Branches</h2>
                  <form name="sendFileChangeBranches" onSubmit={onSubmitUserForm} className={styles["inlineDiv"]}>
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
        </>
            
    )
}