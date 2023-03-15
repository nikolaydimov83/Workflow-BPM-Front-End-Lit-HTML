import { get,post } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { errorHandler } from './errorHandler.js';

export let clearDashboardTemplate=()=>html``;
export let catalogTemplate=(dataStringifiedDates,sortTableBy,submitsearchForm,searchContextString,showCatalog,showDelayedReport,showAllActive,showAll)=>html`

<div class="search-wrapper-div">
<form @submit=${submitsearchForm} class="search-wrapper cf">
  <input
    id="#search-input"
    type="text"
    name="searchString"
    placeholder="Търсене..."
    required
  />
  <button type="submit">Search</button>
</form> 
<button @click=${showCatalog} class="pre-set-report">Dashboard</button>
<button @click=${showDelayedReport} class="pre-set-report">Delayed</button>
<button @click=${showAllActive} class="pre-set-report">Active</button>
<button @click=${showAll} class="pre-set-report">All</button>
</div>
<h2>${searchContextString}</h2>
<div class="tableLarge">
<table id="dashboard" class="no-footer dataTable" role="grid" aria-describedby="dashboard_info">
<thead >
  <tr @click=${sortTableBy}>
  <th ><a id="iApplyId"href="#">Creator</a></th>
    <th ><a id="iApplyId"href="#">IApplyId</a></th>
    <th ><a id="clientName"href="#">Име на клиента</a></th>
    <th ><a id="clientEGFN"href="#">EGFN</a></th>
    <th ><a id="finCenter"href="#">ФЦ</a></th>
    <th ><a id="refferingFinCenter"href="#">Рефериращ</a></th>
    <th ><a id="subjectId"href="#">Subject</a></th>
    <th ><a id="status"href="#">Статус</a></th>
    <th ><a id="statusIncomingDate"href="#">Дата на постъпване</a></th>
    <th ><a id="deadlineDate"href="#">Deadline</a></th>
    <th ><a id="details"href="#">Детайли</a></th>
  </tr>
 </thead>
 <tbody>
 ${repeat(dataStringifiedDates,(request)=>request._id,(request)=>html`<tr>
     <td>${request.requestCreatorEmail}</td>
     <td>${request.iApplyId}</td>
     <td>${request.clientName}</td>
     <td>${request.clientEGFN}</td>
     <td>${request.finCenter}</td>
     <td>${request.refferingFinCenter}</td>
     <td>${request.subjectId.subjectName}</td>
     <td>${request.status.statusName}</td>
     <td>${request.statusIncomingDate}</td>
     <td>${request.deadlineDate}</td>
     <td><a href="/dashboard/${request._id}">Покажи</a></td>
</tr>`)}
</tbody>
</table>
</div>`

export let outerCtx=null;
export async function showCatalog(ctx){
  if(!outerCtx){
    outerCtx=ctx
  }
  setDashBoardContext({path:'/data/catalog'})
  
    try{
        let data=await get(getDashBoardContext().path);
        let dataStringifiedDates=stringifyDates(data.result);
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchForm,data.searchContextString,showCatalog,showDelayedReport,showAllActive,showAll));
        decorateDashboardWithDataTable();
    }catch(error){
        errorHandler(error);
    }

}

export async function showDelayedReport(ctx){

  setDashBoardContext({path:'/reportsController'})
  let dashboardContext=getDashBoardContext()
    try{
        let data=await get(dashboardContext.path);
        let dataStringifiedDates=stringifyDates(data.result);
        outerCtx.renderView(clearDashboardTemplate());
        outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchForm,data.searchContextString,showCatalog,showDelayedReport,showAllActive,showAll));
        
    decorateDashboardWithDataTable()
    }catch(error){
        errorHandler(error);
    }

}

export async function showAllActive(ev){
  ev.preventDefault();
  setDashBoardContext({path:'/reportsController/active'})
  try {
      
      let serverResponseData=await get(getDashBoardContext().path)
      let dataStringifiedDates=stringifyDates(serverResponseData.result);
          outerCtx.renderView(clearDashboardTemplate());
          outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchForm,serverResponseData.searchContextString,showCatalog,showDelayedReport,showAllActive,showAll));
          decorateDashboardWithDataTable();
      
    
  } catch (error) {
      errorHandler(error);
  }
  }

  export async function showAll(ev){
    ev.preventDefault();
    setDashBoardContext({path:'/reportsController/all'})
    try {
        
        let serverResponseData=await get(getDashBoardContext().path)
        let dataStringifiedDates=stringifyDates(serverResponseData.result);
            outerCtx.renderView(clearDashboardTemplate());
            outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchForm,serverResponseData.searchContextString,showCatalog,showDelayedReport,showAllActive,showAll));
            decorateDashboardWithDataTable();
        
      
    } catch (error) {
        errorHandler(error);
    }
    }

export async function submitsearchForm(ev){
  ev.preventDefault();
  let data=loadFormData(ev.target);
  setDashBoardContext({path:'/search/all',searchData:data.searchData})
  try {
      
      let serverResponseData=await post(getDashBoardContext().path,data)
      let dataStringifiedDates=stringifyDates(serverResponseData.result);
          outerCtx.renderView(clearDashboardTemplate());
          outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchForm,serverResponseData.searchContextString,showCatalog,showDelayedReport,showAllActive,showAll));
          decorateDashboardWithDataTable();
      
    
  } catch (error) {
      errorHandler(error);
  }
  }

export function decorateDashboardWithDataTable() {
  $(document).ready(function () {
    $.fn.dataTable.moment('DD-MM-YYYY');
    $('#dashboard').DataTable({ 
        dom: 'lBfrtip',
        "order": [[9, 'asc'], [8, 'asc']],
        "lengthMenu": [[5,25, 50, 100, -1], [5,25, 50, 100, "All"]],
        "oLanguage": {
          "sSearch": "Filter:"
          },
        buttons: [
          {
            extend: 'excel',
            title:function(){
              return document.querySelector('h2').textContent
            },
            text: 'Excel',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }
        ]
      });

  });
}

export async function sortTableBy(ev){
  ev.preventDefault();
  let sortCriteria=ev.target.id;
  try {
        if(sortCriteria!='details'){
          let sortIndex=getTableCriteriaSortIndex(sortCriteria);
          let data=await post(getDashBoardContext().path,{sortCriteria:sortCriteria,sortIndex,searchData:getDashBoardContext().searchData});
          setTableCriteriaSortIndex(sortCriteria,data.newSortIndex);
          let dataStringifiedDates=stringifyDates(data.sortedData);
          outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchForm));
        }
  } catch (error) {
    errorHandler(error);
  

  }

}


