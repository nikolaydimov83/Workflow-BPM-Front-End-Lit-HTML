import { Link } from "react-router-dom";
import styles from './WorkflowCreateEditNav.module.css'

export default function WorkflowCreateEditNav(){

    
    return (
        <nav className={styles['nav']}>
        <Link name='roles' to="/roles">Roles</Link>         
        <Link name='statuses' to="/statuses">Statuses</Link>
        <Link name='workflows' to="/workflows">Workflows</Link>
        <Link name='subjects' to="/subjects">Subjects</Link>
        </nav>
    )
}