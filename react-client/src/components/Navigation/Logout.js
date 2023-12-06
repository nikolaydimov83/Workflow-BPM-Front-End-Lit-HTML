import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export  default function Logout(){
    const ctx=useContext(AuthContext)
    return (
        <>
            <Link to="javascript:void(0)" id="logout">Изход</Link>
            <Link >{ctx.user.email}</Link>
        </>

    )
}