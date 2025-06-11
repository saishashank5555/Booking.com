import React from 'react';
import { clsx } from 'clsx';

export function Card({ children, className, hover = false }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200 shadow-sm',
        hover && 'hover:shadow-md transition-shadow duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={clsx('px-6 py-4 border-b border-gray-200', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={clsx('px-6 py-4', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }) {
  return (
    <div className={clsx('px-6 py-4 border-t border-gray-200', className)}>
      {children}
    </div>
  );
}

// Converted to JavaScript with JSX
function CardJSX({ title = '', content = '', className = '' }) {
  if (typeof title !== 'string' || typeof content !== 'string') {
    throw new Error('title and content must be strings');
  }
  if (typeof className !== 'string') {
    throw new Error('className must be a string');
  }

  return (
    <div className={`card ${className}`}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default CardJSX;
