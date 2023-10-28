import { get } from '../api/api.js';
import { getDashBoardContext, setDashBoardContext } from '../api/dashboard.js';
import { html,repeat } from '../lib.js';
import { decorateDashboardWithDataTable } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';
let clearDashboardTemplate=()=>html``;
export let listActiveDirTemplate=(submitSearchForm,data)=>html`
<form class="search-wrapper cf">
<div class="search-wrapper-div">
<form  class="search-wrapper cf">
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
<h2>Потребители</h2>
<div class="tableLarge">
<table id="dashboard" class="no-footer dataTable" role="grid" aria-describedby="dashboard_info">
<thead >
  <tr >
  
    <th ><a id="branchNumber"href="javascript:void(0)">Role</a></th>
    <th ><a id="branchName"href="javascript:void(0)">Branch Name</a></th>
    <th ><a id="email"href="javascript:void(0)">User mail</a></th>
    <th ><a id="userStatus"href="javascript:void(0)">Status</a></th>
    <th ><a id="id"href="javascript:void(0)">Active Dir ID</a></th>
    <th ><a id="id"href="javascript:void(0)">Дружество</a></th>
    <th ><a id="details"href="javascript:void(0)">Детайли</a></th>

    
  </tr>
 </thead>
 <tbody>
 ${repeat(data,(item)=>item._id,(item)=>html`<tr>
     <td>${item.branchNumber}</td>
     <td>${item.branchName}</td>
     <td>${item.email}</td>
     <td>${item.userStatus}</td>
     <td>${item._id}</td>
     <td>Юробанк България АД</td>
     <td><a href="/admin/${item._id}">Покажи</a></td>

</tr>`)}
</tbody>
</table>
</div>

`
let outerCtx=null;
export async function listActiveDir(ctx){
    if(!outerCtx){
      outerCtx=ctx
    }
    setDashBoardContext({path:'/admin'})
    
      try{
          let data=await get(getDashBoardContext().path);
          //let dataStringifiedDates=stringifyDates(data.result);
          outerCtx.renderView(clearDashboardTemplate());
          outerCtx.renderView(listActiveDirTemplate(submitSearchForm,data));
          decorateDashboardWithDataTable(0,2);
      }catch(error){
          errorHandler(error);
      }
  
  }

function submitSearchForm(){
    console.log('I am here')
}

  