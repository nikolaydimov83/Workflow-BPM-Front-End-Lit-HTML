import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";



export const RouteGuardUser = ({
    children,
}) => {
    const ctxGlobal=useContext(GlobalContext);

    
    if (!ctxGlobal.user) {
        return <Navigate to="/login" />;
    } else if (['Workflow','Admin'].includes(ctxGlobal.user.role)){
        return <Navigate to="/dashboard" />;
    }

    return children ? children : <Outlet />
};