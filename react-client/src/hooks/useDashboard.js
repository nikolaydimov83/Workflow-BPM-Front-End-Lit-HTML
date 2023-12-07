import { useState } from "react";
import { useService } from "./useService";
import dashboardServiceFactory from "../api/services/dashboardServiceFactory";
import { stringifyDates } from "../utils/handleDates";

export function useDashboard(){
    const [dashboardState,setDashboardState]=useState(
        {
            result:[],
            searchContextString:''
        });
    const dashApi=useService(dashboardServiceFactory)
    
    function loadDashboardInfo(){
        dashApi.getAll()
            .then((data)=>{
                const items=stringifyDates(data.result)
                setDashboardState({result:items,searchContextString:data.searchContextString});
            })
            .catch((err)=>{
                throw err
            })
    }
    return {loadDashboardInfo,dashboardState}
}