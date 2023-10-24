
import { get, post, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,directive, nothing } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let adminEditUserTemplate=(serverResponse,submitEditActiveUsrForm)=>html`<section id="create">
<div class="formLarge">
  <h2>Промени потребител</h2>
  <form @submit=${submitEditActiveUsrForm} class="create-form">
    <div class="inlineDiv">
        <label for='branchNumber'>Branch Number</label>
        <input
          type="text"
          name="branchNumber"
          id="branchNumber"
          placeholder="Въведе номер на роля/клон"
          value=${serverResponse.branchNumber}
         
        />

        <label for='branchName'>Branch Name or Role</label>
        <input
          type="text"
          name="branchName"
          id="branchName"
          placeholder="Въведе име на клон или роля в ЦУ"
          value=${serverResponse.branchName}
         
        />

        <label for='email'>Email</label>
        <input

          type="text"
          name="email"
          id="email"
          placeholder="Мейл на потребителя"
          value=${serverResponse.email}
         
        />

        <input
          
          type="text"
          name="userStatus"
          id="userStatus"
          placeholder="Мейл на потребителя"
          value=${serverResponse.userStatus}
         
        />

        <input
          
          type="text"
          name="id"
          id="id"
          placeholder="Мейл на потребителя"
          value=${serverResponse._id}
          disabled
         
        />

<button type="submit" id="editUsrBtn">Изпрати</button>

            </div>
            
      </div>

  </form>
</div>
</section>`
let outerCtx=null;
export async function showAdminEdtUsr(ctx){
    outerCtx=ctx
    let id=ctx.params.id
    try{
      let serverResponse=await get(`/admin/${id}`);
      outerCtx.pageState=serverResponse
      ctx.renderView(adminEditUserTemplate(serverResponse,submitEditActiveUsrForm));
    }catch(error){
        errorHandler(error);
    }

}

async function submitEditActiveUsrForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=await put(`/admin/${outerCtx.params.id}`,data)

        outerCtx.page.redirect('/admin')
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}

