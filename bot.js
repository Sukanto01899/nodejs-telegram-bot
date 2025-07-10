const https = require('https');
const loadEnv = require("./utils/loadEnv");
const {messageType, sendWelcome} = require("./utils/message")

loadEnv()

let offset = 0;

const api = `${process.env.API_URL}bot${process.env.TELEGRAM_TOKEN}`

function getUpdates(){
    const url = `${api}/getUpdates?timeout=10&offset=${offset}`;

    https.get(url, (res)=>{
        let data = "";

        res.on("data", chunk => data+=chunk);
        res.on('end', ()=>{
            const json = JSON.parse(data);
            if(json.result && json.result.length > 0){
                json.result.forEach(update => {
                    const message = update.message;
                    offset = update.update_id + 1;

                    if(message && message.text){
                        const text = message.text.trim();
                        const chatId = message.chat.id;

                        if(text === '/start' || text === '/start@greetingby_bot'){
                            sendWelcome(chatId)
                        }else{
                            
                            sendMessage(message.chat.id, messageType(message.from.first_name, text))
                        }
                        
                    }
                    
                });
            }
        })
        res.on("error", ()=>{})
    })
}

function sendMessage(chatId, text){
     const url = `${api}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

     https.get(url, (res)=>{
        res.on('data', ()=> {})
     })
};


setInterval(getUpdates, 1000);