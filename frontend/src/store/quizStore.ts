import { create } from 'zustand';
import { QuizPhase, type Question } from '../types';

interface QuizStore {
  phase: QuizPhase;
  questions: Question[];
  currentIndex: number;
  selectedAnswer: number | null;
  score: number;
  correctAnswerTimes: number[];
  questionStartTime: number | null;
  answerSelectedAt: number | null;
  questionDuration: number;

  startQuiz: (questions: Question[]) => void;
  selectAnswer: (index: number) => void;
  revealAnswer: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

const getQuestionDuration = () => {
  const param = new URLSearchParams(window.location.search).get('duration');
  return param ? parseInt(param) : 20;
};

const defaultQuizState = {
  phase: QuizPhase.Idle,
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  score: 0,
  correctAnswerTimes: [],
  questionStartTime: null,
  answerSelectedAt: null,
  questionDuration: getQuestionDuration(),
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...defaultQuizState,

  startQuiz: (questions) =>
    set({
      phase: QuizPhase.Playing,
      questions,
      currentIndex: 0,
      selectedAnswer: null,
      score: 0,
      correctAnswerTimes: [],
      questionStartTime: Date.now(),
      answerSelectedAt: null,
    }),

  selectAnswer: (index) => {
    const { phase } = get();
    if (phase !== QuizPhase.Playing) return;
    set({ selectedAnswer: index, answerSelectedAt: Date.now() });
  },

  revealAnswer: () => {
    const { questions, currentIndex, selectedAnswer, score, correctAnswerTimes, questionStartTime, answerSelectedAt } = get();
    const question = questions[currentIndex];
    const isCorrect = selectedAnswer === question.answer_index;
    const elapsed = answerSelectedAt ? answerSelectedAt - (questionStartTime ?? answerSelectedAt) : 0;

    set({
      phase: QuizPhase.ShowingAnswer,
      score: isCorrect ? score + 1 : score,
      correctAnswerTimes: isCorrect ? [...correctAnswerTimes, elapsed] : correctAnswerTimes,
    });
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    const isLast = currentIndex === questions.length - 1;

    if (isLast) {
      set({ phase: QuizPhase.Finished });
    } else {
      set({
        phase: QuizPhase.Playing,
        currentIndex: currentIndex + 1,
        selectedAnswer: null,
        answerSelectedAt: null,
        questionStartTime: Date.now(),
      });
    }
  },

  resetQuiz: () => set(defaultQuizState),
}));
