import { get,post } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;
export let workflowsTemplate=(dataStringifiedDates,showCreateWorkflow)=>html`

<div class="search-wrapper-div">

<button @click=${showCreateWorkflow} class="pre-set-report">Създай Workflow</button>

</div>
<h2>Списък от създадени Workflows</h2>
<div class="tableLarge">
<table id="dashboard" class="no-footer dataTable" role="grid" aria-describedby="dashboard_info">
<thead >
  <tr >
    <th ><a id="workflowName"href="javascript:void(0)">Workflow Name</a></th>
    <th ><a id="allowedStatuses"href="javascript:void(0)">Initial Status</a></th>
    <th ><a id="rolesAllowedToFinishRequest"href="javascript:void(0)">Special Roles</a></th>
    <th ><a id="workflowCreateDate"href="javascript:void(0)">Workflow Create Date</a></th>
    <th ><a id="action">Action</a></th>
  </tr>
 </thead>
 <tbody>
 ${repeat(dataStringifiedDates,(request)=>request._id,(request)=>html`<tr>
     <td>${request.workflowName}</td>
     <td><ol>${repeat(request.allowedStatuses,(stat)=>stat._id,(stat)=>html`<li>${stat.statusType.role}: ${stat.statusName}</li>`)}</ol></td>
     <td><ol>${repeat(request.rolesAllowedToFinishRequest,(role)=>role._id,(role)=>html`<li>${role.role}</li>`)}</ol></td>
     <td>${request.workflowCreateDate}</td>
     <td><a href=${`/editWorkflows/${request._id}`}>Покажи</a></td>
</tr>`)}
</tbody>
</table>
</div>`

let createWorkflowTemplate=(submitCreateWorkflowForm,statuses,roles)=>html`<section id="createWorkflow">
<div class="formMiddle">
  <h2>Create Workflow</h2>
  
  <form @submit=${submitCreateWorkflowForm} class="create-status-form">
  <label for='workflowName'>Workflow Name</label>
    <input type="text" name="workflowName" id="workflowName" placeholder="Name of the workflow" />
      
    <label for='rolesAllowedToFinishRequest'>Super Users</label>
      <select class='multi' multiple name="rolesAllowedToFinishRequest" id="rolesAllowedToFinishRequest">
        ${repeat(roles,(role)=>role._id,(role)=>html`
        <option value=${role._id}>${role.roleName}</option>`)}
      </select>
      
      <label for='initialStatus'>Initial Status</label>
      <select name='initialStatus' id='initialStatus'>
      
      ${repeat(statuses,(stat)=>stat._id,(stat)=>html`
        <option value=${stat._id}>${stat.statusType.role}: ${stat.statusName}</option>`)}
  
      </select>
      <button type="submit">Create Workflow</button>
      
    </form>
  

</div>
</section>`


export let outerCtx=null;

export async function showWorkflows(ctx){
  if(!outerCtx){
    outerCtx=ctx
  }
  setDashBoardContext({path:'/workflow/workflows'})
  
    try{
        let data=await get(getDashBoardContext().path);
        let dataStringifiedDates=stringifyDates(data);
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(workflowsTemplate(dataStringifiedDates,showCreateStatus));
        decorateDashboardWithDataTable(0,1);
    }catch(error){
        errorHandler(error);
    }

}

export async function showCreateStatus(ctx){


    try{
      let statuses=await get('/workflow/statuses');
      statuses.sort((stat1,stat2)=>{
        if(stat1.statusType.role.toLowerCase()>stat2.statusType.role.toLowerCase()){
          return -1
        }else{
          return 1
        }
        
      
      });
      let roles=await get('/workflow/roles');
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(createWorkflowTemplate(submitCreateWorkflowForm,statuses,roles));
        decorateDashboardWithDataTable(0,1)
    }catch(error){
        errorHandler(error);
    }

}

async function submitCreateWorkflowForm(ev){
  ev.preventDefault();
  try {
      let data=loadFormData(ev.target);
      let serverResponseData=await post(`/workflow/workflows`,data)

      outerCtx.page.redirect('/workflows')
      ev.target.reset();
  } catch (error) {
      errorHandler(error);
  }


}







