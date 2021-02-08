var mysql = require('mysql');

const conn = mysql.createConnection({
    host:'192.168.20.221',
    user:'paldi',
    password:'masihpemula',
    database:'precise'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('Mysql Connected');
});

module.exports = conn;