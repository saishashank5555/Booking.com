import React from 'react';
import { HeroSection } from '../home/HeroSection';
import { CategoriesSection } from '../home/CategoriesSection';
import { FeaturedSection } from '../home/FeaturedSection';
import { DestinationsSection } from '../home/DestinationsSection';

export function UserDashboard() {
  return (
    <div>
      <main>
        <HeroSection />
        <FeaturedSection />
        <CategoriesSection />
        <DestinationsSection />
      </main>
    </div>
  );
}
