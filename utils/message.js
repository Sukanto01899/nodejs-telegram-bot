const https = require('https');
const loadEnv = require("./loadEnv");

loadEnv()

const api = `${process.env.API_URL}bot${process.env.TELEGRAM_TOKEN}`

const messageType = (name, message) => {
  const msg = message.trim().toLowerCase();
 
  switch (msg) {
    case "hi":
      return `Hi ${name}\nHow are you?`;
    case "hello":
      return `Hello ${name}\nHow are you doing?`;
    case "/start":
      return `Hi ${name}\n Iam ready to work. just add me to your group and make admin`;
    default:
      return`Hi ${name}\nHow can I help you?`;
  }
};

const sendWelcome = (chatId)=>{
  console.log(chatId)
  const msg = "👋 Welcome! I am your Telegram bot.\nChoose an option below:"

  const replyMarkup = {
    inline_keyboard: [
      [{text: 'More Info', url: "https://sukanto-das.vercel.app/"}],
      [{text: 'Github', url: "https://github.com/Sukanto01899"}]
    ],
  }


  const data = JSON.stringify({
    chat_id: chatId,
    text: msg,
    reply_markup: replyMarkup
  })

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  }

  const req = https.request(api + '/sendMessage', options, res=>{
    res.on('data', (x)=>{
      console.log(x)
    })
  })

  req.on('error', error => console.log(error));
  req.write(data);
  req.end()
}

module.exports = {messageType, sendWelcome};