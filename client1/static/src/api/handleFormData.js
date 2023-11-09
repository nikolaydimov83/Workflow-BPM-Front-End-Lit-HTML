
const emailPattern=/^[A-Za-z0-9]+@postbank.bg$/
const allowedTypes={

    'description':'description',
    'email':'email',
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
    'branchNumber':'branchNumber',
    'branchName':'branchName',
    'userStatus':'string',
    'roleName':'roleName',
    'role':'optional',
    'roleType':'roleType',
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
            formDataObject[entry[0]]=checkInputCorrect(entry[1],allowedTypes,entry[0])
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
    
    'password':()=>{
        if ((value===''||value.length<3)){
            throw new Error(type+': Паролата следва да бъде поне 3 символа');
        }
        return value
    },
    
    'string':()=>{
        if ((value==='')){
            throw new Error(type+' Wrong input');
        }
        return value
    },
    'branchName':()=>{
        if ((value==='')){
            throw new Error('Името на клона е задължително поле');
        }
        return value
    },
    'branchNumber':()=>{
        let regex=/^[0-9]+$/
        if ((!value.match(regex))){
            throw new Error('Номера на клона е число от 1 до 999');
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
    'deadlineDate':()=>{
        if ((value<new Date(Date.now()))){
            throw new Error('Крайният срок не може да бъде минала дата');
        }
        return value
    },
    'iApplyId':()=>{
        let regex=/^[A-Z]{2}[0-9]+$/
        value.trim();
        if ((!regex.test(value))){
            throw new Error('Грешен I-apply номер. Трябва да се състои от 2 главни букви и поне една цифра');
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
        let testForMatch=/^[A-Za-z0-9]+@postbank.bg$/.test(value);
            if(!testForMatch){
                throw new Error('Мейла не е в очаквания формат username@postbank.bg! В допълнение моля уверете се, че сте премахнали излишни интервали')
            }
        return value
    },
    'nextStatuses':()=>{
        console.log('Next Statuses check');
        return value
    },
    'optional':()=>value


   }   
    return action[allowedTypes[type]]()
}

