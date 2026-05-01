const express = require('express');
const path = require('path');
const Unblocker = require('unblocker');

const app = express();

// Serve static files (homepage UI)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy middleware
const unblocker = new Unblocker({ prefix: '/proxy/' });
app.use(unblocker);

// Homepage fallback (if someone goes to "/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Ballz proxy running on port ${PORT}`);
});

// WebSocket support
server.on('upgrade', unblocker.onUpgrade);
