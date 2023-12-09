import { useContext } from "react"
import { DashboardContext } from "../../contexts/DashboardContext"
import { useService } from "../../hooks/useService"
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory"

export default function ReportButtons(){
    const {loadDashboardInfo }=useContext(DashboardContext)
    const dashAPI =useService(dashboardServiceFactory)
    function handleOnClickDelayedBtn(e){
        const apiFunc=e.target.name
        loadDashboardInfo(dashAPI[apiFunc])
    }
    return (
    <>
        <button onClick={handleOnClickDelayedBtn} name="getAll" className="pre-set-report">На мой екран</button>
        <button onClick={handleOnClickDelayedBtn} name="getDelayed" className="pre-set-report">Забавени</button>
        <button onClick={handleOnClickDelayedBtn} name="getAllActive" className="pre-set-report">Всички Активни</button>
        <button onClick={handleOnClickDelayedBtn} name="getClosedAndActive" className="pre-set-report">Всички</button>
    </>
    
    )
}