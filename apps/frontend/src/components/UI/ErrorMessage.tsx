import { ReactNode } from 'react';

interface ErrorMessageProps {
  children: ReactNode;
  className?: string;
}

const ErrorMessage = ({ children, className = '' }: ErrorMessageProps) => {
  return (
    <div
      className={`flex items-center justify-center text-center text-lg font-bold text-red-600 ${className}`}
    >
      <p>{children}</p>
    </div>
  );
};

export default ErrorMessage;
