import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, AlertCircle, User, Mail } from 'lucide-react';
import { Logo } from '../Logo';

interface LoginPageProps {
  onLogin: (emailOrUsername: string, password: string) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'email' | 'username'>('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if using email or username
      if (loginType === 'email') {
        if (emailOrUsername === 'simeon.matheka@creosolutions.tech' && password === 'Projectpulse2025!') {
          onLogin(emailOrUsername, password);
        } else {
          setError('Invalid email or password');
        }
      } else {
        if ((emailOrUsername === 'projectpulse') && password === 'Projectpulse2025!') {
          onLogin(emailOrUsername, password);
        } else {
          setError('Invalid username or password');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLoginType = () => {
    setLoginType(prev => prev === 'email' ? 'username' : 'email');
    setEmailOrUsername('');
    setError('');
  };

  return (
    <div className="min-h-screen dark-theme">
      <div className="flex min-h-screen">
        {/* Left Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="flex flex-col items-center">
              <Logo isDarkMode={true} />
              <h2 className="mt-6 text-3xl font-bold text-gray-100">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Sign in to access your dashboard
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-300">
                      {loginType === 'email' ? 'Email address' : 'Username'}
                    </label>
                    <button
                      type="button"
                      onClick={toggleLoginType}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Use {loginType === 'email' ? 'username' : 'email'} instead
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {loginType === 'email' ? (
                        <Mail className="h-5 w-5 text-gray-400" />
                      ) : (
                        <User className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <input
                      id="emailOrUsername"
                      name="emailOrUsername"
                      type={loginType === 'email' ? 'email' : 'text'}
                      autoComplete={loginType === 'email' ? 'email' : 'username'}
                      required
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your username'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Sign up
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel - Background Image */}
        <div className="hidden lg:block relative flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://unsplash.com/photos/8YG31Xn4dSw/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MjgzMzk3fA&force=true&w=1920"
            alt="Happy professional in modern office"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-12">
            <blockquote className="space-y-2">
              <p className="text-lg text-gray-100">
                "This dashboard has completely changed the way we run our franchise. Real-time insights help us make smarter, faster decisions every day."
              </p>
              <footer className="text-sm text-gray-300">
                Michael, Manager
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};