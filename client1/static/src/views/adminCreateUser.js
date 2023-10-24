
import { get, post, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,directive, nothing } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let adminCreateUserTemplate=(submitCreateActiveUsrForm)=>html`<section id="create">
<div class="formLarge">
  <h2>Създай потребител</h2>
  <form @submit=${submitCreateActiveUsrForm} class="create-form">
    <div class="inlineDiv">
        <label for='branchNumber'>Branch Number</label>
        <input
          type="text"
          name="branchNumber"
          id="branchNumber"
          placeholder="Въведе номер на роля/клон"
         
         
        />

        <label for='branchName'>Branch Name or Role</label>
        <input
          type="text"
          name="branchName"
          id="branchName"
          placeholder="Въведе име на клон или роля в ЦУ"
          
         
        />

        <label for='email'>Email</label>
        <input

          type="text"
          name="email"
          id="email"
          placeholder="Мейл на потребителя"
          
         
        />

        <input
          
          type="text"
          name="userStatus"
          id="userStatus"
          placeholder="Статус -Active/Inactive"
         
        />

<button type="submit" id="editUsrBtn">Изпрати</button>

            </div>
            
      </div>

  </form>
</div>
</section>`
let outerCtx=null;
export async function showAdminCreateUsr(ctx){
    outerCtx=ctx
    let id=ctx.params.id
    try{
      
      ctx.renderView(adminCreateUserTemplate(submitCreateActiveUsrForm));
    }catch(error){
        errorHandler(error);
    }

}

async function submitCreateActiveUsrForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=await post(`/admin`,data)

        outerCtx.page.redirect('/admin')
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}

