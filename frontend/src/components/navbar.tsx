import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">
        Doctor Help 🩺
      </div>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
          Home
        </Link>
        <Link to="/doctor-login" className="text-gray-700 hover:text-blue-600 font-medium transition">
          Login as Doctor
        </Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
           Doctor Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
