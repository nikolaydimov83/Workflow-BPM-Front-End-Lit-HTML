const express = require('express');
const expressConfig=require('./config/express.js');
const routesConfig=require('./config/routes.js');



start();


async function start(){
const app = express();
    expressConfig(app);
    routesConfig(app);
    app.listen(3000,()=>console.log('Server listens on port 3000'));

}