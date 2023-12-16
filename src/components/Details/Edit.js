import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useForm } from "../../hooks/useForm";
import { stringifyDates } from "../../utils/handleDates";
import { loadFormData } from "../../utils/handleFormData";
import styles from './Edit.module.css';
export default function Edit(){
    const {id}=useParams();
    const [request,setRequest]=useState({});
    const dashApi=useService(dashboardServiceFactory);
    const ctxGlobal=useContext(GlobalContext);

    const navigate=useNavigate();
    useEffect(()=>{
        dashApi.getById(id)
        .then((data)=>{
              data.comments.sort((a,b)=>new Date(b.commentDate) - new Date(a.commentDate))
              let dataStringifiedDates=stringifyDates([data]);
              dataStringifiedDates=dataStringifiedDates[0];
              let lastCommnet;
              if(data.comments.length){
                lastCommnet=data.comments[0]
              }
            setRequest({...data,lastCommnet});
            

            
        }).catch((err)=>{
            navigate('/dashboard/'+id);
            ctxGlobal.handleError(err);
        })

        return () => {
          ctxGlobal.clearFieldStatuses();
        }
    },[id]);

    const {
        onChangeUserForm,
        onSubmitUserForm,
        formData
    } = useForm({newDeadline:'',commentText:''},handleOnSubmitEditForm);
    
    function handleOnSubmitEditForm(){
        try {
            let checkedData=loadFormData(formData);
            let serverResponseData=dashApi.editRequest(id,checkedData)
            .then(()=>{
              navigate('/dashboard/'+id)
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
            <h3>Промяна на краен срок</h3>
            <div className={styles["formLarge"]}>
            
            <div>
                <p ><span>ФЦ/Рефериращ ФЦ</span>:  
                
                {request.finCenter}/{request.refferingFinCenter?request.refferingFinCenter:`Няма рефериращ`}
                
                </p>
                <p ><span>Номер I-apply</span>:  {request.iApplyId}</p>
                <p ><span>ЕГН/Булстат</span>:   {request.clientEGFN}</p>
                <p ><span>Клиент</span>:   {request.clientName}</p>
                <p ><span>Продукт</span>:    {request.product}</p>
                <p ><span>Сума</span>:  {request.ccy} {request.amount}</p>
                <p ><span>Статус</span>:  {request?.status?.statusName}</p>
                <p ><span>Изпратен от</span>:  {request.statusSender}</p>
                <p ><span>Изпратен на дата</span>:  {request.statusIncomingDate}</p>
                <p ><span>Последен коментар</span>:  {request?.lastCommnet?.body}</p>
                <p ><span>Краен срок</span>:  {request.deadlineDate} </p> 
            </div>

                
                
                <form onSubmit={onSubmitUserForm} >

                    
                    <label htmlFor="commentText">Коментар</label>   
                    <textarea 
                        onChange={onChangeUserForm}
                        value={formData.commentText}
                        className={ctxGlobal.fieldStatuses?.commentText?styles['error']:''}
                        type="textarea" 
                        name="commentText" 
                        id="commentText" 
                        placeholder="Описание"
                        ></textarea>
                        
                        <label htmlFor="newDeadline">Нов краен срок</label> 
                        
                        <input
                        className={ctxGlobal.fieldStatuses?.newDeadline?styles['error']:''}
                        onChange={onChangeUserForm} 
                        type="date" 
                        name="newDeadline" 
                        id='newDeadline' 
                        placeholder="Въведете нов краен срок" 
                        value={formData.deadlineDate}
                        />
                        <button type="submit">Изпрати</button>
                </form>
                
            </div>
    </section>
    )
}