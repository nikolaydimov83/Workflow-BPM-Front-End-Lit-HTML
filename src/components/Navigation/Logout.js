import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useService } from "../../hooks/useService";
import { authServiceFactory } from "../../api/services/authServiceFactory";

export  default function Logout(){

    const ctx=useContext(GlobalContext);
    const auth=useService(authServiceFactory);
    const navigate=useNavigate();
    
    function onclickLogoutHandler(e){
        e.preventDefault()
        auth.logout().catch((err)=>{
            ctx.handleError(err);
        })
        ctx.logoutUser();
        navigate('/');
    }

    return (
        <>
            <Link onClick={onclickLogoutHandler} id="logout">Изход</Link>
            <Link >{ctx.user.email}</Link>
        </>

    )
}