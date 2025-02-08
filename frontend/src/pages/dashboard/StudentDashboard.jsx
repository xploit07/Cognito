import EmailVerificationBanner from "../../components/dashboard/EmailBanner"
import Navbar from "../../components/dashboard/Navbar"


const StudentDashboard = () => {
  return (
    <div>
      <Navbar userRole="Student" />
      <EmailVerificationBanner />
    </div>
  )
}

export default StudentDashboard
