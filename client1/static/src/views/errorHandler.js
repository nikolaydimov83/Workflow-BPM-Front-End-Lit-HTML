import { repeat } from "../lib.js";

let errorTemplate=(messages)=>html`
<div class="notification-wrapper">
    ${repeat(messages,(message)=>message,message=>html`
        <div class="notification"><span></span></div>
    `)}
        
      </div>
`

export async function errorHandler(error){
    let notificationWrapperDiv=document.querySelector(".notification-wrapper");
    notificationWrapperDiv.style.display='block'
    error.message.forEach((m)=>{
        let notificationDiv=document.createElement('div');
        notificationDiv.style.display='block';
        notificationDiv.className='notification';
        let span=document.createElement('span')
        notificationDiv.appendChild(span);
        notificationDiv.querySelector('span').textContent=m;
        notificationWrapperDiv.appendChild(notificationDiv);
    })

    if(error.frontEndFormChecker){
        let errorAsArrays=Object.entries(error);
        errorAsArrays.forEach((errorKeyValue)=>{
            const key=errorKeyValue[0]
            const value=errorKeyValue[1]
            if(key!='message'&&key!='frontEndFormChecker'&&value==true){
                let formElement =document.getElementById(key)
                formElement.style.backgroundColor= "red";
            }else{
                let formElement =document.getElementById(key);
                if (formElement){
                    formElement.style.backgroundColor= "white"
                }
            }
        })
    }
    setTimeout(()=>{
        notificationWrapperDiv.style.display='none';
        while (notificationWrapperDiv.firstChild) {
            notificationWrapperDiv.firstChild.remove()
        }
    },8000);
   

}