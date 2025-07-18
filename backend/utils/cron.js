const cron = require('node-cron');
const axios = require('axios');
const History = require('../models/History');

module.exports = function startCron() {
  cron.schedule('0 * * * *', async () => {
    try {
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';
      const { data } = await axios.get(url);

      const historyDocs = data.map(coin => ({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h,
        lastUpdated: new Date(coin.last_updated)
      }));

      await History.insertMany(historyDocs);
      console.log('Hourly snapshot saved');
    } catch (err) {
      console.error('Cron job error:', err.message);
    }
  });
};
