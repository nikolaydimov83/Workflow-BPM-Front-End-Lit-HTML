const path = require('path');

const CONNECTION_STRING='mongodb://localhost:27217,localhost:27218,localhost:27219/eurobankApp2?replicaSet=myReplicaSet1'
const isPkg = typeof process.pkg !== 'undefined';
const baseDir = isPkg ? path.dirname(process.execPath) : __dirname;
const filePathCert = path.join(baseDir, 'keys', 'your-cert.pem');
const filePathKey = path.join(baseDir, 'keys', 'your-private-key.pem');

module.exports={CONNECTION_STRING,baseDir,filePathCert,filePathKey}