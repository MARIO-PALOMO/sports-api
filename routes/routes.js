var express = require('express');
var router = express();
var models = require('.././models');

router.get('/logs/guardar', models.logs.guardar);

module.exports = router;