'use strict';

module.exports = function (app) {
    var myjson = require('./controller');

    app.route('/')
        .get(myjson.index);

    app.route('/city')
        .get(myjson.allCity);

    app.route('/city/:id')
        .get(myjson.detailsCity);

    app.route('/city')
        .post(myjson.addCity);
}