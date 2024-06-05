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
    const [iapplyUpdate,setIapplyUpdate]=useState(false);
    const ctxGlobal=useContext(GlobalContext);
    const navigate=useNavigate();
    
    const createFormInitialValues=
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
    }

    const {
        onChangeUserForm,
        onSubmitUserForm,
        formData,
        updateFormFields,
        clearFormFileds
    }=useForm(createFormInitialValues,onSubmitCreateForm);

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

        return () => {
            ctxGlobal.clearFieldStatuses();
          }
    },[])
    
    function onChangeIAppliId(){

        setIapplyUpdate(true);
        dashAPI.getIapplyData(formData.iApplyId)
        .then((data)=>{
            
            delete data.iApplyData.__v;
            delete data.iApplyData._id;
            updateFormFields({...formData,...data.iApplyData});
            setIapplyUpdate(false);
        })
        .catch((err)=>{
            globalCtx.handleError(err)
            clearFormFileds(['subjectId','description','deadlineDate']);
        });
    }
    function onSubmitCreateForm(){
        try {
            let checkedData=loadFormData(formData);
            let serverResponseData=dashAPI.createRequest(checkedData)
            .then(()=>{
              ctxGlobal.clearFieldStatuses();
              navigate('/dashboard/');
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
                <input 
                className={ctxGlobal.fieldStatuses?.iApplyId?styles['errorNormal']:styles["normal"]}
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
                className={ctxGlobal.fieldStatuses?.subjectId?styles['error']:""}
                onChange={onChangeUserForm}
                value={formData?.subjectId}
                name="subjectId"
                id="subjectName">
                {create?.subjects.map((subject)=>
                    <option key={subject._id} value={subject._id} >{subject.subjectName}</option>)}
                
                </select>
                <label for='deadlineDate'>Краен срок</label>
                <input
                className={ctxGlobal.fieldStatuses?.deadlineDate?styles['errorNormal']:styles["normal"]}
                onChange={onChangeUserForm}
                value={formData.deadlineDate}
                type="date"
                name="deadlineDate"
                id="deadlineDate"
                placeholder="Краен срок"
                />
                <label for='clientEGFN'>ЕГН/Булстат</label>
                
                <input 
                className={ctxGlobal.fieldStatuses?.clientEGFN?styles['errorNormal']:styles["normal"]}
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
                className={ctxGlobal.fieldStatuses?.finCenter?styles['errorSmall']:styles["small"]}
                onChange={onChangeUserForm}
                value={formData.finCenter}                
                type="text"
                name="finCenter"
                id="finCenter"
                placeholder="Клон"
                disabled

                />
                <input
                onChange={onChangeUserForm}
                value={formData.refferingFinCenter}                
                className={ctxGlobal.fieldStatuses?.refferingFinCenter?styles['errorVerySmall']:styles["verySmall"]}
                type="text"
                name="refferingFinCenter"
                id="refferingFinCenter"
                placeholder="Не"
                disabled
                
                />

            </div>  

                <label for='clientName'>Клиент</label>
                <input 
                className={ctxGlobal.fieldStatuses?.clientName?styles['errorNormal']:styles["normal"]}
                onChange={onChangeUserForm}
                value={formData.clientName}                
                type="text"
                name="clientName"
                id="clientName"
                placeholder="Име на клиента"
                disabled
               
                />
                <label for='product'>Продукт</label>
                <input
                onChange={onChangeUserForm}
                value={formData.product}
                className={ctxGlobal.fieldStatuses?.product?styles['errorNormal']:styles["normal"]}           
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
                        className={ctxGlobal.fieldStatuses?.ccy?styles['errorVerySmall']:styles["verySmall"]}
                        type="text"
                        name="ccy"
                        id="ccy"
                        placeholder="CCY"
                        disabled
                    
                        />
                        <input 
                        className={ctxGlobal.fieldStatuses?.amount?styles['errorSmall']:styles["small"]}
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
                className={ctxGlobal.fieldStatuses?.description?styles['error']:""}
                value={formData.description}
                type="textarea"
                name="description"
                id="description"
                placeholder="Описание"
                ></textarea>


            <button disabled={iapplyUpdate} type="submit">Изпрати</button>
        </form>
        </div>
        </section>
    )
}