
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
        <input
          type="text"
          name="iApplyId"
          id="iApplyId"
          placeholder="Апликация в I-apply"
          @change=${retrieveIapplyData}
        />

        <select
          name="subjectName"
          
          id="subjectName">
          ${repeat(serverResponse.subjects,(subject)=>subject._id,(subject)=>html`
            <option value="${subject.subjectName}" >${subject.subjectName}</option>
            <option value="dummy">Dummy</option>
          `)}
          
        </select>
        <input
          type="date"
          name="deadlineDate"
          id="deadlineDate"
          placeholder="Краен срок"
        />

        <input
          type="text"
          name="clientEGFN"
          id="clientEGFN"
          placeholder="ЕГН/Булстат на клиента"
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.clientEGFN:''}
          disabled
        />
        <textarea
          type="textarea"
          name="description"
          id="description"
          placeholder="Описание"
        ></textarea>
    </div>
    <div class="inlineDiv">
        <input
          type="text"
          name="finCenter"
          id="finCenter"
          placeholder="Клон"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.finCenter:''}
        />
        <input
          type="text"
          name="clientName"
          id="clientName"
          placeholder="Име на клиента"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.clientName:''}
        />

        <input
          type="text"
          name="product"
          id="product"
          placeholder="Продукт"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.product:''}
        />

        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Сума"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.amount:''}
        />

        <input
          type="text"
          name="ccy"
          id="ccy"
          placeholder="Валута"
          disabled
          .value=${serverResponse.iApplyData!=undefined?serverResponse.iApplyData.ccy:''}
        />
      </div>

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
        let serverResponseData=post('/data/shoes',data)

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