interface TimerProps {
  timeLeft: number;
  duration: number;
}

export const Timer = ({ timeLeft, duration }: TimerProps) => {
  const progress = timeLeft / duration;
  const isWarning = timeLeft <= 10;
  const isDanger = timeLeft <= 5;

  const color = isDanger ? '#EF4444' : isWarning ? '#F59E0B' : '#C9A84C';

  return (
    <div className='mb-4'>
      <div className='flex items-center justify-between mb-1'>
        <span className='text-xs tracking-widest uppercase font-cinzel' style={{ color: '#8B7355' }}>
          Time
        </span>
        <span className='text-lg font-bold tabular-nums transition-colors duration-300 font-cinzel' style={{ color }}>
          {timeLeft}s
        </span>
      </div>

      <div className='w-full h-2 rounded-full overflow-hidden' style={{ background: 'rgba(45,10,80,0.8)' }}>
        <div
          className='h-full rounded-full transition-all duration-1000 ease-linear'
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(to right, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
};
