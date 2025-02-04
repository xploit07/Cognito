import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            email && (isEmailValid ? 'border-green-500' : 'border-red-500')
          }`}
          required
        />
        {email && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isEmailValid ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>
      {email && !isEmailValid && (
        <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>
      )}

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 text-black font-medium py-3 px-4 border-2 border-black rounded-[32px] hover:bg-yellow-500 transition-colors"
        disabled={!isEmailValid || !password}
      >
        Sign In
      </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-white border-2 border-black text-gray-700 font-medium py-3 px-4 rounded-[32px] hover:bg-gray-50 transition-colors"
      >
        <GoogleIcon className="h-5 w-5" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        New to Cognito?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Get Started
        </button>
      </p>
    </form>
  );
};

export default LoginForm;