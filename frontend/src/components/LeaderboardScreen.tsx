import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { getLeaderboard } from '../utils/leaderboard';
import type { LeaderboardEntry } from '../types';

interface LeaderboardScreenProps {
  onBack: () => void;
}

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const tenths = Math.floor((ms % 1000) / 100);
  return `${seconds}.${tenths}s`;
};

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const RANK_COLORS: Record<number, string> = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

const RANK_LABELS: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

const getRankColor = (rank: number): string => RANK_COLORS[rank] ?? '#D4C5A9';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

interface RowProps {
  entry: LeaderboardEntry;
  rank: number;
}

const LeaderboardRow = ({ entry, rank }: RowProps) => {
  const rankColor = getRankColor(rank);
  const isTop3 = rank <= 3;

  return (
    <motion.div
      variants={rowVariants}
      className='flex items-center gap-4 px-4 py-3 rounded-xl'
      style={{
        background: isTop3 ? 'linear-gradient(135deg, rgba(74,16,128,0.6), rgba(45,10,80,0.8))' : 'rgba(45,10,80,0.4)',
        border: `1px solid ${isTop3 ? rankColor + '55' : 'rgba(201,168,76,0.15)'}`,
      }}
    >
      <div className='w-8 text-center text-lg font-black shrink-0 font-cinzel' style={{ color: rankColor }}>
        {RANK_LABELS[rank] ?? rank}
      </div>

      <div className='flex-1 min-w-0'>
        <p className='text-sm font-bold truncate font-cinzel' style={{ color: rankColor }}>
          {entry.name}
        </p>
        <p className='text-xs font-lato' style={{ color: '#8B7355' }}>
          {formatDate(entry.date)}
        </p>
      </div>

      <div className='text-right shrink-0'>
        <p className='text-lg font-black font-cinzel' style={{ color: '#F0D080' }}>
          {entry.score}/{entry.total}
        </p>
        {entry.correctTime > 0 && (
          <p className='text-xs font-lato' style={{ color: '#8B7355' }}>
            ⚡ {formatTime(entry.correctTime)}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const SCROLL_THRESHOLD = 7;

export const LeaderboardScreen = ({ onBack }: LeaderboardScreenProps) => {
  const entries = getLeaderboard();
  const shouldScroll = entries.length > SCROLL_THRESHOLD;

  return (
    <div className='flex flex-col items-center justify-center min-h-dvh px-4 py-8'>
      <motion.div
        className='w-full max-w-md flex flex-col'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className='text-center mb-8'>
          <div className='text-5xl mb-3'>🏆</div>
          <h2
            className='text-3xl font-black tracking-widest uppercase font-cinzel'
            style={{
              color: '#F0D080',
              textShadow: '0 0 20px rgba(240,208,128,0.4)',
            }}
          >
            Leaderboard
          </h2>
          <div className='w-24 h-px mx-auto mt-4' style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />
        </div>

        {entries.length === 0 ? (
          <motion.div
            className='text-center py-12 rounded-xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(45,10,80,0.4)',
              border: '1px solid rgba(201,168,76,0.15)',
            }}
          >
            <p className='text-lg font-cinzel' style={{ color: '#8B7355' }}>
              No entries yet.
            </p>
            <p className='text-sm mt-2 font-lato' style={{ color: '#6B5540' }}>
              Be the first!
            </p>
          </motion.div>
        ) : (
          <div className={shouldScroll ? 'overflow-y-auto pr-1' : ''} style={shouldScroll ? { maxHeight: '55dvh' } : undefined}>
            <motion.div className='flex flex-col gap-2 mb-2' variants={containerVariants} initial='hidden' animate='visible'>
              {entries.map((entry, i) => (
                <LeaderboardRow key={`${entry.name}-${entry.date}`} entry={entry} rank={i + 1} />
              ))}
            </motion.div>
          </div>
        )}

        <div className='flex justify-center mt-8'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button label='Back' variant='secondary' size='lg' onClick={onBack} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
