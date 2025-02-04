import EmailVerificationBanner from "../../components/dashboard/EmailBanner"
import Navbar from "../../components/dashboard/Navbar"


const TeacherDashboard = () => {
  return (
    <div>
      <Navbar userRole="Faculty" />
      <EmailVerificationBanner />
    </div>
  )
}

export default TeacherDashboard
