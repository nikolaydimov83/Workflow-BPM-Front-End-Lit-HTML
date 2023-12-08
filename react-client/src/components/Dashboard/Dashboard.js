import { useContext, useEffect } from "react";
import SearchForm from "./SearchForm";
import { DashboardContext } from "../../contexts/DashboardContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { trialTableStrucure, userTableStrucure } from "../../tableStructures/tableStructures";
import { exportToExcel } from "../../utils/handleExcel";
import Table from "./Table";

export default function Dashboard(){
    //const ctxDashboard=useContext(DashboardContext)
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
            loadDashboardInfo()
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
        <button className="pre-set-report">На мой екран</button>
        <button className="pre-set-report">Забавени</button>
        <button className="pre-set-report">Всички Активни</button>
        <button className="pre-set-report">Всички</button>
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