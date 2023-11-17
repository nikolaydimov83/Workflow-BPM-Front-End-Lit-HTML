const path = require('path');

//Check if the binary is running the server in order to assign correct base dir
const isPkg = typeof process.pkg !== 'undefined';
const baseDir = isPkg ? path.dirname(process.execPath) : __dirname;
//const filePathCert = path.join(baseDir, 'keys', 'certificate.pem');
//const filePathKey = path.join(baseDir, 'keys', 'private-key.pem');


const filePathCert = path.join(baseDir, 'keys','keys', 'your-cert.pem');
const filePathKey = path.join(baseDir, 'keys','keys', 'your-private-key.pem');
module.exports={baseDir,filePathCert,filePathKey,baseDir}