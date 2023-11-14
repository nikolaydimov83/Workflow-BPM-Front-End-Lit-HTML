const debug = require('debug')('cors-debug');
module.exports =  {
    origin: 'https://localhost:3000',
    optionsSuccessStatus: 200, 
    methods:['GET', 'PUT', 'POST','DELETE','HEAD','OPTIONS'],
    allowedHeaders:['Content-Type', 'X-Authorization']
  }

