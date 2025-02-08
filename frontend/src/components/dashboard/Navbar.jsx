import { useContext } from "react";
import PropTypes from "prop-types";
import { AppContent } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LogOut, Settings, User } from "lucide-react";

const Navbar = ({ userRole = "user" }) => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

  // Get display name based on user role
  const getDisplayName = () => {
    if (!userData) return userRole;
    return userData.name || `${userData.firstName} ${userData.lastName}` || userRole;
  };

  // Get role-specific navigation items
  const getRoleSpecificMenuItems = () => {
    const menuItems = {
      Admin: [
        { label: "Settings", icon: Settings, action: () => navigate("/admin-settings") },
        { label: "Profile", icon: User, action: () => navigate("/admin-profile") }
      ],
      Faculty: [
        { label: "My Courses", icon: User, action: () => navigate("/faculty-courses") },
        { label: "Profile", icon: User, action: () => navigate("/faculty-profile") }
      ],
      Student: [
        { label: "My Learning", icon: User, action: () => navigate("/student-learning") },
        { label: "Profile", icon: User, action: () => navigate("/student-profile") }
      ]
    };


    return menuItems[userRole] || menuItems.Student;
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        toast.success("Logged Out Successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  const menuItems = getRoleSpecificMenuItems();
  const displayName = getDisplayName();

  return (
    <nav className="navbar fixed top-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white z-50">
      <div className="navbar-brand">
        Hey {displayName}!
      </div>
      
      <ul className="navbar-menu flex items-center list-none m-0 p-0">
        <div className="mx-4 flex justify-center items-center text-white bg-gray-500 w-8 h-8 border-2 border-white rounded-full relative group">
          {displayName[0]}
          <div className="absolute hidden group-hover:block top-0 right-0 text-black rounded pt-10">
            <ul className="rounded-md pr-10 list-none m-0 p-2 bg-gray-100 text-sm shadow-lg">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={item.action}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <LogOut
          onClick={logout}
          className="navbar-item mx-4 w-7 h-8 cursor-pointer hover:text-gray-300 transition-colors"
        />
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  userRole: PropTypes.string
};

export default Navbar;