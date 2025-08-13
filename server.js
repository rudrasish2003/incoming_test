const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');         // npm install node-fetch@2
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/incoming-sms', async (req, res) => {
  const incomingMsg = req.body.Body.trim().toUpperCase();
  const fromNumber = req.body.From;
  const validResponses = ['YES', 'NO'];

  if (validResponses.includes(incomingMsg)) {
    console.log(`Triggering webhook: ${fromNumber} -> ${incomingMsg}`);

    try {
      const response = await fetch('https://uat.api.truckerhire.ai/api/v1/receive-candidate-response-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: fromNumber,
          message: incomingMsg
        })
      });

      console.log(`Webhook response status: ${response.status}`);
     
    } catch (err) {
      console.error('Error calling webhook:', err);
    }
  }

  const twiml = new MessagingResponse();
  twiml.message('Thank you for your response!');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
