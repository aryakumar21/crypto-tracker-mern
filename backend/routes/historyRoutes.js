const router = require('express').Router();
const History = require('../models/History');
const Coin = require('../models/Coin');

router.post('/', async (req, res) => {
  try {
    const coins = await Coin.find();

    const historyRecords = await History.insertMany(coins.map(coin => ({
      ...coin.toObject(),
      _id: undefined // remove _id to avoid conflict
    })));

    res.json({ message: 'History stored', data: historyRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:coinId', async (req, res) => {
  try {
    const records = await History.find({ coinId: req.params.coinId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
