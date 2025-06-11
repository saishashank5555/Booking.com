import React from 'react';
import { Card, CardContent } from '../ui/Card';

export function CategoriesSection() {
  const categories = [
    {
      id: 'luxury',
      title: 'Luxury Hotels',
      description: 'Experience the finest accommodations with premium amenities',
      icon: '👑',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'budget',
      title: 'Budget Hotels',
      description: 'Comfortable stays that won\'t break the bank',
      icon: '💰',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'deals',
      title: 'Hotel Deals',
      description: 'Special offers and discounted rates',
      icon: '🏷️',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 'guest_house',
      title: 'Guest Houses',
      description: 'Cozy, home-like accommodations',
      icon: '🏠',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'service_apartment',
      title: 'Service Apartments',
      description: 'Fully furnished apartments for extended stays',
      icon: '🏢',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      id: 'activities',
      title: 'Activities & Tours',
      description: 'Discover local experiences and adventures',
      icon: '🎯',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect accommodation type for your travel style and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} hover className="overflow-hidden group cursor-pointer">
              <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center transition-transform group-hover:scale-105`}>
                <span className="text-6xl">{category.icon}</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
