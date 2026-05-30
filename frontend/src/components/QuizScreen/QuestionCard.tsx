import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='rounded-xl p-5 mb-4'
      style={{
        background: 'linear-gradient(135deg, rgba(74,16,128,0.3), rgba(45,10,80,0.5))',
        border: '1px solid rgba(201,168,76,0.2)',
      }}
    >
      <h2 className='text-base sm:text-xl leading-snug text-center' style={{ fontFamily: 'Crimson Text, serif', color: '#F5F0E8' }}>
        {question}
      </h2>
    </motion.div>
  );
};
