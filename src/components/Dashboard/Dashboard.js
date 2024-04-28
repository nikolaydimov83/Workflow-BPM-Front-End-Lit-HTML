import { useContext, useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { DashboardContext } from "../../contexts/DashboardContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import Table from "./Table";
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import ReportButtons from "./ReportButtons";
import styles from './Dashboard.module.css'
import adminServiceFactory from "../../api/services/adminServiceFactory";
import workflowServiceFactory from "../../api/services/workflowServiceFactory";
import DashboardWorkflowNav from "./DashboardWorkflowNav";
import Spinner from "./Spinner/Spinner";
import { useLocation } from "react-router";

export default function Dashboard(){
    let pathname=useLocation().pathname.replace('/','');
    const ctxGlobal=useContext(GlobalContext);
    const {
        setNewTableStructure, 
        loadDashboardInfo, 
        getTableStructure,
        dashboardState, 
        rolesStatusesWorkflowsSubjects,
        spinnerActive
        }=useContext(DashboardContext)
    const dashAPI=useService(dashboardServiceFactory);
    const adminAPI=useService(adminServiceFactory);
    const workflowApi=useService(workflowServiceFactory)



        
    useEffect(()=>{
        let newChosenFunc=chooseApiFunction();
        try {
   
            const newTableStructure=getTableStructure(rolesStatusesWorkflowsSubjects)
            loadDashboardInfo(newChosenFunc);
            setNewTableStructure(newTableStructure)
            
        } catch (error) {
            ctxGlobal.handleError(error)
        }
    },[rolesStatusesWorkflowsSubjects])
    

    const chosenFunction=chooseApiFunction();

    useEffect(()=>{

        try {
            loadDashboardInfo(chosenFunction)
        } catch (error) {
            ctxGlobal.handleError(error)
        }
        
    },[]);
    function chooseApiFunction(){
        let chosenFunction;
        
        if (ctxGlobal.user.role==='Admin'){
            if (pathname==='dashboard'){
                chosenFunction=adminAPI.getAllAdminInfo;
            }else{
                chosenFunction=adminAPI.getWrongDataLog;
            }
            
        }else if(ctxGlobal.user.role==='Workflow'){
            
            chosenFunction=workflowApi[rolesStatusesWorkflowsSubjects];
        }
        
        else{
            chosenFunction=dashAPI.getAll
        }
        return chosenFunction
    }
    return (
        
    <>

        <div className={styles["search-wrapper-div"]}>
            
            {['Admin','Workflow'].includes(ctxGlobal.user.role)?'':
           <>
                <SearchForm/>
                <ReportButtons/>
           </> 
            }  

            {['Workflow'].includes(ctxGlobal.user.role)?<DashboardWorkflowNav/>:''
        
                
              
           
            }
        </div>
        <h2>{dashboardState.searchContextString}</h2>
        <div className="tableLarge">
        {spinnerActive?<Spinner/>:<Table/>}
        </div>
    </>

    )
}