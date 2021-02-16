var connection = require('../connection');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
var salt = bcrypt.genSalt(10);

exports.addUser = function(req, res) {
    var post = {
        user_id : req.body.user_id,
        password : bcrypt(req.body.password, 10)
    };
    
    var query = "select user_id from ?? where ??";
    var table = ["users", "email", post.user_id];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "insert into ?? set ?";
                var table = ["users"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                });
            }else{
                response.ok("User sudah ada");
            }
        }
    });
}