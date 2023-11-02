import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData,stringifyDates } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let editTemplate=(data,lastCommnet,submitEditForm)=>html`<section id="create">
<div class="formLarge">
  <h4>Добавяне на коментар</h4>
  <div class="comment-request-details">
    <p class="details-cretae-comment"><span>ФЦ/Рефериращ ФЦ</span>:  ${data.finCenter}/${data.refferingFinCenter?data.refferingFinCenter:html`Няма рефериращ`}</p>
    <p class="details-cretae-comment"><span>ID</span>:  ${data.iApplyId}</p>
    <p class="details-cretae-comment"><span>EGFN</span>:   ${data.clientEGFN}</p>
    <p class="details-cretae-comment"><span>Клиент</span>:   ${data.clientName}</p>
    <p class="details-cretae-comment"><span>Продукт</span>:    ${data.product}</p>
    <p class="details-cretae-comment"><span>Сума</span>:  ${data.ccy} ${data.amount}</p>
    <p class="details-cretae-comment"><span>Status</span>:  ${data.status.statusName}</p>
    <p class="details-cretae-comment"><span>Изпратен от</span>:  ${data.statusSender}</p>
    <p class="details-cretae-comment"><span>Изпратен на дата</span>:  ${data.statusIncomingDate}</p>
    <p class="details-cretae-comment"><span>Последен коментар</span>:  ${lastCommnet}</p>
  </div>

    <h3>Промени данни по заявката</h3>
    <form @submit=${submitEditForm} class="create-comment-form">
    <p class="details-cretae-comment"><span>Краен срок</span>:  ${data.deadlineDate} 
    <span>Нов краен срок</span> <input type="date" name="newDeadline" placeholder="Enter new Deadline" .value=${data.deadlineDate}></p>
        
        <textarea type="textarea" name="commentText" id="description" placeholder="Описание"></textarea>
        <button type="submit">Изпрати</button>
    </form>
      

  
</div>
</section>`

let outerCtx=null;
export async function showEditRequest(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.id
        let data=await get(`/data/catalog/${id}`);
        let dataStringifiedDates=stringifyDates([data]);
        dataStringifiedDates=dataStringifiedDates[0];
        let lastCommnet;
        if(data.comments.length){
          lastCommnet=data.comments[data.comments.length-1].body
        }
        console.log(data);
        
        ctx.renderView(editTemplate(dataStringifiedDates,lastCommnet, submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await put(`/data/edit/${outerCtx.params.id}`,data);
            outerCtx.page.redirect(`/dashboard`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}