# COGNITO LMS

COGNITO is a **Student Learning Management System (LMS)** built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). It provides role-based access for students, faculty, and admins, facilitating authentication, course management, and exam administration.

## 📌 Current Status
✅ **Authentication Module Completed** (Signup, Login, Forgot Password, Reset Password)  
🚧 **Exam Management Module Under Development**

---

## 🚀 Tech Stack

### **Frontend**:
- Vite + React.js
- Tailwind CSS
- React Router
- Axios

### **Backend**:
- Node.js & Express.js
- MongoDB (Compass)
- JWT Authentication
- bcrypt for Password Hashing

---

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
# Clone the repo
git clone https://github.com/Pratimsarkar02/cognito-lms-tool.git
cd lms-app
```

### **2️⃣ Setup the Backend**
```sh
cd backend  # Navigate to the backend directory
npm install  # Install dependencies
```

#### **Create a `.env` file inside `backend/` and add the following:**
```env
MONGODB_URI = 'mongodb://localhost:27017'
JWT_SECRET_KEY = 'secret#text'
NODE_ENV = 'development'
SMTP_USER = 'your-smtp-user-login-details'
SMTP_PASS = "your-smtp-password"
SENDER_MAIL = "sender-email"
```

```sh
# Run the backend server
npm run server
```
Backend will start on `http://localhost:5000`

---

### **3️⃣ Setup the Frontend**
```sh
cd frontend  # Navigate to the frontend directory
npm install  # Install dependencies
```

#### **Create a `.env` file inside `frontend/` and add:**
```env
VITE_BACKEND_URL = 'http://localhost:5000'
```

```sh
# Run the frontend
npm run dev
```
Frontend will start on `http://localhost:5173`

---

## 📌 Features Implemented
- ✅ User Authentication (Signup, Login, Logout, Forgot/Reset Password)
- ✅ Role-based Dashboards (Student, Faculty, Admin)
- 🚧 Exam Management System Module (In Progress)

---

## 📂 Project Structure
```
lms-app/
├── backend/
│   ├── config/          # Database & Email Configurations
│   ├── controllers/     # API Controllers
│   ├── middleware/      # Authentication Middleware
│   ├── models/         # Database Models
│   ├── routes/         # API Routes
│   ├── server.js       # Backend Entry Point
│   ├── .env            # Environment Variables (Ignored)
│   ├── package.json    # Backend Dependencies
│
├── frontend/
│   ├── public/         # Static Files
│   ├── src/           # React Components & Pages
│   ├── .env           # Environment Variables (Ignored)
│   ├── package.json   # Frontend Dependencies
│   ├── vite.config.js # Vite Configuration
│
├── .gitignore         # Excludes node_modules, .env, and build files
├── README.md          # Project Documentation
```

---

## 📖 Usage
1. Open `http://localhost:5173`
2. Create an account or log in
3. Depending on your role, you’ll be redirected to the **Student, Faculty, or Admin dashboard**
4. Faculty/Admin can manage courses, students, and exams (Coming Soon)

---

## 📜 `.gitignore` Configuration
A single `.gitignore` file at the project root excludes unnecessary files:
```gitignore
# Node.js Dependencies
node_modules/

# Environment Variables
*.env

# Build Files
dist/
.cache/
.vscode/
frontend/.vite/

# Logs and Debugging Files
logs/
debug.log
error.log

# OS-Specific Files
.DS_Store
Thumbs.db
```

---

## 🤝 Contributing
Want to contribute? Feel free to fork the repo, create a feature branch, and submit a pull request!

---


### 📩 Contact
For any queries or suggestions, feel free to reach out!
- **Email**: help.cognito@gmail.com
- **GitHub**: [Pratimsarkar02](https://github.com/Pratimsarkar02)

