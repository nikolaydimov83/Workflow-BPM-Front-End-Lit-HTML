import { useState } from "react"

export function useForm(initialValues,submitHandler){
    const [formData,setFormData]=useState(initialValues)
    
    function updateFormFields(data){
      setFormData(data)
    }
    function updateSomeFormFields(data){
      setFormData((oldState)=>{
        return {...oldState,...data}
      })
    }
    function clearFormFileds(exceptionFields){
      let exceptionObject={}
      exceptionFields.forEach((field)=>{
        exceptionObject[field]=formData[field]
      })
      
      setFormData({...initialValues,...exceptionObject});
    }
    function onChangeUserForm(e){
  
        setFormData((oldUserState)=>{
          let userCheckBoxObject={...oldUserState[e.target.name], [e.target.value]:e.target.checked}
          if( typeof oldUserState[e.target.name] === 'object' &&
              !Array.isArray(oldUserState[e.target.name]) &&
              oldUserState[e.target.name] !== null&&
              e.target.tagName!=='SELECT'){
            return {...oldUserState, [e.target.name]:userCheckBoxObject}
          }else  if(Array.isArray(oldUserState[e.target.name]) &&
          oldUserState[e.target.name] !== null){

        return {...oldUserState,[e.target.name]:Array.from(e.target.selectedOptions,(option)=>option.value)}
      
      }
          
          else{
            
            return {...oldUserState, [e.target.name]:e.target.value}
          }
          
        })
      }
      function onSubmitUserForm(e){
        e.preventDefault()
        submitHandler(formData)
      }

    return {
        onChangeUserForm,
        onSubmitUserForm,
        formData,
        updateFormFields,
        updateSomeFormFields,
        clearFormFileds
    }
}