'use strict';

exports.ok = function (values, res) {
    var data = {
        'status':200,
        'data':values
    };

    res.json(data);
    res.end();
};

exports.ok2 = function (values, res) {
    var data = values;

    res.json(data);
    res.end();
}