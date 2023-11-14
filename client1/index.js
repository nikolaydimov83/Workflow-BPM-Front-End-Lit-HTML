const express = require('express');
const expressConfig=require('./config/express.js');
const routesConfig=require('./config/routes.js');
const https = require('https');
const fs = require('fs');
const path=require('path');
const { filePathKey, filePathCert } = require('./constants.js');

start();


async function start(){
    
    const app = express();
    app.use(express.json());
    expressConfig(app);
    routesConfig(app);
    const currentDirectory = __dirname;


    const credentials = {
  //key: fs.readFileSync('/home/nikolay/localhost.key'),
  //cert: fs.readFileSync('/home/nikolay/localhost.crt'),
        key: fs.readFileSync(filePathKey),
        cert: fs.readFileSync(filePathCert),
    }

    const server = https.createServer(credentials, app);

    const PORT = 3000;

    server.listen(PORT, () => {
        console.log(`Server listens on port ${PORT}!`);
    });

}