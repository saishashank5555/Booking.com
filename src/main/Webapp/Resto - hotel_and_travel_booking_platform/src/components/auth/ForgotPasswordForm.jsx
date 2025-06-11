import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { toast } from 'sonner';
import { ResetPasswordForm } from './ResetPasswordForm';

export function ForgotPasswordForm({ isOpen, onClose }) {
  const [method, setMethod] = useState(null); // null, 'email', or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  const handlePasswordReset = async () => {
    setSubmitting(true);
    try {
      if (method === 'email') {
        // Replace with actual password reset logic
        console.log('Sending password reset email to:', email);
        toast.success('Password reset email sent successfully!');
        setShowResetPasswordForm(true);
      } else if (method === 'otp') {
        console.log('Validating OTP:', otp);
        toast.success('OTP validated successfully! You can now reset your password.');
        setShowResetPasswordForm(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to proceed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    if (method === 'otp' && otpTimer > 0) {
      const timer = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [method, otpTimer]);

  return (
    <>
      <Modal isOpen={isOpen && !showResetPasswordForm} onClose={onClose} title="Forgot your password?">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <button
              className={`auth-button ${method === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMethod('email')}
            >
              Reset via Email
            </button>
            <button
              className={`auth-button ${method === 'otp' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMethod('otp')}
            >
              Reset via OTP
            </button>
          </div>

          {method === 'email' && (
            <input
              type="email"
              className="auth-input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          {method === 'otp' && (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                className="auth-input-field"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <span className="text-sm text-gray-600">Time remaining: {otpTimer}s</span>
            </div>
          )}

          {method && (
            <button
              className="auth-button"
              onClick={handlePasswordReset}
              disabled={submitting || (method === 'email' && !email) || (method === 'otp' && !otp)}
            >
              {submitting ? 'Processing...' : method === 'email' ? 'Send Password Reset Email' : 'Validate OTP'}
            </button>
          )}
        </div>
      </Modal>

      {showResetPasswordForm && <ResetPasswordForm isOpen={showResetPasswordForm} onClose={onClose} />}
    </>
  );
}
