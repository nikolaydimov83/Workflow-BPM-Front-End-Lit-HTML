
const emailPattern=/^[A-Za-z0-9]+@postbank.bg$/
const iApplyPattern=/^[A-Z]{2}[0-9]+$/
const allowedTypes={
    'email':'email',
    'password':'password',
    're-password':'password',
    'searchString':'string',
    'nextStatus':'string',
    'commentText':'description',
    'newDeadline':'deadlineDate',
    'iApplyId':'iApplyId',
    'subjectId':'string',
    'deadlineDate':'deadlineDate',
    'clientEGFN':'clientEGFN',
    'finCenter':'finCenter',
    'refferingFinCenter':'refferingFinCenter',
    'description':'description',
    'clientName':'string',
    'product':'string',
    'ccy':'string',
    'amount':'amount',
    'branchNumber':'finCenter',
    'branchName':'string',
    'role':'string',
    'userStatus':'userStatus',
    'id':'string',
    'roleName':'roleName',
    'roleType':'roleType',
    'nextStatuses':'string',
    'statusType':'string',
    'statusName':'string',
    'initialStatus':'string',
    'rolesAllowedToFinishRequest':'string',
    'workflowName':'string',
    'assignedToWorkflow':'string',
    'subjectName':'string',
    'resetCode':'string',
    'file':'string'
}
export function loadFormData(data){
    let formData=Object.entries(data);
    let formDataObject={}
    let wrongFieldsObject={message:[]}
    let wrongData=false
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
            formDataObject[entry[0]]=checkInputCorrect(entry[1],allowedTypes,entry[0])
            wrongFieldsObject[entry[0]]=false
        }catch(err){
            wrongFieldsObject[entry[0]]=true
            wrongFieldsObject.message.push(err.message);
            wrongData=true
        }
        
    })
    if (wrongData){

        wrongFieldsObject.frontEndFormChecker=true
        throw wrongFieldsObject
    }
    return formDataObject

}


export function emptyFormData(inputsWrapper){
    
    Array.from(inputsWrapper.getElementsByTagName('input'))
        
        .forEach((child)=>{
            if (child.type==='text'||child.type==='number'||child.type==='textarea'||child.type==='password')
                child.value='';
        })
    Array.from(inputsWrapper.getElementsByTagName('textarea'))
        
        .forEach((child)=>{
            if (child.type==='text'||child.type==='number'||child.type==='textarea')
                child.value='';
        })


}

 function checkInputCorrect(value,allowedTypes,type){

    
   let action={
    
    'password':()=>{
        if ((value===''||value.length<3)){
            throw new Error(type+': Паролата следва да бъде поне 3 символа');
        }
        return value
    },
    
    'string':()=>{
        if ((value==='')){
            throw new Error(type+' Не може да бъде празно поле');
        }
        return value
    },
   
    'description':()=>{
        if(value.length<15){
            throw new Error('описанието трябва да е поне 15 символа');
        }
        return value
    },
    'email':()=>{
        value=value.trim();
        let testForMatch=emailPattern.test(value);
            if(!testForMatch){
                throw new Error('Мейла не е в очаквания формат username@postbank.bg!')
            }
        return value
    },
    'deadlineDate':()=>{
        let today=new Date(Date.now())
        today.setHours(0,0,0,0);
        let valueAsDate=new Date(value)
        valueAsDate.setHours(0,0,0,0);
        if ((valueAsDate<today)||(!value)){
            throw new Error('Крайният срок е задължително поле и не може да бъде минала дата');
        }
        return value
    },
    'finCenter':()=>{
        
        if (Number(value)<1||Number(value)>999){
            throw new Error('Финансовия центрър е число между 1 и 999')
        }
        return value
    },
    'refferingFinCenter':()=>{
        
        if (value&&(Number(value)<1||Number(value)>999)){
            throw new Error('Рефериращия финансов центрър е число между 1 и 999')
        }
        return value
    },
    'clientEGFN':()=>{
        if (value.length>10||value.length<9){
            throw new Error ('Невалиден формат на ЕГН/Булстат. Следва да бъде точно 10/9 цифри')
        }
        return value
    },
    'amount':()=>{
        if (Number(value)<100){
            throw new Error('Некоректен размер на кредита. Размера не може да е по-малък от 100')
        }
        return value
    },
    'iApplyId':()=>{
       
        let testForMatch=iApplyPattern.test(value);
            if(!testForMatch){
                throw new Error('Номера на заявлението не е в очкавания формат!')
            }
        return value
    },
    'userStatus':()=>{
        if(value!=='Active'&&value!=='Inactive'){
            throw new Error ('User status is not correct! Should be Active/Inactive!')
        }
        return value
    },
    'roleName':()=>{
        if ((value==='')){
            throw new Error('Име на роля е задължително поле');
        }
        return value
    },
    'roleType':()=>{
        if ((value!=='Branch'&&value!=='HO')){
            throw new Error('Грешен тип на роля - трябва да бъде HO или Branch');
        }
        return value
    },
    'optional':()=>value
   }   

    return action[allowedTypes[type]]()
}

