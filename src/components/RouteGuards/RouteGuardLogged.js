import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";



export const RouteGuardLogged = ({
    children,
}) => {
    const ctxGlobal=useContext(GlobalContext);

    
    if (!ctxGlobal.user) {
        return <Navigate to="/login" />;
    }

    return children ? children : <Outlet />
};