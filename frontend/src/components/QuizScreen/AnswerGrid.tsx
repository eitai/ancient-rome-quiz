import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { ButtonVariant } from '../../types';

interface AnswerGridProps {
  choices: string[];
  selectedAnswer: number | null;
  correctIndex: number;
  isRevealing: boolean;
  onSelect: (index: number) => void;
}

const getVariant = (index: number, selectedAnswer: number | null, correctIndex: number, isRevealing: boolean): ButtonVariant => {
  if (isRevealing) {
    if (index === correctIndex) return 'answer-correct';
    if (index === selectedAnswer) return 'answer-wrong';
    return 'answer';
  }
  if (index === selectedAnswer) return 'answer-selected';
  return 'answer';
};

export const AnswerGrid = ({ choices, selectedAnswer, correctIndex, isRevealing, onSelect }: AnswerGridProps) => {
  const isFourChoices = choices.length === 4;

  return (
    <div className={['flex-1 flex gap-2', isFourChoices ? 'flex-wrap' : 'flex-col'].join(' ')}>
      {choices.map((choice, index) => {
        const variant = getVariant(index, selectedAnswer, correctIndex, isRevealing);
        const isDisabled = isRevealing;

        return (
          <motion.div
            key={index}
            className={isFourChoices ? 'w-[calc(50%-4px)]' : 'w-full'}
            style={{ flex: isFourChoices ? undefined : 1 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.07, duration: 0.25 }}
            whileHover={!isDisabled ? { scale: 1.02 } : undefined}
          >
            <Button
              label={choice}
              variant={variant}
              fullWidth
              disabled={isDisabled && variant === 'answer'}
              className='h-full'
              onClick={() => onSelect(index)}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
