import { get,post } from '../api/api.js';
import { getTableCriteriaSortIndex, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { errorHandler } from './errorHandler.js';


let catalogTemplate=(data)=>html`
<div class="tableLarge">
<table>
<thead>
  <tr @click=${sortTableBy}>
    <th ><a id="iApplyId"href="#">IApplyId</a></th>
    <th ><a id="clientName"href="#">Име на клиента</a></th>
    <th ><a id="clientEGFN"href="#">EGFN</a></th>
    <th ><a id="finCenter"href="#">ФЦ</a><button class="filter">F</button></th>
    <th ><a id="refferingFinCenter"href="#">Рефериращ</a><button class="filter">F</button></th>
    <th ><a id="subjectId"href="#">Subject</a><button class="filter">F</button></th>
    <th ><a id="status"href="#">Статус</a><button class="filter">F</button></th>
    <th ><a id="statusIncomingDate"href="#">Дата на постъпване</a><button class="filter">F</button></th>
    <th ><a id="deadlineDate"href="#">Deadline</a><button class="filter">F</button></th>
    <th ><a id="details"href="#">Детайли</a></th>
  </tr>
 </thead>
 <tbody>
 ${repeat(data,(request)=>request._id,(request)=>html`<tr>
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

let outerCtx=null;
export async function showCatalog(ctx){
  outerCtx=ctx
    try{
        let data=await get('/data/catalog');
        let dataStringifiedDates=stringifyDates(data);
        
        //console.log(data)
        ctx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy));
    }catch(error){
        errorHandler(error);
    }

}



async function sortTableBy(ev){
  ev.preventDefault();
  let sortCriteria=ev.target.id;


  
  try {
        if(sortCriteria!='details'){
          let sortIndex=getTableCriteriaSortIndex(sortCriteria);
          let data=await post('/data/catalog',{sortCriteria:sortCriteria,sortIndex});
          setTableCriteriaSortIndex(sortCriteria,data.newSortIndex);
          let dataStringifiedDates=stringifyDates(data.sortedData);
          outerCtx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy));
        }
  } catch (error) {
    errorHandler(error);
  

  }

  //outerCtx.pageState.iApplyId=serverResponseData;
  //outerCtx.pageState.subjectSelectedValue=document.getElementById('subjectName').value;

  outerCtx.renderView(createTemplate(outerCtx.pageState,retrieveIapplyData));
}