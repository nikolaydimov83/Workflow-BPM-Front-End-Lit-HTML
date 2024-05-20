import { useContext } from "react"
import { DashboardContext } from "../../contexts/DashboardContext"
import { useService } from "../../hooks/useService"
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory"
import styles from './ReportButtons.module.css'

export default function ReportButtons(){
    const {loadDashboardInfo, page,setUserCurrentReport,setPage}=useContext(DashboardContext)
    const dashAPI =useService(dashboardServiceFactory)
    function handleOnClickDelayedBtn(e){
        const apiFunc=e.target.name
        setUserCurrentReport(apiFunc);
        setPage(1);
        loadDashboardInfo(dashAPI[apiFunc],page);
    }
    return (
    <>
        <button onClick={handleOnClickDelayedBtn} name="getAll" className={styles["pre-set-report"]}>На мой екран</button>
        <button onClick={handleOnClickDelayedBtn} name="getDelayed" className={styles["pre-set-report"]}>Забавени</button>
        <button onClick={handleOnClickDelayedBtn} name="getAllActive" className={styles["pre-set-report"]}>Всички Активни</button>
        <button onClick={handleOnClickDelayedBtn} name="getClosedAndActive" className={styles["pre-set-report"]}>Всички</button>
    </>
    
    )
}