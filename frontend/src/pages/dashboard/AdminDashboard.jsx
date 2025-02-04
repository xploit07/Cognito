import EmailVerificationBanner from "../../components/dashboard/EmailBanner"
import Navbar from "../../components/dashboard/Navbar"

const AdminDashboard = () => {
  return (
    <div>
      <Navbar userRole="Admin" />
      <EmailVerificationBanner />
    </div>
  )
}

export default AdminDashboard
