
const allowedTypes={

    'description':'description',
    'email':'string',
    'password':'password',
    're-password':'password',
    'iApplyId':'iApplyId',
    'subjectId':'optional',
    'deadlineDate':'deadlineDate',
    'newDeadline':'deadlineDate',
    'clientEGFN':'string',
    'finCenter':'string',
    'finCenterText':'string',
    'nextStatus':'string',
    'commentText':'description',
    'searchData':'string',
    'searchString':'string',
    'branchNumber':'string',
    'branchName':'string',
    'userStatus':'string',
    'roleName':'optional',
    'role':'optional',
    'roleType':'string',
    'nextStatuses':'nextStatuses',
    'statusType':'string',
    'statusName':'string',
    'initialStatus':'string',
    'rolesAllowedToFinishRequest':'string',
    'workflowName':'string',
    'assignedToWorkflow':'string',
    'subjectName':'string'
    


}
export function loadFormData(form){
    
    let formDataObject={}
    let wrongFieldsObject={message:[]}
    let wrongData=false
    let formData=new FormData(form)
    for (const [key,value] of formData) {
        if (!formDataObject[key]){
            formDataObject[key]=value
        }else{
            if(formDataObject[key].constructor===Array){
                formDataObject[key].push(value);
            }else{
                formDataObject[key]=[formDataObject[key]];
                formDataObject[key].push(value);
            }
        }
        
    } 
    Object.entries(formDataObject).forEach((entry)=>{
        try{
            checkInputCorrect(entry[1],allowedTypes,entry[0])
            wrongFieldsObject[entry[0]]=false
        }catch(err){
            wrongFieldsObject[entry[0]]=true
            wrongFieldsObject.message.push(err.message);
            wrongData=true
        }
        
    })
    if (wrongData){
        /*let wrongFieldsObjectAsArray=Object.entries(wrongFieldsObject);
        wrongFieldsObjectAsArray.forEach((field)=>{
            if (field[1].wrongData&&field[0]!='message'){
                wrongFieldsObject.message+=`${field[0]} : ${field[1].errorMessage}`;
            }
        })*/
        wrongFieldsObject.frontEndFormChecker=true
        throw wrongFieldsObject
    }
    return formDataObject

}

export function loadInputValuesOutsideForm(inputsWrapper){
    let data={}
    let wrongFieldsObject={}
    let wrongData=false
    Array.from(inputsWrapper.children)
        .filter((child)=>child.nodeName==='INPUT')
        .forEach((child)=>{
            try{
                checkInputCorrect(child.value,allowedTypes,child.name);
                data[child.name]=child.value; 
            }catch(err){
                wrongFieldsObject[child.name]=true
                wrongData=true;
            }

        })
        if (wrongData){
            wrongFieldsObject.message='Invalid input';
            wrongFieldsObject.frontEndFormChecker=true
            throw wrongFieldsObject
        }
return data    
}

export function emptyFormData(inputsWrapper){
    
    Array.from(inputsWrapper.getElementsByTagName('input'))
        
        .forEach((child)=>{
            if (child.type==='text'||child.type==='number'||child.type=='textarea'||child.type=='password')
                child.value='';
        })
    Array.from(inputsWrapper.getElementsByTagName('textarea'))
        
        .forEach((child)=>{
            if (child.type==='text'||child.type==='number'||child.type=='textarea')
                child.value='';
        })


}

 function checkInputCorrect(value,allowedTypes,type){

   let action={
    
    'email':()=>{
        let regex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        let emailValid=regex.test(value)
        if (!emailValid){
            throw new Error('Некоректен формат за мейл')
        }  
    },
    'password':()=>{
        if ((value===''||value.length<3)){
            throw new Error('Паролата следва да бъде поне 3 символа')
        }
    },
    
    'string':()=>{
        if ((value==='')){
            throw new Error('Wrong input')
        }
    },
    'deadlineDate':()=>{
        if ((value<new Date(Date.now()))){
            throw new Error('Крайният срок не може да бъде минала дата')
        }
    },
    'iApplyId':()=>{
        let regex=/^[A-Z]{2}[0-9]+$/
        
        if ((!regex.test(value))){
            throw new Error('Грешен I-apply номер. Трябва да се състои от 2 главни букви и поне една цифра')
        }
    },
   
   
    'description':()=>{
        if(value.length<15){
            throw new Error('описанието трябва да е поне 15 символа');
        }
    },
    'nextStatuses':()=>{
        console.log('Next Statuses check');
    },
    'optional':()=>console.log('Optional. is optional')


   }   
    action[allowedTypes[type]]()
}

