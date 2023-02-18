
import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,directive, nothing } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let createTemplate=(serverResponse,retrieveIapplyData)=>html`<section id="create">
<div class="formLarge">
  <h2>Създай заявка</h2>
  <form @submit=${submitCreateForm} class="create-form">
    <div class="inlineDiv">
        <label for='iApplyId'>Iapply ID</label>
        <input
          type="text"
          name="iApplyId"
          id="iApplyId"
          placeholder="Апликация в I-apply"
          @change=${retrieveIapplyData}
        />
        <label for='subjectName'>Subject</label>
        <select
          name="subjectName"
          id="subjectName">
          ${repeat(serverResponse.subjects,(subject)=>subject._id,(subject)=>html`
            <option value="${subject._id}" >${subject.subjectName}</option>
            <option value="dummy">Dummy</option>
          `)}
          
        </select>
        <label for='deadlineDate'>Краен срок</label>
        <input
          type="date"
          name="deadlineDate"
          id="deadlineDate"
          placeholder="Краен срок"
        />
        <label for='clientEGFN'>ЕГН/Булстат</label>
        <input
          type="text"
          name="clientEGFN"
          id="clientEGFN"
          placeholder="ЕГН/Булстат на клиента"
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.clientEGFN:''}
          disabled
        />
    </div>
    <div class="inlineDiv">
    <label for='finCenter'>Клон/Рефериращ клон</label>
      <div>
      <input
        class="small"
          type="text"
          name="finCenter"
          id="finCenter"
          placeholder="Клон"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.finCenter:''}
        />
        <input
        class="verySmall"
          type="text"
          name="refferingFinCenter"
          id="refferingFinCenter"
          placeholder="Не"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.refferingFinCenter:''}
        />

      </div>  

        <label for='clientName'>Клиент</label>
        <input
          type="text"
          name="clientName"
          id="clientName"
          placeholder="Име на клиента"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.clientName:''}
        />
        <label for='product'>Продукт</label>
        <input
          type="text"
          name="product"
          id="product"
          placeholder="Продукт"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.product:''}
        />
        <label for='amount'>Сума</label>
            <div>
            <input
            class="verySmall"
              type="text"
              name="ccy"
              id="ccy"
              placeholder="CCY"
              disabled
              .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.ccy:''}
            />
            <input class="small"
              type="number"
              name="amount"
              id="amount"
              placeholder="Сума"
              disabled
              .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.amount:''}
  
            />

            </div>
      </div>
      <textarea
          type="textarea"
          name="description"
          id="description"
          placeholder="Описание"
        ></textarea>
    <button type="submit">Изпрати</button>
  </form>
</div>
</section>`
let outerCtx=null;
export async function showCreate(ctx){
    outerCtx=ctx
  
    try{
      let serverResponse=await get('/data/create');
      outerCtx.pageState=serverResponse
      ctx.renderView(createTemplate(serverResponse,retrieveIapplyData));
    }catch(error){
        errorHandler(error);
    }

}

async function submitCreateForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=await post('/data/create',data)

        outerCtx.page.redirect('/')
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}
async function retrieveIapplyData(ev){
  ev.preventDefault();
  const id=ev.target.value
  //let selectedSubject=ev.target.parent.
  try {
        let serverResponseData=await get(`/iApply/${id}`);
        Object.assign(outerCtx.pageState,serverResponseData);
  } catch (error) {
    errorHandler(error);
    delete outerCtx.pageState.iApplyData;

  }

  //outerCtx.pageState.iApplyId=serverResponseData;
  //outerCtx.pageState.subjectSelectedValue=document.getElementById('subjectName').value;

  outerCtx.renderView(createTemplate(outerCtx.pageState,retrieveIapplyData));
}

//const helloDirective = directive(() => (part) => { part.setValue('Hello') });

//const helloTemplate = html`<div>${helloDirective()}</div>`