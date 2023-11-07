
import { get, post, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,directive, nothing } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let adminEditUserTemplate=(serverResponse,submitEditActiveUsrForm,listOfRoles)=>html`<section id="create">
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

        <label for='branchName'>Branch Name</label>
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
          readonly=${true}
         
        />
        <label for='role'>Role</label>
        <select class="details-property-info" name="role">
            ${repeat(listOfRoles,(role)=>role._id,(role)=>html`
            <option value="${role._id}" ?selected=${role.selected} >${role.role}</option>
          `)}
        </select>
        <label for='userStatus'>User Status</label>
        <input
          
          type="text"
          name="userStatus"
          id="userStatus"
          placeholder="Active/Inactive"
          value=${serverResponse.userStatus}
         
        />
        <label for='User Id'>User Id</label>
        <input
          
          type="text"
          name="id"
          id="id"
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
      let listOfRoles=await get(`/workflow/roles`);
      let serverResponse=await get(`/admin/${id}`);
      if (listOfRoles.length>0){
        listOfRoles.forEach((role) => {
          if (role._id==serverResponse.role){
            role.selected=true
          }else{
            role.selected=false
          }
        });
      }
      outerCtx.pageState=serverResponse
      ctx.renderView(adminEditUserTemplate(serverResponse,submitEditActiveUsrForm,listOfRoles));
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

