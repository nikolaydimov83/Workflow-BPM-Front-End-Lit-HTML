import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export function useService(serviceFactory){
    const {user}=useContext(GlobalContext);

    return serviceFactory(user?.accessToken)
}