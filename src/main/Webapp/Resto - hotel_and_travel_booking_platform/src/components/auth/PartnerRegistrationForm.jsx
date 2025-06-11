import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function PartnerRegistrationForm({
  onSuccess,
  onSwitchToUser,
}) {
  // TODO: Replace with Firebase logic
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: 'hotel',
    contactPerson: '',
    businessPhone: '',
    businessEmail: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    businessLicense: '',
    taxId: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!formData.businessPhone) {
      newErrors.businessPhone = 'Business phone is required';
    }

    if (!formData.businessEmail) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid business email';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      // TODO: Implement Firebase registration for partners here

      onSuccess();
    } catch (error) {
      setErrors({ general: 'Failed to create partner account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          1
        </div>
        <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          2
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">
          {currentStep === 1 ? 'Account Information' : 'Business Details'}
        </h3>
        <p className="text-sm text-gray-600">
          {currentStep === 1 
            ? 'Create your partner account' 
            : 'Tell us about your business'
          }
        </p>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      {currentStep === 1 ? (
        <div className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            placeholder="your@email.com"
          />

          <Input
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            placeholder="Create a strong password"
          />

          <Input
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />

          <Button
            type="button"
            onClick={handleNext}
            className="w-full"
          >
            Next Step
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Business Name"
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            error={errors.businessName}
            placeholder="Your Hotel Name"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Type
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
              <option value="hotel">Hotel</option>
              <option value="guest_house">Guest House</option>
              <option value="service_apartment">Service Apartment</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Contact Person"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              error={errors.contactPerson}
              placeholder="John Doe"
            />
            <Input
              type="tel"
              label="Business Phone"
              value={formData.businessPhone}
              onChange={(e) => handleInputChange('businessPhone', e.target.value)}
              error={errors.businessPhone}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <Input
            type="email"
            label="Business Email"
            value={formData.businessEmail}
            onChange={(e) => handleInputChange('businessEmail', e.target.value)}
            error={errors.businessEmail}
            placeholder="info@yourhotel.com"
          />

          <Input
            label="Street Address"
            value={formData.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            error={errors.street}
            placeholder="123 Main Street"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              error={errors.city}
              placeholder="New York"
            />
            <Input
              label="State"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              error={errors.state}
              placeholder="NY"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              error={errors.zipCode}
              placeholder="10001"
            />
            <Input
              label="Country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              error={errors.country}
              placeholder="United States"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Business License (Optional)"
              value={formData.businessLicense}
              onChange={(e) => handleInputChange('businessLicense', e.target.value)}
              placeholder="License number"
            />
            <Input
              label="Tax ID (Optional)"
              value={formData.taxId}
              onChange={(e) => handleInputChange('taxId', e.target.value)}
              placeholder="Tax identification"
            />
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1"
              loading={isLoading}
            >
              Create Partner Account
            </Button>
          </div>
        </form>
      )}

      <div className="text-center space-y-2">
        <div className="text-sm text-gray-600">
          Looking to book a stay?{' '}
          <button
            type="button"
            onClick={onSwitchToUser}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Create guest account
          </button>
        </div>
      </div>
    </div>
  );
}
