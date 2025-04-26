import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [city, setCity] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [cityValid, setCityValid] = useState(false);
    const [specialityValid, setSpecialityValid] = useState(false);

    interface Doctor {
        _id: string;
        name: string;
        type: string;
        address: string;
    }

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [phone, setPhone] = useState('');
    const [bookingRequested, setBookingRequested] = useState(false);

    const checkCity = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cities/${city}`);
            if (response.data.found) {
                setCityValid(true);
            } else {
                alert('City not found in our database!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkSpeciality = async () => {
        if (!speciality.trim()) {
            alert('Please enter a type'); // optional: you can still call it "speciality" for user-friendliness
            return;
        }
    
        try {
            const response = await axios.get(
                `http://localhost:5000/api/doctors?city=${city}&type=${speciality}`
            );
            
            if (response.data.length > 0) {
                setSpecialityValid(true);
                setDoctors(response.data);
            } else {
                alert('No doctors found for this type in the selected city!');
                setSpecialityValid(false);
            }
        } catch (error: any) {
            console.error(error);
            
            if (error.response && error.response.status === 404) {
                const suggestions = error.response.data.suggestions;
                if (suggestions && suggestions.length > 0) {
                    alert(`No exact matches found. Did you mean: ${suggestions.join(', ')}?`);
                } else {
                    alert('No doctors found and no suggestions available.');
                }
            } else {
                alert('Error searching for doctors. Please try again.');
            }
        }
    };
    
    

    const handleBooking = () => {
        if (phone) {
            setBookingRequested(true);
            alert("Booking requested!");
        } else {
            alert("Please enter your phone number.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Home</h1>
            <p className="text-center text-gray-600 mb-6">Welcome to the home page!</p>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter City:</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                    onClick={checkCity}
                >
                    Check City
                </button>
            </div>

            {cityValid && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter Speciality:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                    />
                    <button
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
                        onClick={checkSpeciality}
                    >
                        Check Speciality
                    </button>
                </div>
            )}

            {specialityValid && (
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Available Doctors:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {doctors.map((doc) => (
                            <li key={doc._id}>
                                <span className="font-medium">{doc.name}</span> -  📍 {doc.address}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number:</label>
                        <input
                            type="tel"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button
                            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg"
                            onClick={handleBooking}
                        >
                            Request Booking
                        </button>
                    </div>
                </div>
            )}

            {bookingRequested && (
                <p className="text-green-600 font-semibold text-center mt-4">
                    Booking has been requested. We'll contact you shortly!
                </p>
            )}
        </div>
    );
};

export default Home;
