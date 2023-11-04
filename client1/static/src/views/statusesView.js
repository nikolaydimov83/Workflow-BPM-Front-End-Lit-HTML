import { get,post } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;
export let statusesTemplate=(dataStringifiedDates,showCreateStatus,showEditStatus)=>html`

<div class="search-wrapper-div">

<button @click=${showCreateStatus} class="pre-set-report">Създай Статус</button>

</div>
<h2>Списък от създадени статуси</h2>
<div class="tableLarge">
<table id="dashboard" class="no-footer dataTable" role="grid" aria-describedby="dashboard_info">
<thead >
  <tr >
    <th ><a id="statusName"href="javascript:void(0)">Status Name</a></th>
    <th ><a id="statusType"href="javascript:void(0)">Status Type</a></th>
    <th ><a id="nextStatuses"href="javascript:void(0)">Next Statuses</a></th>
    <th ><a id="statusCreateDate"href="javascript:void(0)">Status Create Date</a></th>
    <th ><a id="roleCreateDate">Action</a></th>
  </tr>
 </thead>
 <tbody>
 ${repeat(dataStringifiedDates,(request)=>request._id,(request)=>html`<tr>
     <td>${request.statusName}</td>
     <td>${request.statusType.role}</td>
     <td><ol>${repeat(request.nextStatuses,(status)=>status._id,(status)=>html`<li>${status.statusName}</li>`)}</ol></td>
     <td>${request.statusCreateDate}</td>
     <td><a href=${`/editStatuses/${request._id}`}>Покажи</a></td>
</tr>`)}
</tbody>
</table>
</div>`

let createStatusTemplate=(submitCreateStatusForm,statuses,roles)=>html`<section id="createRole">
<div class="formMiddle">
  <h2>Create Status</h2>
  
  <form @submit=${submitCreateStatusForm} class="create-status-form">
    
    <input type="text" name="statusName" id="statusName" placeholder="Name of the status" />
      
      <select name="statusType" id="statusType">
        ${repeat(roles,(role)=>role._id,(role)=>html`
        <option value=${role._id}>${role.roleName}</option>`)}
      </select>
  
      <select class='multi' multiple name='nextStatuses' id='nextStatuses'>
      
      ${repeat(statuses,(stat)=>stat._id,(stat)=>html`
        <option value=${stat._id}>${stat.statusType.role}: ${stat.statusName}</option>`)}
  
      </select>
      <button type="submit">Create Status</button>
      
    </form>
  

</div>
</section>`


export let outerCtx=null;

export async function showStatuses(ctx){
  if(!outerCtx){
    outerCtx=ctx
  }
  setDashBoardContext({path:'/workflow/statuses'})
  
    try{
        let data=await get(getDashBoardContext().path);
        let dataStringifiedDates=stringifyDates(data);
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(statusesTemplate(dataStringifiedDates,showCreateStatus));
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
        outerCtx.renderView(createStatusTemplate(submitCreateStatusForm,statuses,roles));
        decorateDashboardWithDataTable(0,1)
    }catch(error){
        errorHandler(error);
    }

}

async function submitCreateStatusForm(ev){
  ev.preventDefault();
  try {
      let data=loadFormData(ev.target);
      let serverResponseData=await post(`/workflow/statuses`,data)

      outerCtx.page.redirect('/statuses')
      ev.target.reset();
  } catch (error) {
      errorHandler(error);
  }


}







