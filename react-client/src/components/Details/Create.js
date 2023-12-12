import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm"
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { loadFormData } from "../../utils/handleFormData";
import { useNavigate } from "react-router";
import styles from './Create.module.css';

export default function Create(){
    const [create,setCreate]=useState({subjects:[]});
    const ctxGlobal=useContext(GlobalContext);
    const navigate=useNavigate()
    const {
        onChangeUserForm,
        onSubmitUserForm,
        formData,
        updateFormFields,
        clearFormFileds
    }=useForm(
        {
            iApplyId:'',
            subjectId:'',
            deadlineDate:'',
            clientEGFN:'',
            finCenter:'',
            refferingFinCenter:'',
            clientName:'',
            product:'',
            ccy:'',
            amount:'',
            description:''

        },onSubmitCreateForm);
    const dashAPI=useService(dashboardServiceFactory);
    const globalCtx=useContext(GlobalContext);
    useEffect(()=>{
        dashAPI.getSubjects()
        .then((data)=>{
            setCreate(data);
            if (data.subjects.length>0){
                updateFormFields({...formData,subjectId:data.subjects[0]._id});
            }
            
        })
        .catch((err)=>{
            globalCtx.handleError(err);
        })
    },[])
    
    function onChangeIAppliId(){
        dashAPI.getIapplyData(formData.iApplyId)
        .then((data)=>{
            delete data.iApplyData.__v;
            delete data.iApplyData._id;
            updateFormFields({...formData,...data.iApplyData});
        })
        .catch((err)=>{
            globalCtx.handleError(err)
            clearFormFileds(['subjectId','description']);
        })
    }
    function onSubmitCreateForm(){
        try {
            let checkedData=loadFormData(formData);
            let serverResponseData=dashAPI.createRequest(checkedData)
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
        <div className={styles["formLarge"]}>
        <h2>Създай заявка</h2>
        <form onSubmit={onSubmitUserForm} className={styles["formLarge"]}>
            <div className={styles["inlineDiv"]}>
                <label for='iApplyId'>Iapply ID</label>
                <input className={styles["normal"]}
                type="text"
                name="iApplyId"
                id="iApplyId"
                placeholder="Апликация в I-apply"
                onBlur={onChangeIAppliId}
                onChange={onChangeUserForm}
                value={formData.iApplyId}
                />
                <label for='subjectName'>Subject</label>
                <select
                onChange={onChangeUserForm}
                value={formData?.subjectId}
                name="subjectId"
                id="subjectName">
                {create?.subjects.map((subject)=>
                    <option key={subject._id} value={subject._id} >{subject.subjectName}</option>)}
                
                </select>
                <label for='deadlineDate'>Краен срок</label>
                <input className={styles["normal"]}
                onChange={onChangeUserForm}
                value={formData.deadlineDate}
                type="date"
                name="deadlineDate"
                id="deadlineDate"
                placeholder="Краен срок"
                />
                <label for='clientEGFN'>ЕГН/Булстат</label>
                <input className={styles["normal"]}
                onChange={onChangeUserForm}
                value={formData.clientEGFN}
                type="text"
                name="clientEGFN"
                id="clientEGFN"
                placeholder="ЕГН/Булстат на клиента"
    
                disabled
                />
            </div>
            <div className={styles["inlineDiv"]}>
            <label for='finCenter'>Клон/Рефериращ клон</label>
            <div>
            <input 
                onChange={onChangeUserForm}
                value={formData.finCenter}                
                className={styles["small"]}
                type="text"
                name="finCenter"
                id="finCenter"
                placeholder="Клон"
                disabled

                />
                <input
                onChange={onChangeUserForm}
                value={formData.refferingFinCenter}                
                className={styles["verySmall"]}
                type="text"
                name="refferingFinCenter"
                id="refferingFinCenter"
                placeholder="Не"
                disabled
                
                />

            </div>  

                <label for='clientName'>Клиент</label>
                <input className={styles["normal"]}
                onChange={onChangeUserForm}
                value={formData.clientName}                
                type="text"
                name="clientName"
                id="clientName"
                placeholder="Име на клиента"
                disabled
               
                />
                <label for='product'>Продукт</label>
                <input className={styles["normal"]}
                onChange={onChangeUserForm}
                value={formData.product}                
                type="text"
                name="product"
                id="product"
                placeholder="Продукт"
                disabled
             
                />
                <label for='amount'>Сума</label>
                    <div >
                        <input 
                        onChange={onChangeUserForm}
                        value={formData.ccy}
                        className={styles["verySmall"]}
                        type="text"
                        name="ccy"
                        id="ccy"
                        placeholder="CCY"
                        disabled
                    
                        />
                        <input className={styles["small"]}
                        onChange={onChangeUserForm}
                        value={formData.amount}
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Сума"
                        disabled
                
            
                        />

                    </div>
            </div>

                <textarea
                onChange={onChangeUserForm}
                value={formData.description}
                type="textarea"
                name="description"
                id="description"
                placeholder="Описание"
                ></textarea>


            <button type="submit">Изпрати</button>
        </form>
        </div>
        </section>
    )
}