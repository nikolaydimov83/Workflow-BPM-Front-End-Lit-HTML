import { useContext, useEffect } from "react";
import SearchForm from "./SearchForm";
import { DashboardContext } from "../../contexts/DashboardContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import Table from "./Table";
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import ReportButtons from "./ReportButtons";
import styles from './Dashboard.module.css'

export default function Dashboard(){
    const dashAPI=useService(dashboardServiceFactory)
    const ctxGlobal=useContext(GlobalContext)
    const 
        {
            loadDashboardInfo,
            dashboardState,
        }=useContext(DashboardContext)
    useEffect(()=>{

        try {
            loadDashboardInfo(dashAPI.getAll)
        } catch (error) {
            ctxGlobal.handeleError()
        }
        
    },[]);

    return (
        
    <>

        <div className={styles["search-wrapper-div"]}>
            <SearchForm/>
            <ReportButtons/>  
        </div>
        <h2>{dashboardState.searchContextString}</h2>
        <div className="tableLarge">
        <Table/>
        </div>
    </>

    )
}