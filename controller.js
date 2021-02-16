'use strict';

var response = require('./res');
var connection = require('./connection');
var bcrypt = require('bcrypt');

exports.index = function (req, res){
    response.ok("Application working", res);
};

exports.allCity = function (req, res) {
    connection.query("select city_id, city_code 'Kode kota', city_name 'Nama kota', state_name 'Nama propinsi', country_name 'Negara', c.created_on 'Tanggal input', c.created_by 'User input', c.updated_on 'Tanggal update', c.updated_by 'User update' from precise.city c left join precise.state s on c.state_id = s.state_id left join precise.country co on s.country_id = co.country_id", function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res)
        }
    });
}

exports.detailsCity = function (req, res){
    let id = req.params.id;
    connection.query('select city_code, city_name, state_id from precise.city where city_id = ?', [id], 
        function(error, rows, fields){
            if(error){
                connection.log(error);
            }else{
                response.ok2(rows, res)
            }
        }
    );
}

exports.addCity = function (req, res) {
    var code = req.body.city_code;
    var name = req.body.city_name;
    var state =req.body.state_id;
    var created = req.body.created_by;

    connection.query("insert into precise.city (city_code, city_name, state_id, created_by) values(?,?,?,?)", [code, name, state, created],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok("City successfully added", res);
            }
        }
    );
}

exports.updateCity = function(req, res) {
    var id = req.body.city_id;
    var code = req.body.city_code;
    var name = req.body.city_name;
    var state =req.body.state_id;
    var updated = req.body.updated_by;

    connection.query("update precise.city set city_code=?, city_name=?, state_id=?, updated_by=? where city_id=?", [code, name, state, updated, id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok("City successfully updated", res);
            }
        }
    );
}

exports.deleteCity = function (req, res) {
    let id = req.params.id;
    connection.query("delete from precise.city where city_id = ?", [id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok("City successfully deleted", res);
            }
        }
    );
}

exports.login = function(req, res) {
    var id = req.body.user_id;
    var password = req.body.password;
    connection.query("select password from precise.users where user_id=?", [id],function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            if(rows.length != 0){
                var password_db = rows[0].password;
                //var hash_bcrypt = bcrypt.hashSync(req.body.password, 10);
                password_db = password_db.replace('$2y$', '$2b$');
                var data = {
                    pass_node : password_db,
                    // pas_node : hash_bcrypt,
                    result : bcrypt.compareSync(password, password_db)
                }
                // response.ok(data, res);
                // var result = bcrypt.compareSync(password, password_db);
                response.ok(data,res);
            }
            else{
                response.ok('Tidak ada Username yang cocok', response);
            }
        }
    });
}