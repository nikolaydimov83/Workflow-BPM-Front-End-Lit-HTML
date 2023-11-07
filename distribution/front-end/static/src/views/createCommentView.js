
import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,directive, nothing } from '../lib.js';
import { setUserData, stringifyDates } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let createCommentTemplate=(data,lastCommnet,submitCreateCommentForm)=>html`<section id="create">
<div class="formLarge">
  <h4>Добавяне на коментар</h4>
  <div class="comment-request-details">
    <p class="details-cretae-comment"><span>ФЦ/Рефериращ ФЦ</span>:  ${data.finCenter}/${data.refferingFinCenter?data.refferingFinCenter:html`Няма рефериращ`}</p>
    <p class="details-cretae-comment"><span>Номер I-apply</span>:  ${data.iApplyId}</p>
    <p class="details-cretae-comment"><span>ЕГН/Булстат</span>:   ${data.clientEGFN}</p>
    <p class="details-cretae-comment"><span>Клиент</span>:   ${data.clientName}</p>
    <p class="details-cretae-comment"><span>Продукт</span>:    ${data.product}</p>
    <p class="details-cretae-comment"><span>Сума</span>:  ${data.ccy} ${data.amount}</p>
    <p class="details-cretae-comment"><span>Статус</span>:  ${data.status.statusName}</p>
    <p class="details-cretae-comment"><span>Изпратен от</span>:  ${data.statusSender}</p>
    <p class="details-cretae-comment"><span>Изпратен на дата</span>:  ${data.statusIncomingDate}</p>
    <p class="details-cretae-comment"><span>Краен срок</span>:  ${data.deadlineDate}</p>
    <p class="details-cretae-comment"><span>Последен коментар</span>:  ${lastCommnet}</p>
  </div>

    <h3>Напиши коментар</h3>
    <form @submit=${submitCreateCommentForm} class="create-comment-form">
        <textarea type="textarea" name="commentText" id="commentText" placeholder="Описание"></textarea>
        <button type="submit">Изпрати</button>
    </form>
      

  
</div>
</section>`
let outerCtx=null;
export async function showCreateCommnet(ctx){
    outerCtx=ctx
  
    try{
        let id=ctx.params.id 
        outerCtx=ctx; 
        let data=await get(`/data/catalog/${id}`);
        let dataStringifiedDates=stringifyDates([data]);
        dataStringifiedDates=dataStringifiedDates[0];
        let lastCommnet;
        if(data.comments.length){
          lastCommnet=data.comments[data.comments.length-1].body
        }

      ctx.renderView(createCommentTemplate(dataStringifiedDates,lastCommnet,submitCreateCommentForm));
    }catch(error){
        errorHandler(error);
    }

}

async function submitCreateCommentForm(ev){
    ev.preventDefault();
    let id=outerCtx.params.id;
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=await post(`/comments/${id}`,data)

        outerCtx.page.redirect(`/dashboard/${id}`)
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}
