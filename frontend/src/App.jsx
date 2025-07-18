import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import CoinTable from './components/CoinTable';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoins = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/coins');
      setCoins(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 30 * 60 * 1000); // every 30 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          mb={4}
        >
          Crypto Tracker
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
        ) : (
          <CoinTable coins={coins} />
        )}
      </Container>
    </Box>
  );
}

export default App;
