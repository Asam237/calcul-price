import { ReactNode } from 'react';
import cn from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card = ({ children, className, hover = true, glass = true }: CardProps) => {
  return (
    <div className={cn(
      'rounded-2xl p-6 transition-all duration-500',
      glass ? 'glass-card' : 'bg-white shadow-xl',
      hover && 'card-hover',
      className
    )}>
      {children}
    </div>
  );
};