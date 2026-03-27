require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const OpenAI = require("openai");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const userText = msg.text;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userText }],
    });

    const reply = response.choices[0].message.content;
    bot.sendMessage(chatId, reply);

  } catch (error) {
    console.log(error);
  }
});
