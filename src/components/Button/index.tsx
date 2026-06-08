import { ButtonHTMLAttributes } from 'react';
import './styles.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'contained' | 'warning';
};

export const Button = ({ children, variant = 'contained', ...props }: ButtonProps) => {
  return (
    <button {...props} className={variant}>
      {children}
    </button>
  );
};
