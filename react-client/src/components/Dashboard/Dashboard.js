import { useContext, useEffect } from "react";
import SearchForm from "./SearchForm";
import { DashboardContext } from "../../contexts/DashboardContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { trialTableStrucure, userTableStrucure } from "../../tableStructures/tableStructures";
import { exportToExcel } from "../../utils/handleExcel";
import Table from "./Table";
import { useService } from "../../hooks/useService";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import ReportButtons from "./ReportButtons";

export default function Dashboard(){
    const dashAPI=useService(dashboardServiceFactory)
    const ctxGlobal=useContext(GlobalContext)
    const 
        {
            loadDashboardInfo,
            dashboardState,
            handleFilterChange,
            filterText,
            filteredState,
            dashboardContextState
        }=useContext(DashboardContext)
    useEffect(()=>{

        try {
            loadDashboardInfo(dashAPI.getAll)
        } catch (error) {
            ctxGlobal.handeleError()
        }
        
    },[])
    function handleOnClickExcel(e){
        exportToExcel(filteredState,dashboardContextState)
    }
    return (
        
    <>

        <div className="search-wrapper-div">
        <SearchForm/>
        <ReportButtons/>
        </div>
        <h2>{dashboardState.searchContextString}</h2>
        <div className="tableLarge">
        
        <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Filter..."
        />
        <button onClick={handleOnClickExcel}>Excel</button>
        <Table/>
        </div>
    </>

    )
}