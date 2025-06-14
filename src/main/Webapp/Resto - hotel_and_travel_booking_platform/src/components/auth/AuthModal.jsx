import React from 'react';
import { Modal } from '../ui/Modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { PartnerRegistrationForm } from './PartnerRegistrationForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export function AuthModal({
  isOpen,
  onClose,
  mode,
  userType,
  onModeChange,
  onUserTypeChange,
}) {
  const getTitle = () => {
    if (mode === 'login') {
      return userType === 'partner' ? 'Partner Log In' : 'Log In';
    }
    if (mode === 'forgotPassword') {
      return 'Forgot your password?';
    }
    return userType === 'partner' ? 'Partner Registration' : 'Create Account';
  };

  const renderForm = () => {
    if (mode === 'login') {
      return (
        <LoginForm
          userType={userType}
          onSuccess={onClose}
          onSwitchToRegister={() => onModeChange('register')}
          onSwitchToForgotPassword={() => onModeChange('forgotPassword')}
          onSwitchUserType={onUserTypeChange}
        />
      );
    }

    if (mode === 'forgotPassword') {
      return (
        <ForgotPasswordForm
          isOpen={isOpen}
          onClose={onClose}
        />
      );
    }

    if (userType === 'partner') {
      return (
        <PartnerRegistrationForm
          onSuccess={onClose}
          onSwitchToLogin={() => onModeChange('login')}
          onSwitchToUser={() => onUserTypeChange('user')}
        />
      );
    }

    return (
      <RegisterForm
        onSuccess={onClose}
        onSwitchToLogin={() => onModeChange('login')}
        onSwitchToPartner={() => onUserTypeChange('partner')}
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      size="md"
    >
      {renderForm()}
    </Modal>
  );
}
