import { get,post, put } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;

let editStatusTemplate=(submitEditStatusForm,statuses,roles,currentStatus)=>html`<section id="createRole">
<div class="formMiddle">
  <h2>Edit Status</h2>
  
  <form @submit=${submitEditStatusForm} class="create-status-form">
    
    <input type="text" value=${currentStatus.statusName} name="statusName" id="statusName" placeholder="Name of the status" />
      
      <select name="statusType" id="statusType">
        ${repeat(roles,(role)=>role._id,(role)=>html`
        ${role.chosen?html`<option selected value=${role._id}>${role.role}</option>`:html`<option value=${role._id}>${role.roleName}</option>`}`)}
      </select>
  
      <select class='multi' multiple name='nextStatuses' id='nextStatuses'>
      
      ${repeat(statuses,(stat)=>stat._id,(stat)=>html`
        ${stat.chosen?html`<option selected value=${stat._id}>${stat.statusType.role}: ${stat.statusName}</option>`:html`<option value=${stat._id}>${stat.statusType.role}: ${stat.statusName}</option>`}`)}
  
      </select>
      <button type="submit">Edit Status</button>
      
    </form>
  

</div>
</section>`


export let outerCtx=null;



export async function showEditStatus(ctx){
  
  outerCtx=ctx
  let id=ctx.params.id
    try{
      let statusesAll=await get('/workflow/statuses');
      let currentStatus=await get(`/workflow/statuses/${id}`);
      statusesAll.sort((stat1,stat2)=>{
        if(stat1.statusType.role.toLowerCase()>stat2.statusType.role.toLowerCase()){
          return -1
        }else{
          return 1
        }
        
      
      });
      statusesAll.forEach(element => {
        currentStatus.nextStatuses.forEach((nextStatus)=>{
          if (nextStatus._id==element._id){
            element.chosen=true;
          }
        })
      });
      let roles=await get('/workflow/roles');
      roles.forEach((role)=>{
        if(role._id==currentStatus.statusType._id){
          role.chosen=true
        }
      })
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(editStatusTemplate(submitEditStatusForm,statusesAll,roles,currentStatus));
        decorateDashboardWithDataTable(0,1)
    }catch(error){
        errorHandler(error);
    }

}

async function submitEditStatusForm(ev){
  ev.preventDefault();
  try {
      let data=loadFormData(ev.target);
      let serverResponseData=await put(`/workflow/statuses/${outerCtx.params.id}`,data);

      outerCtx.page.redirect('/statuses')
      ev.target.reset();
  } catch (error) {
      errorHandler(error);
  }


}







