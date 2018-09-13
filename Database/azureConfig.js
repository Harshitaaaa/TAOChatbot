var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
     userName: 'chatbot', // update me
     password: 'Tao@1234', // update me
     server: 'taochat.database.windows.net', // update me
     
     options: 
        {
           database: 'CokeBot' //update me
           , encrypt: true,
           rowCollectionOnRequestCompletion : true,
           requestTimeout : 2000
        }
   }
var connection = new Connection(config);

module.exports = connection;