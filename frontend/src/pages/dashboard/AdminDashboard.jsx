import { useContext } from "react"
import EmailVerificationBanner from "../../components/dashboard/EmailBanner"
import Navbar from "../../components/dashboard/Navbar"
import { AppContent } from "../../contexts/AppContext"

const AdminDashboard = () => {

  const {userData} = useContext(AppContent);

  return (
    <div>
      <Navbar userRole={userData?.role} />
      <EmailVerificationBanner />
    </div>
  )
}

export default AdminDashboard
