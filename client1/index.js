const express = require('express');
const expressConfig=require('./config/express.js');
const routesConfig=require('./config/routes.js');
const https = require('https');
const fs = require('fs');
const { filePathKey, filePathCert } = require('./constants.js');

start();


async function start(){

    const app = express();

    app.use(express.json());
    expressConfig(app);
    routesConfig(app);


    const credentials = {
  
        key: fs.readFileSync(filePathKey),
        cert: fs.readFileSync(filePathCert),
    }

    const server = https.createServer(credentials, app);
  
    //const IP_ADDRESS="185.123.188.135";
    const IP_ADDRESS="127.0.0.1";
    const PORT = 3000;
    console.log('Playnig')
    server.listen(PORT, IP_ADDRESS,() => {
        console.log(`Server listens on ${IP_ADDRESS+':'+PORT}!`);
    });

}