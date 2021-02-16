var express = require('express');
var auth = require('./auth');
var router = express.Router();

router.post('/user', auth.addUser);

module.exports = router;