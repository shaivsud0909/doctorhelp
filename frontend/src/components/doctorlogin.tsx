import { useState } from 'react';
import AuthOptionModal from './AuthOptionModal';

const DoctorLogin = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <h2 className="text-2xl font-semibold mb-4">I’m a Doctor</h2>
      <p className="mb-4">Manage your clinic and confirm bookings.</p>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        onClick={() => setShowModal(true)}
      >
        Login as Doctor
      </button>

      {showModal && (
        <AuthOptionModal
          userType="Doctor"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorLogin;
