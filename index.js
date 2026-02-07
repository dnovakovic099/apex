const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Reddit OAuth Callback Server - Ready');
});

app.get('/callback', (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    const error = req.query.error;
    
    if (error) {
        res.send(`<h1>❌ Error</h1><p>${error}</p>`);
        return;
    }
    
    if (code) {
        res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Reddit OAuth Success</title>
    <style>
        body { font-family: -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
        .code { background: #f0f0f0; padding: 20px; word-break: break-all; font-family: monospace; font-size: 14px; border-radius: 8px; margin: 20px 0; }
        h1 { color: #10b981; }
    </style>
</head>
<body>
    <h1>✅ Authorization Successful!</h1>
    <p>Copy this code and send it to Apex:</p>
    <div class="code">${code}</div>
    <p style="color: #666; font-size: 14px;">State: ${state}</p>
</body>
</html>
        `);
    } else {
        res.send('<h1>No code received</h1>');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
