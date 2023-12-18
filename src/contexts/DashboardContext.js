import { createContext, useContext, useEffect, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { adminTableStructure,userTableStrucure,workFlowTableStructure } from "../tableStructures/tableStructures";
import { GlobalContext } from "./GlobalContext";
import { useLocation } from "react-router";
export const  DashboardContext=createContext();

export function DashboardContextProvider({children}){
   const ctxGlobal=useContext(GlobalContext);
   let pathname=useLocation().pathname.replace('/','');
   if(pathname==='dashboard'){
    pathname='roles'
   }
   const [rolesStatusesWorkflowsSubjects, setrolesStatusesWorkflowsSubjects]=useState(pathname);
   const initialTable=getTableStructure(rolesStatusesWorkflowsSubjects);

   
    function getTableStructure(workflowListType){
       if (ctxGlobal.user.role==='Admin'){
        return (adminTableStructure)
       }else if(ctxGlobal.user.role==='Workflow'){

           return (workFlowTableStructure[workflowListType]);

       }else{

            return (userTableStrucure)
       }
  }
  
    const 
        {
            loadDashboardInfo,
            dashboardState,
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            handleFilterChange,
            filterText,
            filteredState,
            setNewTableStructure,
            spinnerActive,
            tableStructure
            
        }=useDashboard(initialTable);
    
    return (
    
    <>
    <DashboardContext.Provider 
    value={
        {
        loadDashboardInfo,
        dashboardState,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        handleFilterChange,
        filterText,
        filteredState,
        setNewTableStructure,
        getTableStructure,
        rolesStatusesWorkflowsSubjects,
        setrolesStatusesWorkflowsSubjects,
        spinnerActive,
        tableStructure
        }}>
        {children}
    </DashboardContext.Provider>
    </>)
}