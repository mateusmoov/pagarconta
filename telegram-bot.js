import TelegramBot from 'node-telegram-bot-api';
import { qrCodeSpanText } from './index.js'
import 'dotenv/config';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

const bot = new TelegramBot(BOT_TOKEN, {polling: true})


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if(msg.text === '/agua'){
    bot.sendMessage(chatId, qrCodeSpanText);
  }
});