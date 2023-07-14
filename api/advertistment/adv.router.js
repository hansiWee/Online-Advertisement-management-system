const express = require('express');
const router = express.Router();
const advController = require('./adv.controller');

router.post('/', (req, res) => {
  const { startIndex = 0,  maxCount = 10, sellerId } = req.body;

  advController.getAdvertisements(startIndex, maxCount, sellerId, (error, advertisements, totalPages) => {
    if (error) {
      // Handle the error
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return the advertisements and total pages in the response
    return res.json({ advertisements, totalPages });
  });
});

module.exports = router;
