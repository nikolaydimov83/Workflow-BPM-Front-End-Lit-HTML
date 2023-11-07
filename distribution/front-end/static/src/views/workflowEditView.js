import { get,post, put } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;

let editWorkflowTemplate=(submitEditWorkflowForm,statusesAll,roles,currentWorkflow)=>html`<section id="createWorkflow">
<div class="formMiddle">
  <h2>Edit Workflow</h2>
  
  <form @submit=${submitEditWorkflowForm} class="create-status-form">
      <label for='workflowName'>Workflow Name</label>
      <input value=${currentWorkflow.workflowName} type="text" name="workflowName" id="workflowName" placeholder="Name of the workflow" />
      
      <label for='rolesAllowedToFinishRequest'>Super Users</label>
      <select class='multi' multiple name="rolesAllowedToFinishRequest" id="rolesAllowedToFinishRequest">
        ${repeat(roles,(role)=>role._id,(role)=>html`
        ${role.chosen?html`<option selected value=${role._id}>${role.roleName}</option>`:html`<option value=${role._id}>${role.roleName}</option>`}`)}
      </select>

      <label for='initialStatus'>Initial Status</label>
      <select name='initialStatus' id='initialStatus'>
      
      ${repeat(statusesAll,(stat)=>stat._id,(stat)=>html`
        ${stat.chosen?html`<option selected value=${stat._id}>${stat.statusType.role}: ${stat.statusName}</option>`:html`<option value=${stat._id}>${stat.statusType.role}: ${stat.statusName}</option>`}`)}
  
      </select>
      <button type="submit">Edit Workflow</button>
      
    </form>
  

</div>
</section>`


export let outerCtx=null;



export async function showEditWorkflow(ctx){
  
  outerCtx=ctx
  let id=ctx.params.id
    try{
      let statusesAll=await get('/workflow/statuses');
      let currentWorkflow=await get(`/workflow/workflows/${id}`);
  
      statusesAll.sort((stat1,stat2)=>{
        if(stat1.statusType.role.toLowerCase()>stat2.statusType.role.toLowerCase()){
          return -1
        }else{
          return 1
        }
        
      
      });
      statusesAll.forEach(element => {
        if (element._id==currentWorkflow.initialStatus){
          element.chosen=true;
        }
      });

      let roles=await get('/workflow/roles');
      roles.forEach((role)=>{
        currentWorkflow.rolesAllowedToFinishRequest.forEach((workflowRole)=>{
          if(role._id==workflowRole._id){
          role.chosen=true
        }
        })

      })
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(editWorkflowTemplate(submitEditWorkflowForm,statusesAll,roles,currentWorkflow));
        decorateDashboardWithDataTable(0,1)
    }catch(error){
        errorHandler(error);
    }

}

async function submitEditWorkflowForm(ev){
  ev.preventDefault();
  try {
      let data=loadFormData(ev.target);
      let serverResponseData=await put(`/workflow/workflows/${outerCtx.params.id}`,data);

      outerCtx.page.redirect('/workflows')
      ev.target.reset();
  } catch (error) {
      errorHandler(error);
  }


}







