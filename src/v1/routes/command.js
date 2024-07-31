// src/routes/command.js
const express = require('express');
const router = express.Router();
const platformSelector = require('../../utils/platformSelector');
const auth = require('../../middleware/auth');
const errorHandler = require('../../middleware/errorHandler');

router.post('/command', async (req, res, next) => {
  const { platform, command, params } = req.body;

  try {
    const handler = platformSelector(platform);
    const data = await handler.handleCommand(command, params, res);
    res.json({ status: 'success',code:200, data });
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

module.exports = router;
