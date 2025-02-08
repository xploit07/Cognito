import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContent } from "../../contexts/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailVerificationBanner = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContent);

  // Only show banner if user exists and email is not verified
  if (!userData || userData.isAccountVerified) {
    return null;
  }

  const sendVerifyOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success("Email Verification OTP sent to your mail.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to send verification email");
    }
  };

  return (
    <div className="bg-yellow-200 text-yellow-800 text-sm p-3 flex items-center justify-between fixed top-16 left-0 w-full shadow-md z-40">
      <span>
        ⚠️ Please verify your email address by clicking the link sent to{" "}
        <strong>{userData.email}</strong>.
      </span>

      <Link
        to="/email-verify"
        onClick={sendVerifyOtp}
        className="font-semibold bg-white border-2 px-3 py-1 border-slate-500 rounded hover:bg-gray-50 transition-colors cursor-pointer"
      >
        Verify Email
      </Link>
    </div>
  );
};

export default EmailVerificationBanner;