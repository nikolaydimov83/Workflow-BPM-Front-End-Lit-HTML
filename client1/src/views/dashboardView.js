import { get,post } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { errorHandler } from './errorHandler.js';


export let catalogTemplate=(dataStringifiedDates,sortTableBy,submitsearchEGFNForm,submitsearchForm)=>html`
<div class="search-wrapper-div">
 <form @submit=${submitsearchEGFNForm} class="search-wrapper cf">
  <input
    id="#search-input"
    type="text"
    name="searchData"
    placeholder="Търсене по ЕГФН"
    required
  />
  <button type="submit">Search</button>
</form> 
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
</div>
<div class="tableLarge">
<table>
<thead>
  <tr @click=${sortTableBy}>
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
  outerCtx=ctx
  setDashBoardContext({path:'/data/catalog'})
  let dashboardContext=getDashBoardContext()
    try{
        let data=await get(getDashBoardContext().path);
        let dataStringifiedDates=stringifyDates(data);
        ctx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchEGFNForm,submitsearchForm));
    }catch(error){
        errorHandler(error);
    }

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
          outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchEGFNForm,submitsearchForm));
        }
  } catch (error) {
    errorHandler(error);
  

  }

}

export async function submitsearchEGFNForm(ev){
  ev.preventDefault();
  try {
      let data=loadFormData(ev.target);
      setDashBoardContext({path:'/search/EGFN',searchData:data.searchData})
      let dashboardContext=getDashBoardContext()
      let serverResponseData=await post(getDashBoardContext().path,data)
      let dataStringifiedDates=stringifyDates(serverResponseData.sortedData);
      outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchEGFNForm,submitsearchForm));
  } catch (error) {
      errorHandler(error);
  }
}

export async function submitsearchForm(ev){
ev.preventDefault();
setDashBoardContext('/search/all');
try {
    let data=loadFormData(ev.target);
    let serverResponseData=await post(getDashBoardContext(),data)
    let dataStringifiedDates=stringifyDates(serverResponseData);
    outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchEGFNForm,submitsearchForm));
    
  
} catch (error) {
    errorHandler(error);
}
}