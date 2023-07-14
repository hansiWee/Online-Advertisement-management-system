const express = require('express');
const router = express.Router();
const ProfController = require('./Prof.controller');

router.post('/', ProfController.getDesc);

module.exports = router;
