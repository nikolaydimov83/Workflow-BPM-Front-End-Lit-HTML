import { get,post } from '../api/api.js';
import { getDashBoardContext, getTableCriteriaSortIndex, setDashBoardContext, setTableCriteriaSortIndex } from '../api/dashboard.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { stringifyDates } from '../utils.js';
import { catalogTemplate, outerCtx, sortTableBy, submitsearchEGFNForm, submitsearchForm } from './dashboardView.js';
import { errorHandler } from './errorHandler.js';




export async function showDefauaultReport(ctx){

  setDashBoardContext({path:'/reportsController'})
  let dashboardContext=getDashBoardContext()
    try{
        let data=await get(dashboardContext.path);
        let dataStringifiedDates=stringifyDates(data);
        ctx.renderView(catalogTemplate(dataStringifiedDates,sortTableBy,submitsearchEGFNForm,submitsearchForm));
    }catch(error){
        errorHandler(error);
    }

}


