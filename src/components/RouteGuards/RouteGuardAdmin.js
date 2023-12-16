import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";



export const RouteGuardAdmin = ({
    children,
}) => {
    const ctxGlobal=useContext(GlobalContext);

    
    if (!ctxGlobal.user) {
        return <Navigate to="/login" />;
    } else if (ctxGlobal.user.role!=='Admin'){
        return <Navigate to="/dashboard" />;
    }

    return children ? children : <Outlet />
};