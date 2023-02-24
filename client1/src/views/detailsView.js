import { del, get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData, stringifyDates } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let shoesDetailsTemplate=(data,isOwner,changeStatus,addComment)=>html`<section id="details">


<div class="formLarge">
  <div>
      <div class="details-headline-wrapper">
    <h1>Subject: ${data.subjectId.subjectName}</h1>
    <h1>Status: ${data.status.statusName}</h1>
  </div>
  <div class="details-headline-wrapper">
    <h1>Deadline:${data.deadlineDate}</h1>
    <h1>${data.clientName}</h1>
  </div>
  </div>



  <div class="inlineDiv">
  <h3>Client info</h3>
  <p class="details-property-info"><span>ФЦ/Рефериращ ФЦ</span>:  ${data.finCenter}/${data.refferingFinCenter?data.refferingFinCenter:html`Няма рефериращ`}</p>
      <p class="details-property-info"><span>ID</span>:  ${data.iApplyId}</p>
      <p class="details-property-info"><span>EGFN</span>:   ${data.clientEGFN}</p>
      <p class="details-property-info"><span>Клиент</span>:   ${data.clientName}</p>
      <p class="details-property-info"><span>Продукт</span>:    ${data.product}</p>
      <p class="details-property-info"><span>Сума</span>:  ${data.ccy} ${data.amount}</p>

      
  </div>

  <div class="inlineDiv">
  <h3>Request status info</h3>
  <p class="details-property-info"><span>Status</span>:  ${data.status.statusName}</p>
  <p class="details-property-info"><span>Изпратен от</span>:  ${data.statusSender}</p>
  <p class="details-property-info"><span>Изпратен на дата</span>:  ${data.statusIncomingDate}</p>
  <form @submit=${changeStatus}>
        <select class="details-property-info" name="nextStatus">
    ${repeat(data.status.nextStatuses,(nextStatus)=>nextStatus._id,(nextStatus)=>html`
            <option value="${nextStatus._id}" >${nextStatus.statusName}</option>
          `)}
    </select>
    <button>Смени Статус</button>
  </form>

  </div>

  <div class="inlineDiv">
    <p>Brand: <span id="details-brand">${data.brand}</span></p>
  </div>


</section>`
let outerCtx=null;
export async function showRequestDetails(ctx){
    try{
        let id=ctx.params.requestId 
        outerCtx=ctx
        
        let data=await get(`/data/catalog/${id}`);
        console.log(data);
        let isOwner=isUserOwner(data)
        let dataStringifiedDates=stringifyDates([data]);
        dataStringifiedDates=dataStringifiedDates[0]
        ctx.renderView(shoesDetailsTemplate(dataStringifiedDates,isOwner,changeStatus,addComment));
    }catch(error){
      errorHandler(error);
    }

    function isUserOwner(data){
        if(getUserData()?._id===data._ownerId){
            return true
        }else{
            return false
        }
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

