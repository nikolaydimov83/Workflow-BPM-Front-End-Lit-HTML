const express=require('express');

const app=express();
const cors=require('cors');

const mongoose=require('mongoose');
const verifyToken=require('./middlewares/jwt')
const routesConfig=require('./routes')

const corsOptions =require('./middlewares/cors');
const UserActiveDir = require('./models/UserActiveDir');
const { createStatus } = require('./services/statusServices');
const Status = require('./models/Status');


//To DO change the connection string with the real connction string

const CONNECTION_STRING='mongodb://localhost:27017/eurobankApp2'
start();

async function start(){

    try {
        await  mongoose.connect(CONNECTION_STRING,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log('Database connected')
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }

    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(verifyToken())

    routesConfig(app);


    app.listen(3030,()=>console.log('Server listens on port 3030!'))
    //await UserActiveDir.create({email:'dsrangelova@postbank.bg',branchNumber:101,branchName:'LA'});
    //await UserActiveDir.create({email:'epaneva@postbank.bg',branchNumber:171,branchName:'Tzar Osvoboditel'});

    //await User.create({email:'ndimov1@postbank.bg'});
    /*await User.create({email:'epaneva@postbank.bg'});*/
    //let nikolay=await User.findOne({email:'epaneva@postbank.bg'}).populate('userStaticInfo');
    //console.log(nikolay.userStaticInfo);


    //createStatus('Върната в клона за отстраняване на пропуски преди написване на анекс','Branch')
    let a=await Status.find({}).populate('nextStatuses')
    a.forEach((stat1)=>stat1.nextStatuses.forEach((stat)=>{console.log(stat1.statusName+' : '+stat.statusName)}));

}
