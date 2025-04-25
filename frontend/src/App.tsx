import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import DoctorLogin from './components/doctorlogin';
import Dashboard from './components/dashbord';

function App() {
  return (
    <Router>
      {/* 🍾 Add the navbar */}
      <Navbar />

      {/* Main content */}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-8">Doctor Help Portal 🩺</h1>
              </div>
            }
          />
          <Route path="/doctor-login" element={<DoctorLogin />} />
         
          <Route
            path="/dashboard" element={<Dashboard />}
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
