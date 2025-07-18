const router = require('express').Router();
const axios = require('axios');
const Coin = require('../models/Coin');

router.get('/', async (req, res) => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';
    const { data } = await axios.get(url);

    const coins = await Promise.all(data.map(async (coin) => {
      return await Coin.findOneAndUpdate(
        { coinId: coin.id },
        {
          coinId: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          price: coin.current_price,
          marketCap: coin.market_cap,
          change24h: coin.price_change_percentage_24h,
          lastUpdated: new Date(coin.last_updated)
        },
        { upsert: true, new: true }
      );
    }));

    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
