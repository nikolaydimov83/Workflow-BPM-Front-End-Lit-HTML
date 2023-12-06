import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Guest from "./Guest";
import Admin from "./Admin";
import Workflow from "./Workflow";
import User from "./User";
import styles from "./Header.module.css"

export default function Header(){
    const ctx=useContext(AuthContext);
    

    return (
        <header className="navi" style={styles}>
        
        <Link id="logo" to="/"
          ><img className="logo" id="logo-img" src="./images/logoPost.png" alt=""
        /></Link>
        
        <nav>
            {!ctx.user?
            <Guest/>:
            
            ctx.user.role==='Admin'?
            <Admin/>:
            ctx.user.role==='Workflow'?
            <Workflow/>:
            <User/>}          
        </nav>
      </header>
    )
}