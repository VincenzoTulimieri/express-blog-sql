// importo mysql2
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'vincenzo22',
    database:'posts'
});

connection.connect((err)=>{
    if(err){
        throw err
    };
    console.log('Connesso a MYSQL')
});
module.exports= connection