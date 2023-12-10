import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useForm } from "../../hooks/useForm";
import { stringifyDates } from "../../utils/handleDates";
import { loadFormData } from "../../utils/handleFormData";

export default function Edit(){
    const {id}=useParams();
    const [request,setRequest]=useState({});
    const dashApi=useService(dashboardServiceFactory);
    const ctxGlobal=useContext(GlobalContext);

    const navigate=useNavigate();
    useEffect(()=>{
        dashApi.getById(id)
        .then((data)=>{
            data.comments=data.comments.sort((a,b)=>{
                return ((new Date(b.commentDate) - new Date(a.commentDate)));
            })
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
<div class="formLarge">
  <h4>Промяна на краен срок</h4>
  <div class="comment-request-details">
    <p class="details-cretae-comment"><span>ФЦ/Рефериращ ФЦ</span>:  {request.finCenter}/{request.refferingFinCenter?request.refferingFinCenter:`Няма рефериращ`}</p>
    <p class="details-cretae-comment"><span>Номер I-apply</span>:  {request.iApplyId}</p>
    <p class="details-cretae-comment"><span>ЕГН/Булстат</span>:   {request.clientEGFN}</p>
    <p class="details-cretae-comment"><span>Клиент</span>:   {request.clientName}</p>
    <p class="details-cretae-comment"><span>Продукт</span>:    {request.product}</p>
    <p class="details-cretae-comment"><span>Сума</span>:  {request.ccy} {request.amount}</p>
    <p class="details-cretae-comment"><span>Статус</span>:  {request?.status?.statusName}</p>
    <p class="details-cretae-comment"><span>Изпратен от</span>:  {request.statusSender}</p>
    <p class="details-cretae-comment"><span>Изпратен на дата</span>:  {request.statusIncomingDate}</p>
    <p class="details-cretae-comment"><span>Последен коментар</span>:  {request.lastCommnet}</p>
    <p class="details-cretae-comment"><span>Краен срок</span>:  {request.deadlineDate} </p> 
  </div>

    <h3>Промени данни по заявката</h3>
    
    <form onSubmit={onSubmitUserForm} class="create-comment-form">
       
        <span>Нов краен срок</span> 
        <input
            onChange={onChangeUserForm} 
            type="date" 
            name="newDeadline" 
            id='newDeadline' 
            placeholder="Въведете нов краен срок" 
            value={formData.deadlineDate}/>
        
            
        <textarea 
            onChange={onChangeUserForm}
            value={formData.commentText}
            type="textarea" 
            name="commentText" 
            id="commentText" 
            placeholder="Описание"
            ></textarea>
        <button type="submit">Изпрати</button>
    </form>
      

  
</div>
</section>
    )
}