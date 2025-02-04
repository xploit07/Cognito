import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

const SignUpForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    if (password) {
      setIsPasswordMatch(password === confirmPassword);
    } else {
      setConfirmPassword('');
      setIsPasswordMatch(false);
    }
  }, [password, confirmPassword]);

  const calculatePasswordStrength = (pass, strength )  => {
    if (!pass) return { strength: 0, label: '', color: 'bg-gray-200' };

    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[a-z]/.test(pass)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(pass)) strength += 25;

    if (strength <= 25) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 75) return { strength, label: 'Medium', color: 'bg-yellow-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = calculatePasswordStrength(password);

  const handleSubmit = (e) => {
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
          placeholder="Enter Password"
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

      {password && (
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${passwordStrength.color} transition-all duration-300`}
              style={{ width: `${passwordStrength.strength}%` }}
            />
          </div>
          <p className={`text-sm ${
            passwordStrength.label === 'Weak' ? 'text-red-500' :
            passwordStrength.label === 'Medium' ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            Password strength: {passwordStrength.label}
          </p>
          <p className="text-xs text-gray-500">
            Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters
          </p>
        </div>
      )}

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            confirmPassword && (isPasswordMatch ? 'border-green-500' : 'border-red-500')
          }`}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
        {confirmPassword && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            {isPasswordMatch ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>
      {confirmPassword && !isPasswordMatch && (
        <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
      )}

      <button
        type="submit"
        className="w-full bg-yellow-400 text-black font-medium py-3 px-4 border-2 border-black rounded-[32px] hover:bg-yellow-500 transition-colors"
        disabled={!isEmailValid || !isPasswordMatch || passwordStrength.strength < 75}
      >
        Sign Up
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
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Login here
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;