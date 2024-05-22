import { createContext, useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { useParams } from "react-router";
export const  DetailsContext=createContext();

export function DetailsContextProvider({children}){
    const {id} = useParams();
    const [historyArray,setHistoryArray]=useState([]);
    const [historyActive,setHistoryActive]=useState(false);
    
    return (
    
    <>
    <DetailsContext.Provider 
    value={
        {
            id,
            historyArray,
            setHistoryArray,
            historyActive,
            setHistoryActive
        }}>
        {children}
    </DetailsContext.Provider>
    </>)
}