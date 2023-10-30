import { get,post, put } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;


let editRoleTemplate=(submitEditRoleForm,data)=>html`<section id="createRole">
<div class="form">
  <h2>Edit Role</h2>
  <form @submit=${submitEditRoleForm} class="login-form">
    <input 
      type="text" 
      name="roleType" 
      id="roleType" 
      placeholder="Branch or HO"
      value=${data.roleType} />
    <input
      type="text"
      name="roleName"
      id="roleName"
      placeholder="Role name"
      value=${data.roleName}
    />
    <button type="submit">Edit Role</button>
  </form>
</div>
</section>`


export let outerCtx=null;



export async function showEditRole(ctx){
outerCtx=ctx;
let id=ctx.params.id;
    try{
        let data=await get(`/workflow/roles/${id}`)
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(editRoleTemplate(submitEditRoleForm,data));
        decorateDashboardWithDataTable(0,1)
    }catch(error){
        errorHandler(error);
    }

}

async function submitEditRoleForm(ev){
  ev.preventDefault();
 
  try {
      let data=loadFormData(ev.target);
      let serverResponseData=await put(`/workflow/roles/${outerCtx.params.id}`,data)

      outerCtx.page.redirect('/roles')
      ev.target.reset();
  } catch (error) {
      errorHandler(error);
  }


}







