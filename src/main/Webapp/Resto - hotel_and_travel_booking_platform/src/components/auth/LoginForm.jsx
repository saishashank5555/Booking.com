import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { signInWithGoogle } from '../../lib/utils';
import { useAuth } from '../../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailOrPhone } from '../../lib/authApi';

export function LoginForm({
  userType,
  onSuccess,
  onSwitchToRegister,
  onSwitchUserType,
  onSwitchToForgotPassword,
}) {
  const [formData, setFormData] = useState({
    identifier: '', // can be email or phone
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      navigateToDashboard(user); // Navigate to the appropriate dashboard
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setErrors({ general: 'Failed to Log in with Google. Please try again.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    const { identifier, password } = formData;
    if (!identifier || !password) {
      setErrors({
        identifier: !identifier ? 'Email or phone is required' : '',
        password: !password ? 'Password is required' : '',
      });
      setIsLoading(false);
      return;
    }
    try {
      const user = await signInWithEmailOrPhone(identifier, password, userType);
      setUser(user);
      if (onSuccess) onSuccess(); // Close modal
      navigateToDashboard(user); // Navigate to the appropriate dashboard
    } catch (error) {
      console.error('Login Error:', error);
      setErrors({ general: 'Failed to log in. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToDashboard = (user) => {
    if (user.type === 'partner') {
      navigate('/partner/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <Button
        title="Log in with Google"
        onClick={handleGoogleSignIn}
        className="w-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors px-4 py-2 rounded"
        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
      >
        Log in with Google
      </Button>
      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}
        <Input
          label="Email or Phone"
          value={formData.identifier}
          onChange={e => handleInputChange('identifier', e.target.value)}
          error={errors.identifier}
          placeholder="Enter your email or phone number"
        />
        <Input
          type="password"
          label="Password"
          value={formData.password}
          onChange={e => handleInputChange('password', e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
        />
        <Button
          type="submit"
          className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold transition-colors px-4 py-2 rounded`}
          loading={isLoading}
        >
          Log In
        </Button>
      </form>

      <div className="text-center space-y-2">
        <Button
          type="button"
          title="Forgot your password?"
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          onClick={onSwitchToForgotPassword}
        >
          Forgot your password?
        </Button>

        <div className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={onSwitchToRegister}
            // need text-decoration: underline; to match the hover effect
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Dummy buttons for testing navigation */}
      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          onClick={() => {
            setUser({ type: 'user', email: 'dummyuser@example.com', name: 'Dummy User' });
            if (onSuccess) onSuccess();
            navigate('/dashboard');
          }}
        >
          Enter User Dashboard (Test)
        </Button>
        <Button
          type="button"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded"
          onClick={() => {
            setUser({ type: 'partner', email: 'dummypartner@example.com', name: 'Dummy Partner' });
            if (onSuccess) onSuccess();
            navigate('/partner/dashboard');
          }}
        >
          Enter Partner Dashboard (Test)
        </Button>
      </div>
    </div>
  );
}