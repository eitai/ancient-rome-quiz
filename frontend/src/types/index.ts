export interface Question {
  question_id: number;
  question: string;
  hint: string;
  answer_index: number;
  choices: string[];
}

export const QuizPhase = {
  Idle: 'idle',
  Playing: 'playing',
  ShowingAnswer: 'showing_answer',
  Finished: 'finished',
} as const;

export type QuizPhase = (typeof QuizPhase)[keyof typeof QuizPhase];

export type ButtonVariant = 'primary' | 'secondary' | 'answer' | 'answer-correct' | 'answer-wrong' | 'answer-selected';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  correctTime: number;
  date: string;
}
