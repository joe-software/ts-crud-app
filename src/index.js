// Javascript version

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/manage', (req, res) => {
  res.send('testing');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});