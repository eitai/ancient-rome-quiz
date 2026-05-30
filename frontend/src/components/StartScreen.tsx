import { motion } from 'framer-motion';
import { Button } from './ui/Button';

interface StartScreenProps {
  onStart: () => void;
  onShowLeaderboard: () => void;
}

export const StartScreen = ({ onStart, onShowLeaderboard }: StartScreenProps) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-dvh px-4 py-8'>
      <motion.div
        className='text-center max-w-lg w-full'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.div
          className='text-5xl sm:text-7xl mb-4 sm:mb-6'
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >
          🏛️
        </motion.div>

        <h1
          className='text-3xl sm:text-5xl font-black tracking-widest mb-3 uppercase font-cinzel-decorative'
          style={{
            color: '#F0D080',
            textShadow: '0 0 30px rgba(240,208,128,0.5), 0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          Ancient Rome Quiz
        </h1>

        <p className='text-lg mb-2 font-lato' style={{ color: '#E8E0D0' }}>
          Test your knowledge of the eternal city
        </p>

        <p className='text-sm mb-6 sm:mb-10 font-lato' style={{ color: '#8B7355' }}>
          5 questions · 20 seconds each · Hints included
        </p>

        <div className='w-24 h-px mx-auto mb-6 sm:mb-10' style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

        <div className='flex flex-col items-center gap-3'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button label='Start Quiz' variant='primary' size='lg' onClick={onStart} />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button label='Leaderboard' variant='secondary' size='lg' onClick={onShowLeaderboard} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
