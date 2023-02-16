const { Schema, model,Types } = require("mongoose");

let arrayOfSubjects=['Чисто УВТ след ипотека','Вписване в ЦРОЗ','Удостоверение по ч. 87']
let arrayOfIApplyChars=['BL','ML']
const requestSchema=new Schema({
    subject:{type:String,required:true, enum:arrayOfSubjects},
    deadLineDate:{type:Date, required:true,validate:{
        validator:async (value)=>{
            let today=new Date()
            today.setHours(0,0,0,0);
            value.setHours(0,0,0,0);
            return value>=today

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    status:{type:Types.ObjectId, ref:'Status'},
    statusIncomingDate:{type:Date},
    statusSender:{type:Types.ObjectId,ref:'User'},
    history:{type:[],default:[]},
    description:{type:String, required:true, minLength:15},
    finCenter:{type:Number,required:true,min:100,max:999},
    iApplyId:{type:String,required:true,validate:{
        validator:async (value)=>{
            return arrayOfIApplyChars.includes(value.toString().substring(0,2));
            

        },
        message:(props)=>{
            return `${props.value} is not a valid I-apply application Id. Valid ids must start with ${arrayOfIApplyChars.join(', ')}` 
        }
    }},
    clientName:{type:String,required:true},
    clientEGFN:{type:String,required:true,minLength:9,maxLength:10},
    product:{type:String},
    amount:{type:Number, min:1000},
    ccy:{type:String, enum:['BGN', 'EUR','USD']},
    comments:{type:[Types.ObjectId],ref:'Comment',default:[]}

    
    
});

requestSchema.index({requestId:1},{
    collation:{
        locale:'en',
        strength:2
    }
});


const Request=model('Request', requestSchema);

module.exports=Request;