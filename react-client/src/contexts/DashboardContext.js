import { createContext } from "react";
import { useDashboard } from "../hooks/useDashboard";

export const  DashboardContext=createContext();

export function DashboardContextProvider({children}){
   
    const {loadDashboardInfo,dashboardState}=useDashboard();
    
    return (
    
    <>
    <DashboardContext.Provider value={{loadDashboardInfo,dashboardState}}>
        {children}
    </DashboardContext.Provider>
    </>)
}