import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import DoctorLogin from './components/doctorlogin';
import Dashboard from './components/dashbord';
import Home from './components/home';

function App() {
  return (
    <Router>
 
      <Navbar />


      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
