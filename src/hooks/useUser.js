import { useState } from "react";
import { clearUserData, setUserData } from "../utils/localStorage";

export function useUser(initialValue){
    const [user,setUser]=useState(initialValue);
    function loginUser(user){
        setUser(user);
        setUserData(user)
        
    }
    function logoutUser(){
        setUser(false)
        clearUserData();
    }
    return {
        loginUser,
        logoutUser,
        user
    }
}