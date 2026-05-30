import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariant, ButtonSize } from '../../types';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-[#F0D080] to-[#C9A84C] text-[#2D0A50] font-bold border-2 border-[#F0D080] hover:from-[#FFE090] hover:to-[#D9B85C] active:scale-95 shadow-[0_0_20px_rgba(201,168,76,0.4)]',
  secondary: 'bg-transparent text-[#C9A84C] border-2 border-[#C9A84C] hover:bg-[#C9A84C]/10 active:scale-95',
  answer:
    'bg-[#2D0A50]/60 text-[#F5F0E8] border-2 border-[#8B7355]/50 hover:border-[#C9A84C] hover:bg-[#4A1080]/50 active:scale-[0.98] backdrop-blur-sm',
  'answer-selected': 'bg-[#4A1080]/80 text-[#F0D080] border-2 border-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.3)]',
  'answer-correct': 'bg-emerald-900/80 text-emerald-300 border-2 border-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.4)]',
  'answer-wrong': 'bg-red-900/80 text-red-300 border-2 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-xl',
  full: 'w-full px-4 py-3 text-base',
};

export const Button = ({ label, variant = 'primary', size = 'md', fullWidth = false, icon, disabled, className = '', ...rest }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={[
        variant.startsWith('answer') ? 'font-lato' : 'font-cinzel',
        'rounded-lg transition-all duration-200 cursor-pointer select-none items-center justify-center gap-2',
        fullWidth ? 'flex' : 'inline-flex',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};
