import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { useQuizStore } from '../store/quizStore';
import { saveLeaderboardEntry } from '../utils/leaderboard';

interface ResultScreenProps {
  onRestart: () => void;
  onViewLeaderboard: () => void;
}

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const tenths = Math.floor((ms % 1000) / 100);
  return `${seconds}.${tenths}s`;
};

const getResultMessage = (score: number, total: number): { title: string; emoji: string } => {
  const ratio = score / total;
  if (ratio === 1) return { title: 'Perfect Score!', emoji: '🏆' };
  if (ratio >= 0.8) return { title: 'Well Done!', emoji: '⚔️' };
  if (ratio >= 0.6) return { title: 'Not Bad!', emoji: '🛡️' };
  if (ratio >= 0.4) return { title: 'Keep Practicing!', emoji: '📜' };
  return { title: 'Better Luck Next Time!', emoji: '🏺' };
};

export const ResultScreen = ({ onRestart, onViewLeaderboard }: ResultScreenProps) => {
  const { score, questions, correctAnswerTimes } = useQuizStore();
  const total = questions.length;
  const { title, emoji } = getResultMessage(score, total);

  const totalCorrectTime = correctAnswerTimes.reduce((sum, t) => sum + t, 0);

  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveLeaderboardEntry({
      name: name.trim() || 'Anonymous',
      score,
      total,
      correctTime: totalCorrectTime,
      date: new Date().toISOString(),
    });
    setSaved(true);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-dvh px-4 py-8'>
      <motion.div
        className='w-full max-w-md text-center'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'backOut' }}
      >
        <motion.div className='text-6xl mb-4' animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          {emoji}
        </motion.div>

        <h2 className='text-3xl font-black tracking-widest uppercase mb-2 font-cinzel' style={{ color: '#F0D080' }}>
          {title}
        </h2>

        <div className='w-24 h-px mx-auto my-5' style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

        <div
          className='rounded-xl p-6 mb-6'
          style={{
            background: 'linear-gradient(135deg, rgba(74,16,128,0.4), rgba(45,10,80,0.6))',
            border: '1px solid rgba(201,168,76,0.3)',
          }}
        >
          <p className='text-5xl font-black mb-1 font-cinzel' style={{ color: '#F0D080' }}>
            {score} / {total}
          </p>
          <p className='text-sm tracking-widest uppercase font-cinzel' style={{ color: '#8B7355' }}>
            Questions answered correctly
          </p>

          {correctAnswerTimes.length > 0 && (
            <div className='mt-4 pt-4' style={{ borderTop: '1px solid rgba(201,168,76,0.2)' }}>
              <p className='text-xs tracking-widest uppercase mb-1 font-cinzel' style={{ color: '#8B7355' }}>
                ⚡ Time on correct answers
              </p>
              <p className='text-2xl font-bold font-cinzel' style={{ color: '#C9A84C' }}>
                {formatTime(totalCorrectTime)}
              </p>
              <p className='text-xs mt-1' style={{ fontFamily: 'Crimson Text, serif', color: '#8B7355' }}>
                avg {formatTime(totalCorrectTime / correctAnswerTimes.length)} per correct answer
              </p>
            </div>
          )}
        </div>

        <AnimatePresence mode='wait'>
          {!showNameInput && !saved && (
            <motion.div
              key='actions'
              className='flex flex-col items-center gap-3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button label='Play Again' variant='primary' size='lg' onClick={onRestart} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button label='Add to Leaderboard' variant='secondary' size='lg' onClick={() => setShowNameInput(true)} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button label='View Leaderboard' variant='secondary' size='md' onClick={onViewLeaderboard} />
              </motion.div>
            </motion.div>
          )}

          {showNameInput && !saved && (
            <motion.div
              key='name-input'
              className='w-full flex flex-col items-center gap-3'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                placeholder='Enter your name'
maxLength={32}
                autoFocus
                className='w-full px-4 py-3 rounded-lg text-white placeholder-[#8B7355] font-lato text-base outline-none transition-all duration-200 focus:border-[#F0D080]'
                style={{ background: 'rgba(45,10,80,0.6)', border: '1px solid #C9A84C' }}
              />
              <div className='flex gap-3'>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button label='Save' variant='primary' size='md' onClick={handleSave} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button label='Cancel' variant='secondary' size='md' onClick={() => setShowNameInput(false)} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {saved && (
            <motion.div key='saved' className='flex flex-col items-center gap-3' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className='text-sm tracking-widest uppercase mb-2 font-cinzel' style={{ color: '#C9A84C' }}>
                ✓ Score saved!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button label='Play Again' variant='primary' size='lg' onClick={onRestart} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button label='View Leaderboard' variant='secondary' size='lg' onClick={onViewLeaderboard} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
