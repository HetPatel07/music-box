const { Client } = require('pg') 

 
const DB = new Client({ 

    host: 'localhost', 

    port: 8080, 

    database: 'musicbox', 

    user: 'postgres', 

    password: 'postgres' 

}) 

DB.connect((error) => { 
    if (error) { 
        console.log('ERROR cold not connect to database', error.stack) 
    } else { 
        console.log('Ok connected to database') 
    } 

}) 

 module.exports = DB;

