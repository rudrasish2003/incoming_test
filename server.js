const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/incoming-sms', (req, res) => {
    const incomingMsg = req.body.Body.trim().toUpperCase();
    const fromNumber = req.body.From;

    console.log(`Incoming from ${fromNumber}: ${incomingMsg}`);

    if (incomingMsg === 'YES') {
        console.log(`✅ Candidate ${fromNumber} replied YES`);
    }

    // Optional reply to the sender
    const twiml = new MessagingResponse();
    twiml.message('Thanks for your response!');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
