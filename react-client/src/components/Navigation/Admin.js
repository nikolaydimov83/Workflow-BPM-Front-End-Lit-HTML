import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Admin(){
    return (
        <div className="admin">
        <Link to="/admin">List All Users</Link>         
        <Link to="/createUser" id="createUserActiveDir">Create User</Link>
        <Logout/>
      </div>
    )
}