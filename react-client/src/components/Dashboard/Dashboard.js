import { useContext, useEffect } from "react";
import SearchForm from "./SearchForm";
import { DashboardContext } from "../../contexts/DashboardContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import Table from "./Table";
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import ReportButtons from "./ReportButtons";
import styles from './Dashboard.module.css'
import adminServiceFactory from "../../api/services/adminServiceFactory";

export default function Dashboard(){

    const ctxGlobal=useContext(GlobalContext)
    const dashAPI=useService(dashboardServiceFactory)
    const adminAPI=useService(adminServiceFactory)
    let chosenFunction;
    if (ctxGlobal.user.role==='Admin'){
        chosenFunction=adminAPI.getAllAdminInfo;
    }else{
        chosenFunction=dashAPI.getAll
    }
    
    const 
        {
            loadDashboardInfo,
            dashboardState,
        }=useContext(DashboardContext)
    useEffect(()=>{

        try {
            loadDashboardInfo(chosenFunction)
        } catch (error) {
            ctxGlobal.handleError(error)
        }
        
    },[]);

    return (
        
    <>

        <div className={styles["search-wrapper-div"]}>
            
            {['Admin','Workflow'].includes(ctxGlobal.user.role)?'':
           <>
                <SearchForm/>
                <ReportButtons/>
           </> 
            }  
        </div>
        <h2>{dashboardState.searchContextString}</h2>
        <div className="tableLarge">
        <Table/>
        </div>
    </>

    )
}