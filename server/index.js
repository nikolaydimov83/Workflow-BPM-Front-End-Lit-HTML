const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const verifyToken=require('./middlewares/jwt');
const routesConfig=require('./routes');
const corsOptions =require('./middlewares/cors');
const cron = require('node-cron');
const { replaceIapplyTable } = require('./importExternalFiles/csvImports');

const CONNECTION_STRING='mongodb://localhost:27217,localhost:27218,localhost:27219/eurobankApp2?replicaSet=myReplicaSet1'
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
    cron.schedule('16 16 * * *', async () => {
        console.log('Running replaceIapplyTable() function...');
        try {
          await replaceIapplyTable();
          console.log('IApply table replaced successfully!');
        } catch (error) {
          console.log(error.message);
        }
      }, {
        scheduled: true,
        timezone: 'Europe/Sofia' // Replace with your timezone
      });
      
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(verifyToken())

    routesConfig(app);


    app.listen(3030,()=>console.log('Server listens on port 3030!'))
    //script();

}
