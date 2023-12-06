import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function User(){
    return (
        <div className="user">
        <Link to="/dashboard">Моите Заявки</Link>         
        <Link to="/create">Създай Заявка</Link>
        <Logout/>  
        

      </div>
    )
}