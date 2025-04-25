import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  interface UserData {
    name: string;
    email: string;
    type: string;
    city: string;
  }
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, Dr. {userData?.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800">Your Information</h3>
            <p>Email: {userData?.email}</p>
            <p>Specialty: {userData?.type}</p>
            <p>Location: {userData?.city}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;