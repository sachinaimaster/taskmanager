import React from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'login' | 'signup' | 'dashboard'>('home');

  const handleLogin = () => {
    setCurrentPage('login');
  };

  const handleSignup = () => {
    setCurrentPage('signup');
  };

  const handleDashboard = () => {
    console.log('Navigate to Dashboard');
    // Add navigation logic here
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'login') {
    return <LoginPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white flex items-center justify-center p-4 font-opensans">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              My Task Manager
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
            Organize your tasks, boost your productivity, and achieve your goals with ease.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 max-w-4xl mx-auto">
          <button
            onClick={handleLogin}
            className="group relative bg-white hover:bg-sky-50 text-sky-600 hover:text-sky-700 font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-sky-200 hover:border-sky-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-sky-100 group-hover:bg-sky-200 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="text-lg">Login</span>
            </div>
          </button>

          <button
            onClick={handleSignup}
            className="group relative bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-white/20 group-hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span className="text-lg">Signup</span>
            </div>
          </button>

          <button
            onClick={handleDashboard}
            className="group relative bg-white hover:bg-sky-50 text-sky-600 hover:text-sky-700 font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-sky-200 hover:border-sky-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-sky-100 group-hover:bg-sky-200 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-lg">Dashboard</span>
            </div>
          </button>
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t border-sky-100">
          <p className="text-sm text-gray-500">
            Start managing your tasks efficiently today
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;