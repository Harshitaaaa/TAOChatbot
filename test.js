//console.log(module);

const connection = require('./Database/azureConfig');
const test = require('./Database/sqltest');
//console.log(connection);
var query = "select * from distributers";
test(query,(rows)=>{
    console.log(rows);
})