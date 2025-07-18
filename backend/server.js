const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('./utils/cron');
 
dotenv.config();   
const app = express();  
    
app.use(cors());   
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI,
  { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
} 
)
  .then(() => console.log('MongoDB connected')) 
  .catch(err => console.error(err));

app.use('/api/coins', require('./routes/coinRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));

cron(); // start the scheduler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
