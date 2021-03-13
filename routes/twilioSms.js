require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
  sendSms:function(telephone,code){

    let phonenumber = '+'+telephone

    client.messages
      .create({
         body: code,
         from: '+19563827531',
         to: phonenumber
       })
      .then(message => console.log(message))
      .catch(err => console.log(err));

  }
}
