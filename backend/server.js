const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/ask', async (req, res) => {
  const { question, subject } = req.body;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: `You are a helpful tutor for ${subject}.` },
      { role: 'user', content: question }
    ]
  });

  res.json({ answer: completion.choices[0].message.content });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});