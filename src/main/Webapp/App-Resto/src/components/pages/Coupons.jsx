// src/pages/Home.jsx
import React from 'react';
const Coupons = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Exclusive Coupons</h1>
      <p className="text-lg text-gray-600 mb-8">Save more on your next stay! Grab these limited-time offers:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-blue-200">
          <span className="text-2xl font-bold text-blue-600 mb-2">10% OFF</span>
          <span className="text-gray-700 mb-2">On all luxury hotels</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-mono text-sm mb-2">LUX10</span>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Copy Code</button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-blue-200">
          <span className="text-2xl font-bold text-green-600 mb-2">₹500 OFF</span>
          <span className="text-gray-700 mb-2">On bookings above ₹5000</span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-mono text-sm mb-2">SAVE500</span>
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Copy Code</button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-blue-200">
          <span className="text-2xl font-bold text-purple-600 mb-2">15% OFF</span>
          <span className="text-gray-700 mb-2">On service apartments</span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded font-mono text-sm mb-2">APT15</span>
          <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">Copy Code</button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-blue-200">
          <span className="text-2xl font-bold text-orange-600 mb-2">20% OFF</span>
          <span className="text-gray-700 mb-2">On adventure tours</span>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded font-mono text-sm mb-2">ADV20</span>
          <button className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">Copy Code</button>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
