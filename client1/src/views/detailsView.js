import { del, get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData, stringifyDates } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let detailsTemplate=(data,changeStatus,lastCommnet)=>html`<section id="details">


<div class="formLarge">
  <div>
      <div class="details-headline-wrapper">
    <h1>Subject: ${data.subjectId.subjectName}</h1>
    <h1>Status: ${data.status.statusName}</h1>
    <h1>Deadline:${data.deadlineDate}</h1>
    <h1>${data.clientName}</h1>
  </div>
  <div class="details-headline-wrapper">
  <h1>Последен Коментар:</h1>
  <p>${lastCommnet?html`${lastCommnet.commentOwner.email}: ${lastCommnet.body}`:'Все още няма коментари'}</p>
  </div>
  </div>



  <div class="inlineDivDetails">
  <h3>Client info</h3>
  <p class="details-property-info"><span>ФЦ/Рефериращ ФЦ</span>:  ${data.finCenter}/${data.refferingFinCenter?data.refferingFinCenter:html`Няма рефериращ`}</p>
      <p class="details-property-info"><span>ID</span>:  ${data.iApplyId}</p>
      <p class="details-property-info"><span>EGFN</span>:   ${data.clientEGFN}</p>
      <p class="details-property-info"><span>Клиент</span>:   ${data.clientName}</p>
      <p class="details-property-info"><span>Продукт</span>:    ${data.product}</p>
      <p class="details-property-info"><span>Сума</span>:  ${data.ccy} ${data.amount}</p>

      
  </div>

  <div class="inlineDivDetails">
  <h3>Request status info</h3>
  <p class="details-property-info"><span>Status</span>:  ${data.status.statusName}</p>
  <p class="details-property-info"><span>Изпратен от</span>:  ${data.statusSender}</p>
  <p class="details-property-info"><span>Изпратен на дата</span>:  ${data.statusIncomingDate}</p>
  
  ${data.checkUserCanEditRequest?html`<form @submit=${changeStatus}>
        <select class="details-property-info" name="nextStatus">
    ${repeat(data.status.nextStatuses,(nextStatus)=>nextStatus._id,(nextStatus)=>html`
            <option value="${nextStatus._id}" >${nextStatus.statusName}</option>
          `)}
    </select>
    <button>Смени Статус</button>
    <a href="/comment/create/${data._id}">Добави коментар</a>
  </form>`:''}
  

  </div>

  <div class="inlineDivDetails">
  <h3>Request Description</h3>
  <p class="details-property-info-description"><span></span>  ${data.description}</p>
  </div>

  ${repeat(data.comments,(comment)=>comment._id,(comment)=>html`
              <div class='comments-history'>
                <div ><span>${comment.commentOwner.email} : ${comment.commentDate} </span></div><p class='comment-body-history'><br>${comment.body}</p>
              </div>
    `)}


</section>`
let outerCtx=null;
export async function showRequestDetails(ctx){
    try{
        let id=ctx.params.requestId 
        outerCtx=ctx; 
        let data=await get(`/data/catalog/${id}`);
        data.comments=data.comments.sort((a,b)=>{
          return ((new Date(b.commentDate) - new Date(a.commentDate)));
      })
        let dataStringifiedDates=stringifyDates([data]);
        dataStringifiedDates=dataStringifiedDates[0];
        let lastCommnet;
        if(data.comments.length){
          lastCommnet=data.comments[0]
        }
        ctx.renderView(detailsTemplate(dataStringifiedDates,changeStatus,lastCommnet));
    }catch(error){
      errorHandler(error);
    }
    
    async function changeStatus(ev){
      ev.preventDefault();
      let id=ctx.params.requestId
      try {
        let data=loadFormData(ev.target);
        let serverResponseData=await post(`/data/changeStatus/${id}`,data)
        ctx.page.redirect('/dashboard');
      
      } catch (error) {
        errorHandler(error);
      }
    }

    async function addComment(ev){
      try {
        
      
      } catch (error) {
        errorHandler(error);
      }
    }
}

