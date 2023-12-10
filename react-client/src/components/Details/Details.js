import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { stringifyDates } from "../../utils/handleDates";
import { useForm } from "../../hooks/useForm";
import { loadFormData } from "../../utils/handleFormData";
import { DashboardContext } from "../../contexts/DashboardContext";
import { Link } from "react-router-dom";

export default function Details(){
    const {id} = useParams();
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
            
            updateFormFields({nextStatus:data.status.nextStatuses[0]._id})

            
        }).catch((err)=>{
            navigate('/dashboard');
            ctxGlobal.handleError(err);
        })
    },[id])
    
    const {
        onChangeUserForm,
        onSubmitUserForm,
        formData,
        updateFormFields
    } = useForm({nextStatus:''},changeStatus);

    async function changeStatus(ev){
    
        try {
          let checkedData=loadFormData(formData);
          let serverResponseData=dashApi.changeStatus(id,checkedData)
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

    if(request._id){
    return (
        
             <section id="details">

                <div class="formLarge">

                    <div class="details-headline-wrapper">
                        <h1>Subject: {request?.subjectId?.subjectName}</h1>
                        <h1>Статус: {request?.status?.statusName}</h1>
                        <h1>Краен Срок:{request.deadlineDate}</h1>
                        <h1>{request.clientName}</h1>
                    </div>

                    <div class="details-headline-wrapper">
                    <h1>Последен Коментар:</h1>
                    <p>{request.lastCommnet?request.lastCommnet.commentOwner.email+':'+request.lastCommnet.body:'Все още няма коментари'}</p>
                    </div>
                    <div class="inlineDivDetails">
                <h3>Информация за клиента</h3>
                <p class="details-property-info"><span>ФЦ/Рефериращ ФЦ</span>:  {request.finCenter}/{request.refferingFinCenter?request.refferingFinCenter:`Няма рефериращ`}</p>
                    <p class="details-property-info"><span>Номер I-Apply</span>:  {request.iApplyId}</p>
                    <p class="details-property-info"><span>ЕГН/Булстат</span>:   {request.clientEGFN}</p>
                    <p class="details-property-info"><span>Клиент</span>:   {request.clientName}</p>
                    <p class="details-property-info"><span>Продукт</span>:    {request.product}</p>
                    <p class="details-property-info"><span>Сума</span>:  {request.ccy} {request.amount}</p>

                    
                </div>

                <div class="inlineDivDetails">
                    <h3>Информация за статус на заявката</h3>
                    <p class="details-property-info"><span>Статус</span>:  {request?.status?.statusName}</p>
                    <p class="details-property-info"><span>Изпратен от</span>:  {request.statusSender}</p>
                    <p class="details-property-info"><span>Изпратен на дата</span>:  {request.statusIncomingDate}</p>
                    
                    {request.checkUserCanChangeStatus?
                    <form onSubmit={onSubmitUserForm}>
                    <label for='nextStatus'>Промени статус на:</label>
                        <select value={formData.nextStatus}onChange={onChangeUserForm} class="details-property-info" name="nextStatus">
                            {request?.status?.nextStatuses.map((nextStatus)=>
                                <option key={nextStatus._id} value={nextStatus._id} >{nextStatus.statusName}</option>
                            )}
                        </select>
                        <button>Смени Статус</button>
                        <Link to={`/comment/create/${request._id}`}>Добави коментар</Link>
                        {request.privilegedUser?<Link to={`/edit/${request._id}`}>Промени Данни</Link>:''}
                    </form>
                    
                    :<Link to={`/comment/create/${request._id}`}>Добави коментар</Link>}

                </div>

                <div class="inlineDivDetails">
                <h3>Описание по детайли на заявката</h3>
                <p class="details-property-info-description"><span></span>  {request.description}</p>
                </div>

                {request.comments.map((comment)=>
                            <div class='comments-history'>
                                <div ><span>{comment?.commentOwner?.email} : {comment?.commentDate} </span>
                                </div><p class='comment-body-history'><br/>{comment?.body}</p>
                            </div>
                )}
                </div>
            </section>
                    )
}
}