import { Link } from "react-router-dom";
import { DashboardContext } from "../../contexts/DashboardContext";
import { useContext } from "react";
import styles from './DasshboardWorkflowNav.module.css'

export default function DashboardAdminNav(){
    const {setrolesStatusesWorkflowsSubjects,rolesStatusesWorkflowsSubjects}=useContext(DashboardContext);
    
    function handleWorkflowNavClick(e){
        setrolesStatusesWorkflowsSubjects(e.target.name)
    }
    
    return (
        <nav className={styles['nav']}>
        <Link name='transferIssues' to="/transferIssues" onClick={handleWorkflowNavClick}>Transfer Issues</Link>         

        
        </nav>
    )
}