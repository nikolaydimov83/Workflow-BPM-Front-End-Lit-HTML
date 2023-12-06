import { createContext } from "react";
import { useUser } from "../hooks/useUser";
import { getUserData } from "../utils/localStorage";

export const  AuthContext=createContext();

export function AuthContextProvider({children}){
    const {loginUser, logoutUser, user}=useUser(getUserData());
    
    return (
    
    <>
    <AuthContext.Provider value={{loginUser,logoutUser,user}}>
        {children}
    </AuthContext.Provider>
    </>)
}