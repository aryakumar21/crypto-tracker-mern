// src/components/CoinTable.jsx
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Select, MenuItem, Button, Box
} from '@mui/material';

export default function CoinTable({ coins }) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  // console.log(setSortKey)

  const filteredCoins = coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey];
      const valB = b[sortKey];
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

  return (
    <>
      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <TextField
          label="Search by Name or Symbol"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Sort by</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="marketCap">Market Cap</MenuItem>
          <MenuItem value="change24h">24h % Change</MenuItem>
        </Select>

        <Button
          variant="outlined"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '🔼 Ascending' : '🔽 Descending'}
        </Button>
      </Box>

      {/* Coin Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Price (USD)</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>24h % Change</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoins.map((coin) => (
              <TableRow key={coin.coinId}>
                <TableCell>{coin.name}</TableCell>
                <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                <TableCell>${coin.price.toFixed(2)}</TableCell>
                <TableCell>${coin.marketCap.toLocaleString()}</TableCell>
                <TableCell
                  sx={{ color: coin.change24h >= 0 ? 'green' : 'red' }}
                >
                  {coin.change24h?.toFixed(2)}%
                </TableCell>
                <TableCell>
                  {new Date(coin.lastUpdated).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}    
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  );
}
