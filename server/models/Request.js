const { Schema, model,Types } = require("mongoose");

//let arrayOfSubjects=['Чисто УВТ след ипотека','Вписване в ЦРОЗ','Удостоверение по ч. 87']
let arrayOfIApplyChars=['BL','ML']
const requestSchema=new Schema({
    requestWorkflow:{type:Types.ObjectId,ref:'Workflow',required:true},
    deadlineDate:{type:Date, required:true,validate:{
        validator:async (value)=>{
            let today=new Date()
            today.setHours(0,0,0,0);
            value.setHours(0,0,0,0);
            return value>=today

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    status:{type:Types.ObjectId, ref:'Status'},
    statusIncomingDate:{type:Date, required:true},
    statusSender:{type:String,required:true},
    history:{type:[],default:[],validate:{
        validator:async (value)=>{
            console.log(value)

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    description:{type:String, minLength:15},
    finCenter:{type:Number,required:true,min:100,max:999,validate:{
        validator:async (value)=>{
            console.log(value)

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    refferingFinCenter:{type:Number,validate:{
        validator:async (value)=>{
            console.log(value)

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    iApplyId:{type:String,required:true,validate:{
        validator:async (value)=>{
            const regex=/^[A-Z]{2}[0-9]+$/
            return regex.test(value)

        },
        message:(props)=>{return `${props.value} is not a valid I-applyId` }
    }},
    clientName:{type:String,required:true,validate:{
        validator:async (value)=>{
            console.log(value)

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    clientEGFN:{type:String,required:true,minLength:9,maxLength:10,validate:{
        validator:async (value)=>{
            console.log(value)

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    product:{type:String},
    amount:{type:Number, min:1000,validate:{
        validator:async (value)=>{
            console.log(value)

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    ccy:{type:String, enum:['BGN', 'EUR','USD','Other'],validate:{
        validator:async (value)=>{
            console.log(value)

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }},
    comments:{type:[Types.ObjectId],ref:'Comment',default:[],validate:{
        validator:async (value)=>{
            console.log(value)

        },
        message:(props)=>{return `${props.value} is past Date!` }
    }}

    
    
});

requestSchema.index({iApplyId:1},{
    collation:{
        locale:'en',
        strength:2
    }
});


const Request=model('Request', requestSchema);

module.exports=Request;