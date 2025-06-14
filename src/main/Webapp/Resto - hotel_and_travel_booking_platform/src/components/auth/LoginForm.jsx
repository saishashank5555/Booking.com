import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { signInWithGoogle } from '../../lib/utils';
import { useAuth } from '../../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from '../../lib/api/auth'; // Adjust the import based on your API structureimport
import { UserDashboard } from '../dashboard/UserDashboard';
import { PartnerDashboard } from '../dashboard/PartnerDashboard';
import { UserNavbar } from '../layout/UserNavbar';
import { PartnerNavbar } from '../layout/PartnerNavbar';

export function LoginForm({
  userType,
  onSuccess,
  onSwitchToRegister,
  onSwitchUserType,
  onSwitchToForgotPassword,
}) {
  const [formData, setFormData] = useState({
    email: '',
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
    const { email, password } = formData;
    if (!email || !password) {
      setErrors({
        email: !email ? 'Email is required' : '',
        password: !password ? 'Password is required' : '',
      });
      setIsLoading(false);
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(email, password);
      setUser(user);
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
      navigate('/partner/PartnerNavbar'); // Navigate to PartnerDashboard
    } else {
      navigate('/user/UserNavbar'); // Navigate to UserDashboard
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

      <Button
        onClick={handleSubmit} // Use onClick to handle form submission
        disabled={isLoading} // Disable button if loading
        loading={isLoading} // Show loading state
        title="Log In"
        // Use type="button" to prevent default form submission behavior
        type="submit" // Use type="submit" to handle form submission
        // className="w-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors px-4 py-2 rounded"
        className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold transition-colors px-4 py-2 rounded`}
      >
        {/* Show loading state */}
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
    </div>
  );
}