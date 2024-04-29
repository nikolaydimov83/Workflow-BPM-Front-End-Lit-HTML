import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Admin(){
    return (
        <div className="admin">
        <Link to="/dashboard">List All Users</Link>         
        <Link to="/createUser" id="createUserActiveDir">Create User</Link>
        <Link to="/transferIssues">Transfer Log</Link>
        <Link to="/uploadUsersFile">Upload Users File</Link>        
        <Logout/>
      </div>
    )
}