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

module.exports = messageType;