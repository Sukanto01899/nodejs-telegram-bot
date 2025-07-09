const messageType = (name, message) => {
  const msg = message.trim().toLowerCase();
 
  switch (msg) {
    case "hi":
      return `Hi ${name}\nHow are you?`;
    case "hello":
      return `Hello ${name}\nHow are you doing?`;
    default:
      return`Hi ${name}\nHow can I help you?`;
  }
};

module.exports = messageType;