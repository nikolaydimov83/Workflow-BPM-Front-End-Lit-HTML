import { createContext, useContext } from "react";
import { useUser } from "../hooks/useUser";
import { getUserData } from "../utils/localStorage";
import { useError } from "../hooks/useError";

export const  GlobalContext=createContext();

export function AuthContextProvider({children}){

    const {loginUser, logoutUser, user}=useUser(getUserData());
    const {errMessages,fieldStatuses,handleError,clearFieldStatuses}=useError();

    
    return (
    
    <>
    <GlobalContext.Provider value={
                                    {
                                        loginUser,
                                        logoutUser,
                                        user,
                                        handleError,
                                        errMessages,
                                        fieldStatuses,
                                        clearFieldStatuses
                                        }}>
        {children}
    </GlobalContext.Provider>
    </>)
}