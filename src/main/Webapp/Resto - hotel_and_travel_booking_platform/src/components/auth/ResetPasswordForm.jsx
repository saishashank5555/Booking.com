import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { toast, Toaster } from 'sonner';
import { LoginForm } from './LoginForm';

const strengthLabels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];

export function ResetPasswordForm({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  const getPasswordStrength = (password) => {
    const strengthCriteria = [
      /[A-Z]/.test(password), // Uppercase
      /[a-z]/.test(password), // Lowercase
      /[0-9]/.test(password), // Number
      /[!@#$%^&*(),.?":{}|<>]/.test(password), // Special character
      password.length >= 8, // Minimum length
    ];
    return strengthCriteria.filter(Boolean).length;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setSubmitting(true);
    try {
      // Replace with actual password reset logic
      console.log('Resetting password to:', password);
      toast.success('Password reset successfully!');
      onClose(); // Close the reset password modal
      console.log('Navigation to /home triggered');
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset your password">
      <div className="flex flex-col gap-4">
        <input
          type="password"
          className="auth-input-field"
          placeholder="Enter new password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <span className="text-sm text-red-600">{passwordError}</span>}
        <div className="text-sm text-gray-600">Strength: {strengthLabels[passwordStrength]}</div>
        <ul className="text-sm text-gray-600">
          <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>At least one uppercase letter</li>
          <li className={/[a-z]/.test(password) ? "text-green-600" : "text-red-600"}>At least one lowercase letter</li>
          <li className={/[0-9]/.test(password) ? "text-green-600" : "text-red-600"}>At least one number</li>
          <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600" : "text-red-600"}>At least one special character</li>
          <li className={password.length >= 8 ? "text-green-600" : "text-red-600"}>Minimum 8 characters</li>
        </ul>
        <input
          type="password"
          className="auth-input-field"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          className="auth-button"
          onClick={handlePasswordReset}
          disabled={submitting || !password || !confirmPassword || passwordError}
        >
          {submitting ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>
      <Toaster />
    </Modal>
  );
}
