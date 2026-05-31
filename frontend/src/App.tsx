import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuizStore } from './store/quizStore';
import { QuizPhase } from './types';
import { getRandomQuestions } from './data/questions';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

export const App = () => {
  const { phase, startQuiz, resetQuiz } = useQuizStore();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleStart = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/questions');
      if (!res.ok) throw new Error('Server error');
      const questions = await res.json();
      startQuiz(questions);
    } catch {
      startQuiz(getRandomQuestions(5));
    }
  };

  const handleViewLeaderboard = () => {
    setShowLeaderboard(true);
    resetQuiz();
  };

  return (
    <div className='app-bg min-h-screen relative overflow-hidden'>
      <div className='app-bg-overlay absolute inset-0 pointer-events-none' />

      <AnimatePresence mode='wait'>
        {showLeaderboard && (
          <motion.div
            key='leaderboard'
            className='relative z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LeaderboardScreen onBack={() => setShowLeaderboard(false)} />
          </motion.div>
        )}

        {!showLeaderboard && phase === QuizPhase.Idle && (
          <motion.div
            key='start'
            className='relative z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StartScreen onStart={handleStart} onShowLeaderboard={() => setShowLeaderboard(true)} />
          </motion.div>
        )}

        {!showLeaderboard && (phase === QuizPhase.Playing || phase === QuizPhase.ShowingAnswer) && (
          <motion.div
            key='quiz'
            className='relative z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuizScreen />
          </motion.div>
        )}

        {!showLeaderboard && phase === QuizPhase.Finished && (
          <motion.div
            key='result'
            className='relative z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultScreen onRestart={resetQuiz} onViewLeaderboard={handleViewLeaderboard} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
