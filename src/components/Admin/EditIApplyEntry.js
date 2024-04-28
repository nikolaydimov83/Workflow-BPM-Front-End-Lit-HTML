import { useNavigate, useParams } from "react-router";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { useForm } from "../../hooks/useForm";
import { loadFormData } from "../../utils/handleFormData";
import styles from './Admin.module.css'
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import adminServiceFactory from "../../api/services/adminServiceFactory";

export default function EditIapplyEntry(){
    const {id}=useParams();
    const dashApi=useService(dashboardServiceFactory);
    const adminApi=useService(adminServiceFactory)
    const ctxGlobal=useContext(GlobalContext);
    const navigate=useNavigate();
    const [iApplyData, setIApplyData]=useState({})
    const {        
            onChangeUserForm,
            onSubmitUserForm,
            formData,
            updateFormFields,
           }=useForm(
                {
                    iApplyId:'',
                    clientEGFN:'',
                    finCenter:'',
                    refferingFinCenter:'',
                    clientName:'',
                    product:'',
                    ccy:'',
                    amount:''
                },handleOnSbmtUsrEditFrm)

    useEffect(()=>{
        dashApi.getIapplyData(id)
        .then((data)=>{
            data.id=data._id;
            setIApplyData({...data.iApplyData});
            updateFormFields(
                {            
                    iApplyId:data.iApplyData.iApplyId,
                    clientEGFN:data.iApplyData.clientEGFN,
                    finCenter:data.iApplyData.finCenter,
                    refferingFinCenter:data.iApplyData.refferingFinCenter,
                    clientName:data.iApplyData.clientName,
                    product:data.iApplyData.product,
                    ccy:data.iApplyData.ccy,
                    amount:data.iApplyData.amount
                })
            
            

            
        }).catch((err)=>{
            navigate('/dashboard/');
            ctxGlobal.handleError(err);
        })
    },[id]);

    function handleOnSbmtUsrEditFrm(){
        try {
            let checkedData=loadFormData(formData);
            let serverResponseData=adminApi.editIapplyDataAdmin(id,checkedData)
            .then(()=>{
              //navigate('/')
              navigate('/transferIssues')
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
                <h2>Промени I-apply Данна</h2>
                <div className={styles["formLarge"]}>
                
        <form onSubmit={onSubmitUserForm} className={styles["formLarge"]}>
            <div className={styles["inlineDiv"]}>
                <label for='iApplyId'>Iapply ID</label>
                <input 
                className={ctxGlobal.fieldStatuses?.iApplyId?styles['errorNormal']:styles["normal"]}
                type="text"
                name="iApplyId"
                id="iApplyId"
                placeholder="Апликация в I-apply"
                //onBlur={onChangeIAppliId}
                onChange={onChangeUserForm}
                value={formData.iApplyId}
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
                />
                <label for='finCenter'>Клон/Рефериращ клон</label>
           
                <input 
                    className={ctxGlobal.fieldStatuses?.finCenter?styles['errorSmall']:styles["small"]}
                    onChange={onChangeUserForm}
                    value={formData.finCenter}                
                    type="text"
                    name="finCenter"
                    id="finCenter"
                    placeholder="Клон"

                />
                <input
                    onChange={onChangeUserForm}
                    value={formData.refferingFinCenter}                
                    className={ctxGlobal.fieldStatuses?.refferingFinCenter?styles['errorVerySmall']:styles["verySmall"]}
                    type="text"
                    name="refferingFinCenter"
                    id="refferingFinCenter"
                    placeholder="Не"
                
                />
                <label for='clientName'>Клиент</label>
                <input 
                className={ctxGlobal.fieldStatuses?.clientName?styles['errorNormal']:styles["normal"]}
                onChange={onChangeUserForm}
                value={formData.clientName}                
                type="text"
                name="clientName"
                id="clientName"
                placeholder="Име на клиента"
               
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
                    
                        />
                        <input 
                        className={ctxGlobal.fieldStatuses?.amount?styles['errorSmall']:styles["small"]}
                        onChange={onChangeUserForm}
                        value={formData.amount}
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Сума"
                
            
                        />

                    </div>
                <button /*={iapplyUpdate}*/ type="submit">Изпрати</button>    
            </div>




        </form>
                </div>
            </section>
    )
}