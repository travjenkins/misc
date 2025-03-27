const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  res.status(200).send('Webhook received successfully');
});

app.get('/', (req, res) => {
  res.send('Webhook server is running');
});

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});