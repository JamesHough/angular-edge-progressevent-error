var express = require('express');
var router = express.Router();
var SampleService = require('../services/sample-service');

/* GET nothing. */
router.get('/', async function(req, res, next) {
  res.status(404).json({ error: 'Invalid ID.' });
});

/* POST something */
router.post('/', async (req, res, next) => {
  const body = req.body;

  try {
    const sample = await SampleService.create(body);

    return res.status(201).json({ sample: sample });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }

    // unexpected error
    return next(err);
  }
});

/* GET a Sample by id */
router.get('/:id', async (req, res, next) => {
  try {
    const sample = await SampleService.retrieve(req.params.id);

    return res.json({ sample: sample });
  } catch (err) {
    // unexpected error
    return next(err);
  }
});

/* PUT the updated Sample by id */
router.put('/:id', async (req, res, next) => {
  try {
    const sample = await SampleService.update(req.params.id, req.body);

    return res.json({ sample: sample });
  } catch (err) {
    // unexpected error
    return next(err);
  }
});

/* DELETE the Sample from the Sample list by id */
router.delete('/:id', async (req, res, next) => {
  try {
    const sample = await SampleService.delete(req.params.id);

    return res.json({ success: true });
  } catch (err) {
    // unexpected error
    return next(err);
  }
});

module.exports = router;
