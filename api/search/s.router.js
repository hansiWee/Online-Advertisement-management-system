const express = require('express');
const router = express.Router();
const SController = require('./s.controller');

router.post('/', (req, res) => {
  SController.searchAndFilter(req, res);
});

module.exports = router;
