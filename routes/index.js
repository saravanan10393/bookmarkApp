var express = require('express');
var router = express.Router();

/* GET home page. */
require('./folder')(router);
require('./bookmark')(router);

module.exports = router;
