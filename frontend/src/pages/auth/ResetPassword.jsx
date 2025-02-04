import {
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  XCircle,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };
  const isEmailFormValid = () => isEmailValid && email;
  const isOtpFormValid = () =>
    inputRefs.current.every((input) => input && input.value);
  const isPasswordFormValid = () => {
    const passwordStrength = calculatePasswordStrength(newPassword);
    return (
      newPassword &&
      confirmPassword &&
      isPasswordMatch &&
      passwordStrength.strength >= 75
    );
  };

  useEffect(() => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(validEmail.test(email));
  }, [email]);

  useEffect(() => {
    if (newPassword) {
      setIsPasswordMatch(newPassword === confirmPassword);
    } else {
      setConfirmPassword("");
      setIsPasswordMatch(false);
    }
  }, [newPassword, confirmPassword]);

  const calculatePasswordStrength = (pass, strength = 0) => {
    if (!pass) return { strength: 0, label: "", color: "bg-gray-200" };

    if (pass.length >= 8) strength += 20;
    if (/[A-Z]/.test(pass)) strength += 20;
    if (/[a-z]/.test(pass)) strength += 20;
    if (/[0-9]/.test(pass)) strength += 20;
    if (/[@#$%^&*]/.test(pass)) strength += 20;

    if (strength <= 25) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 75)
      return { strength, label: "Medium", color: "bg-yellow-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (isEmailSubmitting) return;

    try {
      setIsEmailSubmitting(true);
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    if (isOtpSubmitting) return;

    try {
      setIsOtpSubmitting(true);
      const otpArray = inputRefs.current.map((e) => e.value);
      setOtp(otpArray.join(""));
      setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsOtpSubmitting(false);
    }
  };
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (isPasswordSubmitting) return;

    try {
      setIsPasswordSubmitting(true);
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-password",
        { email, otp, newPassword }
      );
      if (data.success) {
        toast.success(data.message);
        // Changed to redirect to login state
        navigate("/login?state=login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  const buttonClasses = `w-full flex items-center justify-center bg-yellow-300 text-black size-12 font-medium py-3 px-4 border-2 text-lg border-black rounded-[32px] 
  hover:bg-yellow-400 transition-colors cursor-pointer 
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-300`;

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br  from-yellow-100 via-green-50 to-white">
      <div className="fixed top-0 left-0 right-0 m-4">
        <Link to="/" className="flex items-center">
          <GraduationCap
            strokeWidth={2.25}
            size={40}
            className="mr-1 text-2xl font-semibold text-emerald-500"
          />
          <h1 className="text-3xl font-bold text-black">Cog</h1>
          <h1 className="text-3xl font-bold text-emerald-600 ml">Nito</h1>
        </Link>
      </div>
      {/* Email Input Field Form */}

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="p-9 m-5 rounded-4xl shadow-lg w-full sm:w-96 text-black text-sm bg-gradient-to-tr from-blue-50 via-white to-yellow-50"
        >
          <h1 className="text-2xl font-semibold text-center mb-3 gap-4">
            Reset Password
          </h1>
          <p className="text-emerald-600 text-center mb-6">
            Enter your Email id below
          </p>
          <div className="relative mb-4 gap-3">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className={`w-full pl-10 text-lg pr-12 py-2 border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                email && (isEmailValid ? "border-green-500" : "border-red-500")
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
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid email address
            </p>
          )}
          <button
            type="submit"
            disabled={!isEmailFormValid() || isEmailSubmitting}
            className={buttonClasses}
          >
            {isEmailSubmitting ? "Sending..." : "Verify Email"}
          </button>
        </form>
      )}

      {/* OTP Input Field Form */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="p-9 m-5 rounded-4xl shadow-lg w-full sm:w-96 text-black text-sm bg-gradient-to-tr from-blue-50 via-white to-yellow-50"
        >
          <h1 className="text-2xl font-semibold text-center mb-3 gap-4">
            Password Verification OTP
          </h1>
          <p className="text-emerald-600 text-center mb-6">
            Enter the 6-digit code sent to your Email id.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-gray-200 text-black text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button
            type="submit"
            disabled={!isOtpFormValid() || isOtpSubmitting}
            className={buttonClasses}
          >
            {isOtpSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* New Password Input Field Form */}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="p-9 m-5 rounded-4xl shadow-lg w-full sm:w-96 text-black text-sm bg-gradient-to-tr from-blue-50 via-white to-yellow-50"
        >
          <h1 className="text-2xl font-semibold text-center mb-3 gap-4">
            New Password
          </h1>
          <p className="text-emerald-600 text-center mb-6">
            Enter the new password below
          </p>
          <div className="relative mb-4 gap-3">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 text-lg pr-12 py-2 border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 cursor-pointer" />
              ) : (
                <Eye className="h-5 w-5 cursor-pointer" />
              )}
            </button>
          </div>
          <div>
            {newPassword && (
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  />
                </div>
                <p
                  className={`text-sm ${
                    passwordStrength.label === "Weak"
                      ? "text-red-500"
                      : passwordStrength.label === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  Password strength: {passwordStrength.label}
                </p>
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long and contain
                  uppercase, lowercase, numbers, and special characters
                </p>
              </div>
            )}
          </div>
          {/* Confirm New Password */}
          <div>
            <div className="relative mb-4 gap-3">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className={`w-full pl-10 text-lg pr-12 py-2 border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  confirmPassword &&
                  (isPasswordMatch ? "border-green-500" : "border-red-500")
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer" />
                )}
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
            <div>
              {confirmPassword && !isPasswordMatch && (
                <p className="text-sm text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!isPasswordFormValid() || isPasswordSubmitting}
            className={buttonClasses}
          >
            {isPasswordSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
