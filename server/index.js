const express=require('express');

const app=express();
const cors=require('cors');

const mongoose=require('mongoose');
const verifyToken=require('./middlewares/jwt');
const routesConfig=require('./routes');
const corsOptions =require('./middlewares/cors');
const { script } = require('./supportScripts');

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
    //script();

}
