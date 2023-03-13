export async function errorHandler(error){
    let notificationDiv=document.querySelector('.notification');
    notificationDiv.querySelector('span').textContent=error.message;
    notificationDiv.style.display='block';
    if(error.frontEndFormChecker){
        let errorAsArrays=Object.entries(error);
        errorAsArrays.forEach((errorKeyValue)=>{
            const key=errorKeyValue[0]
            const value=errorKeyValue[1]
            if(key!='message'&&key!='frontEndFormChecker'&&value==true){
                let formElement =document.getElementById(key)
                formElement.style.backgroundColor= "red";
            }
        })
    }
    setTimeout(()=>notificationDiv.style.display='none',5000);
   

}