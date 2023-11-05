
const allowedTypes={

    'description':'description',
    'email':'string',
    'password':'password',
    're-password':'password',
    'iApplyId':'iApplyId',
    'subjectId':'optional',
    'deadlineDate':'string',
    'newDeadline':'string',
    'clientEGFN':'string',
    'finCenter':'string',
    'finCenterText':'string',
    'nextStatus':'string',
    'commentText':'string',
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
    'workflowName':'string'
    


}
export function loadFormData(form){
    
    let formDataObject={}
    let wrongFieldsObject={}
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
            wrongData=true
        }
        
    })
    if (wrongData){
        wrongFieldsObject.message='Invalid input';
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
                wrongData=true
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
            throw new Error('Email is not correct')
        }  
    },
    'password':()=>{
        if ((value===''||value.length<3)){
            throw new Error('Password is not corretct. Should be at least 3 characters long')
        }
    },
    
    'string':()=>{
        if ((value==='')){
            throw new Error('Wrong input')
        }
    },
    'iApplyId':()=>{
        let regex=/^[A-Z]{2}[0-9]+$/
        
        if ((!regex.test(value))){
            throw new Error('Wrong input of iApplyId. Should start with 2 capital letters and at least 1 number')
        }
    },
   
   
    'description':()=>{
        if(value.length<15){
            throw new Error('Description should be at least 15 chars long');
        }
    },
    'nextStatuses':()=>{
        console.log('Next Statuses check');
    },
    'optional':()=>console.log('Optional. is optional')


   }   
    action[allowedTypes[type]]()
}

