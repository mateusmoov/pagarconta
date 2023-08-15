import fetch from 'node-fetch';
import 'dotenv/config';
import { qrCodeSpanText } from './index.js';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const API_BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

function sendMessage(chatId, text) {
  return fetch(`${API_BASE_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  });
}

// Replace with your logic to handle updates
async function handleUpdate(update) {
  if (update.message && update.message.text) {
    const chatId = update.message.chat.id;
    const messageText = update.message.text;

    if (messageText === '/agua') {
      await sendMessage(chatId, qrCodeSpanText);
    }
  }
}

// Replace with your own way of receiving updates (e.g., using a webhook)
async function pollForUpdates() {
  const response = await fetch(`${API_BASE_URL}/getUpdates`);
  const data = await response.json();

  if (data.result && data.result.length > 0) {
    for (const update of data.result) {
      await handleUpdate(update);
    }
  }
}

// Poll for updates periodically
setInterval(pollForUpdates, 1000);