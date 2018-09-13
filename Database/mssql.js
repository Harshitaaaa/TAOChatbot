var sql = require('mssql');
var config = {
    user: 'chatbot',
    password: 'Tao@1234',
    server: 'taochat.database.windows.net', 
    database: 'CokeBot',
    options: {
        encrypt: true
      }
};

// sql.connect(config).then(pool=>{
//     return pool.request()
//         .query('select * from Distributers')
// }).then(result=>{
//     console.log(result);
//     module.exports = result;
// });

module.exports = (async function getData() {
    try {
      console.log("sql connecting......")
      let pool = await sql.connect(config)
      let result = await pool.request()
        .query('select * from Distributers')  
  
      //console.log(result)
      return result;
  
    } catch (err) {
      console.log(err);
    }
  })();

  async function getDataa(){
    console.log(await test);
} 


