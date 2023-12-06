import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useService(serviceFactory){
    const {user}=useContext(AuthContext);

    return serviceFactory(user?.accessToken)
}