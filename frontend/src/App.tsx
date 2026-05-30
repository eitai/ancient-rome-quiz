import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuizStore } from './store/quizStore';
import { QuizPhase } from './types';
import { getRandomQuestions } from './data/questions';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

const BACKGROUND_STYLE = {
  background: 'radial-gradient(ellipse at top, #2D0A50 0%, #1A0A2E 50%, #0D0618 100%)',
};

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
    <div className='min-h-screen relative overflow-hidden' style={BACKGROUND_STYLE}>
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(74,16,128,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(45,10,80,0.2) 0%, transparent 50%)',
        }}
      />

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
