const express = require("express");
const router = express.Router();
const clog = require("./controllers/log.controller");
const cuser = require("./controllers/user.controller");


router.get('/log/getAll', clog.getAll);
router.post('/log/add', clog.add);

router.get('/user/getAll', cuser.getAll);
router.post('/user/login', cuser.get);
router.post('/user/add', cuser.add);


module.exports = router;