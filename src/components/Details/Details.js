import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import { GlobalContext } from "../../contexts/GlobalContext";
import { stringifyDates } from "../../utils/handleDates";
import { useForm } from "../../hooks/useForm";
import { loadFormData } from "../../utils/handleFormData";
import { Link } from "react-router-dom";
import styles from './Details.module.css';
import formStyles from './DetailsIapplyData.module.css'
import DetailsMainInfo from "./DetailsMainInfo";
import DetailsIapplyData from "./DetailsIapplyData";
import DetailsExplanation from "./DetailsExplanation";
import DetailsComment from "./DetailsComment";
import HistoryButton from "./HistoryButton";
import { DetailsContext } from "../../contexts/DetailsContext";
import HistoryDiv from "./HistoryDiv";

export default function Details(){
    const {id} = useParams();
    const [request,setRequest]=useState({});
    const [history,setHistory]=useState([{}]);
    const [historyActive,setHistoryActive]=useState(false);
    const dashApi=useService(dashboardServiceFactory);
    const ctxGlobal=useContext(GlobalContext);
    const ctxDetails=useContext(DetailsContext);

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
            let statusId=''
            if (data.status.nextStatuses.length>0){
                statusId=data.status.nextStatuses[0]._id
            }
            updateFormFields({nextStatus:statusId})

            
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
        <>
            <HistoryButton></HistoryButton>
            <section id="details" className={styles['section']}>
              {ctxDetails.historyActive?<HistoryDiv/>:''}
              <div className={styles.formLarge}>
                <DetailsMainInfo request={request}/>
                <DetailsIapplyData request={request}/>
                  <div className={formStyles["inlineDivDetails"]}>
                    <h3>Информация за статус на заявката</h3>
                      <p class="details-property-info"><span>Статус</span>:  {request?.status?.statusName}</p>
                      <p class="details-property-info"><span>Изпратен от</span>:  {request.statusSender}</p>
                      <p class="details-property-info"><span>Изпратен на дата</span>:  {request.statusIncomingDate}</p>
                      {request.checkUserCanChangeStatus?
                        <form onSubmit={onSubmitUserForm}>
                            <label for='nextStatus'>Промени статус на:</label>
                            <select 
                                value={formData.nextStatus}
                                onChange={onChangeUserForm} 
                                name="nextStatus"
                            >
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
                    <DetailsExplanation request={request}/>
                   
                    {request.comments.map((comment)=>
                        <DetailsComment comment={comment}/>
                    )}
            </div>
            </section>
            </>
                    )
}
}