    //await UserActiveDir.create({email:'dsrangelova@postbank.bg',branchNumber:101,branchName:'LA'});
    //await UserActiveDir.create({email:'epaneva@postbank.bg',branchNumber:171,branchName:'Tzar Osvoboditel'});

const Workflow = require("./models/Workflow");
const Comment=require("./models/Comment")
const { createSubject } = require("./services/subjectServices");
const Request = require("./models/Request");

    //await User.create({email:'ndimov1@postbank.bg'});
    /*await User.create({email:'epaneva@postbank.bg'});*/
    //let nikolay=await User.findOne({email:'epaneva@postbank.bg'}).populate('userStaticInfo');
    //console.log(nikolay.userStaticInfo);


    //createStatus('Върната в клона за отстраняване на пропуски преди написване на анекс','Branch')
    //let a=await Status.find({}).populate('nextStatuses')
    //a.forEach((stat1)=>stat1.nextStatuses.forEach((stat)=>{console.log(stat1.statusName+' : '+stat.statusName)}));
    
    /*createSubject('Да се представи ГДД');
    createSubject('Да се учреди залог');
    createSubject('Да се представят документи след рефинансиране');
    createSubject('Да се представи Удостоверение за степен на завършеност на финансираната сграда');
    createSubject('Погасяване на суми по кредита');
    createSubject('Учредяване на ипотека');
    createSubject('Представяне на застраховка');
    createSubject('Представяне на чл.87');
    createSubject('Представяне на допълнителни документи по кредита');*/

    /*-	Да се представи ГДД
-	Да се учреди залог
-	Да се представят документи след рефинансиране
-	Да се представи Удостоверение за степен на завършеност на финансираната сграда
-	Погасяване на суми по кредита
-	Учредяване на ипотека
-	Представяне на застраховка
-	Представяне на чл.87
-	Представяне на допълнителни документи по кредита
*/ 
/*let allowedStatuses=await Status.find({});
let workflow=createWorkflow('LA conditions after disbursement Long',allowedStatuses);
console.log();*/
async function script(){
    /*let workflow=await Workflow.findOne({});
let subject=await createSubject('Да се учреди залог',workflow,'LA');
console.log('Success!');*/
//await Comment.create({body:'sdhashjdsajhdksa',commentOwner:'63f363f199fde3d15446d09f'})
let request=await Request.findById('63f3667c9d28cf6aec9d1b0d');
//request.comments.push('63f38c29dde0c5617802a4d4')
//request.save();
let request1=await Request.findById('63f3667c9d28cf6aec9d1b0d');
console.log(request1)
}

module.exports={script}
