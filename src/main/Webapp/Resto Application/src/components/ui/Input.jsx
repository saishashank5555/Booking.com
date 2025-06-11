import React from 'react';
import { clsx } from 'clsx';

export function Input({
  label,
  error,
  icon,
  className = '',
  type = 'text',
  placeholder = '',
  value = '',
  onChange = () => {},
  ...props
}) {
  if (typeof type !== 'string' || typeof placeholder !== 'string' || typeof value !== 'string') {
    throw new Error('type, placeholder, and value must be strings');
  }
  if (typeof className !== 'string') {
    throw new Error('className must be a string');
  }
  if (typeof onChange !== 'function') {
    throw new Error('onChange must be a function');
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={clsx(
            'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors',
            icon && 'pl-10',
            error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
