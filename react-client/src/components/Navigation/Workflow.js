import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Workflow(){
    return (
        <div className="workflow">
        <Link to="/roles">Roles</Link>         
        <Link to="/statuses">Statuses</Link>
        <Link to="/subjects">Subjects</Link>
        <Link to="/workflows">Workflows</Link>
        <Logout/>
      </div>
    )
}