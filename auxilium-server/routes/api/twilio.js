const accountSid = 'ACa5f28cdc535ea1a5af93516f3c669cbb';
const authToken = '99cd40a90fa87efe37ba3d76d20907fd';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'L8er flex',
     from: '+12056066441',
     to: '+12678334517'
   })
  .then(message => console.log(message.sid));