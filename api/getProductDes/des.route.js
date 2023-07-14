const express = require('express');
const router = express.Router();
const desController = require('./des.controller');

router.post('/', desController.getDesc);

module.exports = router;
