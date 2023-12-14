import { Link } from "react-router-dom";
import { DashboardContext } from "../../contexts/DashboardContext";
import { useContext } from "react";
import styles from './DasshboardWorkflowNav.module.css'

export default function DashboardWorkflowNav(){
    const {setrolesStatusesWorkflowsSubjects,rolesStatusesWorkflowsSubjects}=useContext(DashboardContext);
    
    function handleWorkflowNavClick(e){
        setrolesStatusesWorkflowsSubjects(e.target.name)
            console.log(rolesStatusesWorkflowsSubjects)
        
    }
    
    return (
        <nav className={styles['nav']}>
        <Link name='roles' to="/roles" onClick={handleWorkflowNavClick}>Roles</Link>         
        <Link name='statuses' to="/statuses" onClick={handleWorkflowNavClick}>Statuses</Link>
        <Link name='workflows' to="/workflows" onClick={handleWorkflowNavClick}>Workflows</Link>
        <Link name='subjects' to="/subjects" onClick={handleWorkflowNavClick}>Subjects</Link>
        
        </nav>
    )
}