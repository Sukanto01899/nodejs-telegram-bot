const TOKEN = process.env.TOKEN;
const TELEGRAM_API = `${process.env.API_URL}/bot${TOKEN}`;


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


module.exports = sendMessage