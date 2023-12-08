const mysql=require('mysql2');

const connection =mysql.createConnection(
    {
       host:'localhost',
       user:'root',
       port:'8889',
       password:'root',
       database:'loja' 
    }
);

module.exports=connection.promise();
