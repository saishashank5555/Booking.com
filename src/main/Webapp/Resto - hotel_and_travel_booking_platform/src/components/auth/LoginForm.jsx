import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function LoginForm({
  userType,
  onSuccess,
  onSwitchToRegister,
  onSwitchUserType,
  onSwitchToForgotPassword,
}) {
  // TODO: Replace with Firebase logic
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement Firebase sign-in here
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* User Type Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => onSwitchUserType('user')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${userType === 'user'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          Guest
        </button>
        <button
          type="button"
          onClick={() => onSwitchUserType('partner')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${userType === 'partner'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          Hotel Partner
        </button>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          placeholder="Enter your email"
        />

        <Input
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
        />
      </form>

      <div className="text-center space-y-2">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          onClick={onSwitchToForgotPassword}
        >
          Forgot your password?
        </button>

        <div className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
