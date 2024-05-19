import { createContext, useContext, useEffect, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { adminTableStructure,issuesTableStructure,userTableStrucure,workFlowTableStructure } from "../tableStructures/tableStructures";
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
   const [userCurrentReport, setUserCurrentReport]=useState('getAll');
   const initialTable=getTableStructure(rolesStatusesWorkflowsSubjects);
   const [page,setPage]=useState(1)

   
    function getTableStructure(workflowListType){
       if (ctxGlobal.user.role==='Admin'&&pathname==='transferIssues'){
        return (issuesTableStructure)
       }
       else if(ctxGlobal.user.role==='Admin'&&pathname!=='transferIssues'){
        return (adminTableStructure)
       }
       else if(ctxGlobal.user.role==='Workflow'){

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
            tableStructure,
        
            
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
        tableStructure,
        page,
        setPage,
        userCurrentReport,
        setUserCurrentReport
        }}>
        {children}
    </DashboardContext.Provider>
    </>)
}