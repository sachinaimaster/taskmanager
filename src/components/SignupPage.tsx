import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignupPageProps {
  onBack: () => void;
  onSignupSuccess: () => void;
  onNavigateToLogin: () => void;
}

function SignupPage({ onBack, onSignupSuccess, onNavigateToLogin }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { error } = await signUp(email, password, name);
    
    if (error) {
      setError(error?.message || 'An unexpected authentication error occurred. Please try again.');
      setLoading(false);
    } else {
      setSuccess('Account created successfully! You can now login.');
      setLoading(false);
      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      // Redirect to login after a short delay
      setTimeout(() => {
        onSignupSuccess();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white flex items-center justify-center p-4 font-opensans">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-sky-600 hover:text-sky-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Signup Form Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-sky-100">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join us today! Please fill in your details to get started.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                {success}
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-0 outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-0 outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-0 outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            {/* Signup Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {loading ? 'Creating account...' : 'Signup'}
              </button>
            </div>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center">
            <div className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-sky-600 hover:text-sky-700 font-medium transition-colors duration-200"
              >
                Login here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;