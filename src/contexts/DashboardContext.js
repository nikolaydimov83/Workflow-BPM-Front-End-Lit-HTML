import { createContext, useContext, useEffect, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { adminTableStructure,userTableStrucure } from "../tableStructures/tableStructures";
import { GlobalContext } from "./GlobalContext";
export const  DashboardContext=createContext();

export function DashboardContextProvider({children}){
   const ctxGlobal=useContext(GlobalContext);
   const table=ctxGlobal.user.role==='Admin'?adminTableStructure:userTableStrucure;
   //useEffect(()=>{},[])
   const [dashboardContextState,setDashboardContextState]=useState(table)
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
            filteredState
        }=useDashboard(dashboardContextState);
    
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
        dashboardContextState
        }}>
        {children}
    </DashboardContext.Provider>
    </>)
}