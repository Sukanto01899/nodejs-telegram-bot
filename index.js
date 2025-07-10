const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const Database = require('./database');
require('dotenv').config();
const sendMessage = require('./utils/message');
const {setReminder, checkReminder} = require('./utils/reminder');

const app = express();
const client = new Database();
const db = client.db('users');
const users = db.createCollection('users')

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
    }else if(text.startsWith('/setreminder')){
      setReminder(chatId, text)
    } else {
      sendMessage(chatId, `You said: ${text}`);
    }
  }

  res.sendStatus(200); // Respond to Telegram
})


// Function to save user data to database
const saveUserId = async (userId)=>{
  try{
    const allUsers = await users.find();
    const findUser = allUsers.find(u => u.userId === userId);
    if(findUser){
      return;
    }
    const res = await users.insertOne({userId})
    if(res.success){
      console.log('user added')
    }
  }catch(error){
    throw error
  }
}


setInterval(()=>{

  checkReminder()
  .then(res => console.log(res))
  .catch(err => console.log(err))

}, 60 * 1000)

app.get('/', (req, res)=>{
  res.sendStatus(200)
})

// Start Express server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});