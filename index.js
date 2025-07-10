const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const Database = require('./database')

const app = express();
const client = new Database();
const db = client.db('users');
const users = db.createCollection('users')

const TOKEN = '8117114223:AAFo7nVsd32wxpgrxLFCdrfjbxbR9COpX6s';
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors())

app.post('/webhook', (req, res)=>{
    const update = req.body;

    if (update.message && update.message.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Respond to /start
    if (text === '/start') {
      saveUserId(chatId)
      .then(res => sendMessage(chatId, '👋 You are in!'))
      .catch(err => console.log(err))
      sendMessage(chatId, '👋 Welcome! I am live with Webhook!');
    } else {
      sendMessage(chatId, `You said: ${text}`);
    }
  }

  res.sendStatus(200); // Respond to Telegram
})

// 🔁 Function to send message back to user
function sendMessage(chatId, text) {
  const url = `${TELEGRAM_API}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: text,
  };

  // Send POST request to Telegram API
  require('https').request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }, res => {
    res.on('data', () => {});
  }).end(JSON.stringify(data));
}


// Function to save user data to database
const saveUserId = async (userId)=>{
  try{
    const res = await users.insertOne({userId})
    if(res.success){
      console.log('user added')
    }
  }catch(error){
    throw error
  }
}

// Start Express server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});