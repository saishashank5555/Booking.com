// import React from 'react'
// import './index.css'; // Ensure Tailwind CSS is imported
// import Navbar from './components/Navbar';

// export default function App() {
//   return (
//     <>
//     <Navbar />
//     </>
//   );
// }





// src/App.jsx
import React from 'react';
import './index.css'; // Ensure Tailwind CSS is imported
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import LuxuryHotels from './components/pages/hotels/LuxuryHotels';
import BudgetHotels from './components/pages/hotels/BudgetHotels';
import HotelDeals from './components/pages/hotels/HotelDeals';
import FamilyGuestHouse from './components/pages/guesthouses/FamilyGuestHouse';
import PetFriendly from './components/pages/guesthouses/PetFriendly';
import CityViewApartments from './components/pages/apartments/CityViewApartments';
import PremiumSuites from './components/pages/apartments/PremiumSuites';
import AdventureTours from './components/pages/activities/AdventureTours';
import CityWalks from './components/pages/activities/CityWalks';
import Coupons from './components/pages/Coupons';
import ContactUs from './components/pages/ContactUs';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels/luxury" element={<LuxuryHotels />} />
          <Route path="/hotels/budget" element={<BudgetHotels />} />
          <Route path="/hotels/deals" element={<HotelDeals />} />
          <Route path="/guesthouses/family" element={<FamilyGuestHouse />} />
          <Route path="/guesthouses/pets" element={<PetFriendly />} />
          <Route path="/service-apartments/cityview" element={<CityViewApartments />} />
          <Route path="/service-apartments/premium" element={<PremiumSuites />} />
          <Route path="/activities/adventure" element={<AdventureTours />} />
          <Route path="/activities/citywalks" element={<CityWalks />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/about" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


