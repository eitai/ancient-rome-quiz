import { motion } from 'framer-motion';

interface HintBadgeProps {
  hint: string;
}

export const HintBadge = ({ hint }: HintBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='flex items-start gap-2 rounded-lg px-4 py-2 mb-4'
      style={{
        background: 'rgba(201,168,76,0.1)',
        border: '1px solid rgba(201,168,76,0.3)',
      }}
    >
      <span className='text-base mt-0.5'>💡</span>
      <p className='text-sm italic' style={{ fontFamily: 'Crimson Text, serif', color: '#C9A84C' }}>
        {hint}
      </p>
    </motion.div>
  );
};
