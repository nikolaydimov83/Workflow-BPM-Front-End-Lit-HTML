import { createContext, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { trialTableStrucure,userTableStrucure } from "../tableStructures/tableStructures";
export const  DashboardContext=createContext();

export function DashboardContextProvider({children}){
   const [dashboardContextState,setDashboardContextState]=useState(userTableStrucure)
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