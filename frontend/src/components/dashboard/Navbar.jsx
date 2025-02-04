import { useContext } from "react";
import { AppContent } from "../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

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
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      toast.success("Logged Out Successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <nav className="navbar fixed top-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="navbar-brand">
          Hey {userData ? userData.name : "Admin"}!
        </div>
        <ul className="navbar-menu flex list-none m-0 p-0">
          <div className="mx-4 flex justify-center items-center text-white bg-gray-500 w-8 h-8 border-2 border-white rounded-full relative group">
            {userData ? userData.name[0] : ""}
            <div className="absolute hidden group-hover:block top-0 right-0 text-black rounded pt-10">
              <ul className="rounded-md pr-10 list-none m-0 p-2 bg-gray-100 text-sm">
                <li className="py-1 px-2 cursor-pointer">User Profile</li>
              </ul>
            </div>
          </div>

          <LogOut
            onClick={logout}
            className="navbar-item mx-4 w-7 h-8 cursor-pointer justify-center items-center"
          />
        </ul>
      </nav>
      {!userData.isAccountVerified && (
        <div className="bg-yellow-200 text-yellow-800 text-sm p-3 flex items-center justify-between fixed top-16 left-0 w-full shadow-md">
          <span>
            ⚠️ Please verify your email address by clicking the link sent to{" "}
            <strong>{userData ? userData.email : ""}</strong>.
          </span>

          <Link
            to="/email-verify"
            className="font-semibold bg-white border-2 px-1 border-slate-500 cursor-pointer"
            onClick={sendVerifyOtp}
          >
            Verify Email
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

//Last Point(from here on we'll jump onto email verify page design)
