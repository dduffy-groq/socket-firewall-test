/**
 * Socket Firewall Test Application
 * 
 * This is a test application that intentionally includes
 * protestware dependencies to test Socket security blocking.
 */

const express = require('express');
const _ = require('lodash');

// NOTE: These imports would fail in practice because the packages
// are corrupted protestware - but they're here to test Socket detection
// const colors = require('colors');
// const faker = require('faker');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Socket Firewall Test',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/data', (req, res) => {
  const data = _.times(10, (i) => ({
    id: i + 1,
    value: _.random(1, 100)
  }));
  res.json(data);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

