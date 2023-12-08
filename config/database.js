const mysql=require('mysql2');

const connection =mysql.createConnection(
    {
       host:'localhost',
       user:'root',
       port:'3307',
       password:'1234',
       database:'loja' 
    }
);

module.exports=connection.promise();
