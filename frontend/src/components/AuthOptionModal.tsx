import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthOptionModalProps {
  userType: 'Doctor';
  onClose: () => void;
}

interface UserData {
  type: string;
  _id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: UserData;
}

const AuthOptionModal: React.FC<AuthOptionModalProps> = ({ userType, onClose }) => {
  const [view, setView] = useState<'option' | 'login' | 'signup'>('option');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    phone: '',
    type: '',
    address: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      alert('🎉 Signup successful!');
      console.log(response.data);
      setView('option');
    } catch (error: any) {
      console.error('❌ Signup failed:', error.response?.data || error.message);
      alert(`Signup failed: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>('http://localhost:5000/login', loginData);
      
      try {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Set default Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        alert('🔑 Login successful!');
        
        // Redirect based on user type
        
          navigate('/dashboard', { state: { user: response.data.user } });
      
        
        onClose();
      } catch (storageError) {
        console.error('❌ Failed to store token:', storageError);
        alert('Login successful but failed to save session. Please try again.');
      }
    } catch (error: any) {
      console.error('❌ Login failed:', error.response?.data || error.message);
      alert(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl relative animate-fadeIn text-center">
        {view === 'option' && (
          <>
            <h2 className="text-2xl font-bold mb-3">{userType} Portal</h2>
            <p className="text-sm text-gray-600 mb-6">Please choose your action:</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setView('login')} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
              >
                Login
              </button>
              <button 
                onClick={() => setView('signup')} 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl transition"
              >
                Sign Up
              </button>
              <button 
                onClick={onClose} 
                className="text-sm text-gray-500 hover:text-gray-700 mt-3"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {view === 'login' && (
          <>
            <h2 className="text-xl font-bold mb-4">Login as {userType}</h2>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input 
                type="email" 
                name="email" 
                value={loginData.email} 
                onChange={handleLoginChange} 
                placeholder="Email" 
                className="border p-2 rounded" 
                required 
              />
              <input 
                type="password" 
                name="password" 
                value={loginData.password} 
                onChange={handleLoginChange} 
                placeholder="Password" 
                className="border p-2 rounded" 
                required 
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
              <button 
                type="button" 
                onClick={() => setView('option')} 
                className="text-sm text-gray-500 hover:text-gray-700 mt-2"
              >
                Back
              </button>
            </form>
          </>
        )}

        {view === 'signup' && (
          <>
            <h2 className="text-xl font-bold mb-4">Sign Up as {userType}</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Full Name" 
                className="border p-2 rounded" 
                required 
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                className="border p-2 rounded" 
                required 
              />
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Password" 
                className="border p-2 rounded" 
                required 
              />
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                placeholder="City" 
                className="border p-2 rounded" 
                required 
              />
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Phone Number" 
                className="border p-2 rounded" 
                required 
              />
              <input 
                type="text" 
                name="type" 
                value={formData.type} 
                onChange={handleChange} 
                placeholder="Type of Doctor" 
                className="border p-2 rounded" 
                required 
              />
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Clinic/Home Address" 
                className="border p-2 rounded" 
                required 
              />
              <button 
                type="submit" 
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Sign Up
              </button>
              <button 
                type="button" 
                onClick={() => setView('option')} 
                className="text-sm text-gray-500 hover:text-gray-700 mt-2"
              >
                Back
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthOptionModal;