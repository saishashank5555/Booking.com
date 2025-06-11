import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

// Mock data for hotels and activities
const featuredHotels = [
  {
    id: 1,
    name: 'Grand Palace Hotel',
    location: 'New York, USA',
    rating: 4.8,
    reviewCount: 120,
    image: '/images/hotel1.jpg',
    price: 220,
  },
  {
    id: 2,
    name: 'Seaside Resort',
    location: 'Malibu, USA',
    rating: 4.6,
    reviewCount: 98,
    image: '/images/hotel2.jpg',
    price: 180,
  },
];

const featuredActivities = [
  {
    id: 1,
    name: 'City Walking Tour',
    location: 'New York, USA',
    rating: 4.9,
    reviewCount: 75,
    image: '/images/activity1.jpg',
    price: 40,
  },
  {
    id: 2,
    name: 'Surfing Lessons',
    location: 'Malibu, USA',
    rating: 4.7,
    reviewCount: 60,
    image: '/images/activity2.jpg',
    price: 60,
  },
];

export function FeaturedSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties & Activities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional accommodations and unforgettable experiences
          </p>
        </div>

        {/* Featured Hotels */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-900">Featured Hotels</h3>
            <Button variant="outline">View All Hotels</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <Card key={hotel.id} hover className="overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-4xl">🏨</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-1">{hotel.name}</h4>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{hotel.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {hotel.location}
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      ${hotel.price}+
                    </div>
                  </div>
                  {hotel.rating && (
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill={i < Math.floor(hotel.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">({hotel.reviewCount || 0})</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Activities */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-900">Featured Activities</h3>
            <Button variant="outline">View All Activities</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredActivities.map((activity) => (
              <Card key={activity.id} hover className="overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <span className="text-white text-4xl">🎯</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-1">{activity.name}</h4>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{activity.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">
                      {activity.location}
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      ${activity.price}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Duration: {activity.duration}
                    </div>
                    {activity.rating && (
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill={i < Math.floor(activity.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">({activity.reviewCount || 0})</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
