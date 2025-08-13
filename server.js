const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/incoming-sms', (req, res) => {
    const incomingMsg = req.body.Body.trim().toUpperCase();
    const fromNumber = req.body.From;

    if (incomingMsg === 'YES') {
        console.log(fromNumber); // ✅ Only log candidate's number
    }

    // Optional reply
    const twiml = new MessagingResponse();
    twiml.message('Thanks for your response!');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
