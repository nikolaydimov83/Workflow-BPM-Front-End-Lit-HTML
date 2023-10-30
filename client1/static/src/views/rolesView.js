import { get,post } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;
export let rolesTemplate=(dataStringifiedDates,showCreateRole,showEditRole)=>html`

<div class="search-wrapper-div">

<button @click=${showCreateRole} class="pre-set-report">Създай роля</button>

</div>
<h2>Списък от създадени роли</h2>
<div class="tableLarge">
<table id="dashboard" class="no-footer dataTable" role="grid" aria-describedby="dashboard_info">
<thead >
  <tr >
    <th ><a id="branchNumber"href="javascript:void(0)">Role Name</a></th>
    <th ><a id="role"href="javascript:void(0)">Role Type</a></th>
    <th ><a id="roleCreateDate"href="javascript:void(0)">Final Role</a></th>
    <th ><a id="roleCreateDate"href="javascript:void(0)">Role Create Date</a></th>
    <th ><a id="roleCreateDate">Action</a></th>
  </tr>
 </thead>
 <tbody>
 ${repeat(dataStringifiedDates,(request)=>request._id,(request)=>html`<tr>
     <td>${request.roleName}</td>
     <td>${request.roleType}</td>
     <td>${request.role}</td>
     <td>${request.roleCreateDate}</td>
     <td><a href=${`/editRoles/${request._id}`}>Покажи</a></td>
</tr>`)}
</tbody>
</table>
</div>`

let createRoleTemplate=(submitCreateRoleForm)=>html`<section id="createRole">
<div class="form">
  <h2>Create Role</h2>
  <form @submit=${submitCreateRoleForm} class="login-form">
    <input type="text" name="roleType" id="roleType" placeholder="Branch or HO" />
    <input
      type="text"
      name="roleName"
      id="roleName"
      placeholder="Role name"
    />
    <button type="submit">Create Role</button>
  </form>
</div>
</section>`


export let outerCtx=null;

export async function showRoles(ctx){
  if(!outerCtx){
    outerCtx=ctx
  }
  setDashBoardContext({path:'/workflow/roles'})
  
    try{
        let data=await get(getDashBoardContext().path);
        let dataStringifiedDates=stringifyDates(data);
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(rolesTemplate(dataStringifiedDates,showCreateRole));
        decorateDashboardWithDataTable(0,1);
    }catch(error){
        errorHandler(error);
    }

}

export async function showCreateRole(ctx){


    try{

        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(createRoleTemplate(submitCreateRoleForm));
        decorateDashboardWithDataTable(0,1)
    }catch(error){
        errorHandler(error);
    }

}

async function submitCreateRoleForm(ev){
  ev.preventDefault();
  try {
      let data=loadFormData(ev.target);
      let serverResponseData=await post(`/workflow/roles`,data)

      outerCtx.page.redirect('/roles')
      ev.target.reset();
  } catch (error) {
      errorHandler(error);
  }


}







