import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function Workflow(){

    return (
        <div className="workflow">
        <Link to="/dashboard">Моите Процеси</Link>  
        <Logout/>
      </div>
    )
}