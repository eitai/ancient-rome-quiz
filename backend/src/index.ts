import express from 'express';
import cors from 'cors';
import { getRandomQuestions } from './data/questions.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/questions', (_req, res) => {
  const questions = getRandomQuestions(5);
  res.json(questions);
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT);
