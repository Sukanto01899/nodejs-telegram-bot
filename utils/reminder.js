const db = require("../config/db");
const sendMessage = require("./message");

const reminder = db.createCollection("reminder");
const users = db.createCollection("users");

const setReminder = (userId, command) => {
  const parts = command.split(" ");

  if (parts.length < 2 || !/^\d{2}:\d{2}$/.test(parts[1])) {
    return sendMessage(
      userId,
      "❌ Invalid format. Use /setreminder HH:MM (24-hour format)"
    );
  }

  const time = parts[1];
  reminder
    .insertOne({ time })
    .then((res) => {
      if (res.success) {
        sendMessage(
          userId,
          "Reminder setting done!"
        );
      }
    })
    .catch((err) => console.log(err));
};

const checkReminder = async () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  try {
    const allReminder = await reminder.find();
    const allUsers = await users.find();

    allReminder.forEach((remind) => {
      if (currentTime === remind.time) {
        allUsers.forEach((user) => {
          sendMessage(user.chatId, "Hay,\n This is a reminder");
        });
      }
    });

    return { message: "All reminder already sent!" };
  } catch (error) {
    return error;
  }
};

module.exports = { setReminder, checkReminder };
