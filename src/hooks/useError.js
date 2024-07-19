import { useState } from "react"

export function useError(){
    const [errMessages,setErrorMessages]=useState([]);
    const [fieldStatuses,setFieldStatuses]=useState();
    let messages=[];
    function handleError(error){
        if(!Array.isArray(error.message)){
           messages=[error.message]
        }else{
            messages=error.message
        }
        setErrorMessages(messages)
        
  
        if(error.frontEndFormChecker){
            delete error.message;
            delete error.frontEndFormChecker
        }
        setFieldStatuses(error)

        setTimeout(()=>{
        setErrorMessages([])
        },5000)
        

    }
    function clearFieldStatuses(){
        setFieldStatuses(null);
    }

return {errMessages,fieldStatuses,handleError,clearFieldStatuses}
}