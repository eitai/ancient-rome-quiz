import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '../../store/quizStore';
import { QuizPhase } from '../../types';
import { useTimer } from '../../hooks/useTimer';
import { QuizHeader } from './QuizHeader';
import { QuestionCard } from './QuestionCard';
import { HintBadge } from './HintBadge';
import { Timer } from './Timer';
import { AnswerGrid } from './AnswerGrid';

const REVEAL_ANSWER_DURATION = 1000;

export const QuizScreen = () => {
  const { phase, questions, currentIndex, selectedAnswer, score, questionDuration, selectAnswer, revealAnswer, nextQuestion } = useQuizStore();

  const [hintForCurrentQuestion, setHintForCurrentQuestion] = useState<number | null>(null);
  const showHint = hintForCurrentQuestion === currentIndex;

  const question = questions[currentIndex];
  const isRevealing = phase === QuizPhase.ShowingAnswer;

  const timeLeft = useTimer({
    duration: questionDuration,
    showHintAtSecondsLeft: Math.floor(questionDuration / 2),
    currentQuestionIndex: currentIndex,
    onHint: () => setHintForCurrentQuestion(currentIndex),
    onQuestionTimeExpire: () => {
      if (phase === QuizPhase.Playing) revealAnswer();
    },
  });

  useEffect(() => {
    if (!isRevealing) return;
    const timeout = setTimeout(() => nextQuestion(), REVEAL_ANSWER_DURATION);
    return () => clearTimeout(timeout);
  }, [isRevealing, nextQuestion]);

  if (!question) return null;

  return (
    <div className='flex flex-col h-dvh px-4 py-3 sm:py-6 max-w-xl mx-auto w-full overflow-hidden'>
      <QuizHeader currentIndex={currentIndex} total={questions.length} score={score} />

      <Timer timeLeft={timeLeft} duration={questionDuration} />

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          className='flex flex-col flex-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <QuestionCard question={question.question} />

          <AnimatePresence>{showHint && <HintBadge hint={question.hint} />}</AnimatePresence>

          <AnswerGrid
            choices={question.choices}
            selectedAnswer={selectedAnswer}
            correctIndex={question.answer_index}
            isRevealing={isRevealing}
            onSelect={selectAnswer}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
