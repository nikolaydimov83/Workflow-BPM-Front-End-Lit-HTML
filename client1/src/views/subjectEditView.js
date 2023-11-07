import { get,post, put } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;

let editSubjectTemplate=(submitEditSubjectForm,workflows,currentWorkflow,currentSubject)=>html`<section id="createWorkflow">
<div class="formMiddle">
  <h2>Edit Subject</h2>
  
  <form @submit=${submitEditSubjectForm} class="create-status-form">
      <label for='subjectName'>Subject Name</label>
      <input value=${currentSubject.subjectName} type="text" name="subjectName" id="subjectName" placeholder="Name of the workflow" />
      
      <label for='assignedToWorkflow'>Assign to workflow</label>
      <select name="assignedToWorkflow" id="assignedToWorkflow">
        ${repeat(workflows,(workflow)=>workflow._id,(workflow)=>html`
        ${workflow.chosen?html`<option selected value=${workflow._id}>${workflow.workflowName}</option>`:html`<option value=${workflow._id}>${workflow.workflowName}</option>`}`)}
      </select>
      <button type="submit">Edit Subject</button>
      
    </form>
  

</div>
</section>`


export let outerCtx=null;



export async function showEditSubject(ctx){
  
  outerCtx=ctx
  let id=ctx.params.id
    try{
      let workflows=await get('/workflow/workflows');
      let currentSubject=await get(`/workflow/subjects/${id}`)
      let currentWorkflow=currentSubject.assignedToWorkflow
  
      workflows.sort((stat1,stat2)=>{
        if(stat1.workflowName.toLowerCase()>stat2.workflowName.toLowerCase()){
          return -1
        }else{
          return 1
        }
        
      
      });
      workflows.forEach(element => {
        if (element._id==currentWorkflow){
          element.chosen=true;
        }
      });


        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(editSubjectTemplate(submitEditSubjectForm,workflows,currentWorkflow,currentSubject));
        decorateDashboardWithDataTable(0,1)
    }catch(error){
        errorHandler(error);
    }

}

async function submitEditSubjectForm(ev){
  ev.preventDefault();
  try {
      let data=loadFormData(ev.target);
      let serverResponseData=await put(`/workflow/subjects/${outerCtx.params.id}`,data);

      outerCtx.page.redirect('/subjects')
      ev.target.reset();
  } catch (error) {
      errorHandler(error);
  }


}







