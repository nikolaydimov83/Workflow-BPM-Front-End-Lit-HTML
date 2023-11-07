import { get,post } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;
export let subjectsTemplate=(dataStringifiedDates,showCreateSubject)=>html`

<div class="search-wrapper-div">

<button @click=${showCreateSubject} class="pre-set-report">Създай Subject</button>

</div>
<h2>Списък от създадени Subjects</h2>
<div class="tableLarge">
<table id="dashboard" class="no-footer dataTable" role="grid" aria-describedby="dashboard_info">
<thead >
  <tr >
    <th ><a id="subjectName"href="javascript:void(0)">Subject Name</a></th>
    <th ><a id="assignedToWorkflow"href="javascript:void(0)">Workflow</a></th>
    <th ><a id="subjectCreateDate"href="javascript:void(0)">Subject Create Date</a></th>
    <th ><a id="action">Action</a></th>
  </tr>
 </thead>
 <tbody>
 ${repeat(dataStringifiedDates,(request)=>request._id,(request)=>html`<tr>
     <td>${request.subjectName}</td>
     <td>${request.assignedToWorkflow.workflowName}</td>
     <td>${request.subjectCreateDate}</td>
     <td><a href=${`/editSubjects/${request._id}`}>Покажи</a></td>
</tr>`)}
</tbody>
</table>
</div>`

let createSubjectTemplate=(submitCreateSubjectForm,workflows)=>html`<section id="createWorkflow">
<div class="formMiddle">
  <h2>Create Workflow</h2>
  
  <form @submit=${submitCreateSubjectForm} class="create-status-form">
  <label for='subjectName'>Subject Name</label>
    <input type="text" name="subjectName" id="subjectName" placeholder="Name of the subject" />
      
    <label for='assignedToWorkflow'>Assign to workflow</label>
      <select  name="assignedToWorkflow" id="assignedToWorkflow">
        ${repeat(workflows,(workflow)=>workflow._id,(workflow)=>html`
        <option value=${workflow._id}>${workflow.workflowName}</option>`)}
      </select>
      
      <button type="submit">Create Subject</button>
      
    </form>
  

</div>
</section>`


export let outerCtx=null;

export async function showSubjects(ctx){
  if(!outerCtx){
    outerCtx=ctx
  }
  setDashBoardContext({path:'/workflow/subjects'})
  
    try{
        let data=await get(getDashBoardContext().path);
        let dataStringifiedDates=stringifyDates(data);
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(subjectsTemplate(dataStringifiedDates,showCreateSubject));
        decorateDashboardWithDataTable(0,1);
    }catch(error){
        errorHandler(error);
    }

}

export async function showCreateSubject(ctx){


    try{
      let workflows=await get('/workflow/workflows');
      workflows.sort((stat1,stat2)=>{
        if(stat1.workflowName.toLowerCase()>stat2.workflowName.toLowerCase()){
          return -1
        }else{
          return 1
        }
        
      
      });
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(createSubjectTemplate(submitCreateSubjectForm,workflows));
        decorateDashboardWithDataTable(0,1)
    }catch(error){
        errorHandler(error);
    }

}

async function submitCreateSubjectForm(ev){
  ev.preventDefault();
  try {
      let data=loadFormData(ev.target);
      let serverResponseData=await post(`/workflow/subjects`,data)

      outerCtx.page.redirect('/subjects')
      ev.target.reset();
  } catch (error) {
      errorHandler(error);
  }


}







