interface QuizHeaderProps {
  currentIndex: number;
  total: number;
  score: number;
}

export const QuizHeader = ({ currentIndex, total, score }: QuizHeaderProps) => {
  return (
    <div className='flex items-center justify-between mb-4'>
      <span className='text-sm tracking-widest uppercase font-cinzel' style={{ color: '#8B7355' }}>
        Question {currentIndex + 1} of {total}
      </span>

      <div className='flex gap-1'>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className='w-2 h-2 rounded-full transition-colors duration-300'
            style={{
              background: i < currentIndex ? '#C9A84C' : i === currentIndex ? '#F0D080' : '#2D0A50',
              border: '1px solid #4A1080',
            }}
          />
        ))}
      </div>

      <span className='text-sm tracking-widest font-cinzel' style={{ color: '#C9A84C' }}>
        Score: {score}
      </span>
    </div>
  );
};
