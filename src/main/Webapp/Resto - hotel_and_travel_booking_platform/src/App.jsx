import React from 'react';
import { Toaster } from "sonner";
import { Navbar } from './components/layout/Navbar';
import { UserNavbar } from './components/layout/UserNavbar';
import { PartnerNavbar } from './components/layout/PartnerNavbar';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedSection } from './components/home/FeaturedSection';
import { CategoriesSection } from './components/home/CategoriesSection';
import { DestinationsSection } from './components/home/DestinationsSection';
import { Footer } from './components/layout/Footer';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { PartnerDashboard } from './components/dashboard/PartnerDashboard';
import { useAuth } from './lib/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const { user } = useAuth();

  let navbar = <Navbar />;
  if (user?.type === 'user') navbar = <UserNavbar />;
  if (user?.type === 'partner') navbar = <PartnerNavbar />;

  return (
    <div className="min-h-screen bg-gray-50">
      {navbar}
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FeaturedSection />
              <CategoriesSection />
              <DestinationsSection />
            </>
          } />
          <Route path="/dashboard" element={user?.type === 'user' ? <UserDashboard /> : <Navigate to="/" />} />
          <Route path="/partner/dashboard" element={user?.type === 'partner' ? <PartnerDashboard /> : <Navigate to="/" />} />
          {/* Placeholder routes for dropdowns */}
          <Route path="/user/profile" element={<h1 className="p-8 text-2xl font-bold">User Profile</h1>} />
          <Route path="/user/settings" element={<h1 className="p-8 text-2xl font-bold">User Settings</h1>} />
          <Route path="/partner/properties" element={<h1 className="p-8 text-2xl font-bold">My Properties</h1>} />
          <Route path="/partner/properties/add" element={<h1 className="p-8 text-2xl font-bold">Add Property</h1>} />
          <Route path="/partner/bookings" element={<h1 className="p-8 text-2xl font-bold">All Bookings</h1>} />
          <Route path="/partner/dashboard/reports" element={<h1 className="p-8 text-2xl font-bold">Partner Reports</h1>} />
          <Route path="/partner/settings" element={<h1 className="p-8 text-2xl font-bold">Partner Settings</h1>} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
