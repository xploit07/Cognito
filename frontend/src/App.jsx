import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage'
import About from './pages/landing/About'
import Login from './pages/auth/Login'
import EmailVerify from './pages/auth/EmailVerify'

import ResetPassword from './pages/auth/ResetPassword'
import StudentDashboard from './pages/dashboard/StudentDashboard'
import TeacherDashboard from './pages/dashboard/TeacherDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import Contact from './pages/landing/ContactUs'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </div>
  )
}

export default App

