'use strict';

var response = require('./res');
var connection = require('./connection');

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
    connection.query('select city_code, city_name, state_id from precise.city where city_id = ?', [id], function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok2(rows, res)
        }
    });
}