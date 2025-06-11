import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

// Mock data for destinations
const mockDestinations = [
	{
		_id: '1',
		name: 'New York City',
		city: 'New York',
		state: 'NY',
		description:
			'The city that never sleeps, with iconic landmarks and vibrant culture.',
		hotelCount: 1200,
		averagePrice: 299,
	},
	{
		_id: '2',
		name: 'San Francisco',
		city: 'San Francisco',
		state: 'CA',
		description:
			'Golden Gate Bridge, tech innovation, and beautiful bay views.',
		hotelCount: 800,
		averagePrice: 249,
	},
	{
		_id: '3',
		name: 'Miami Beach',
		city: 'Miami',
		state: 'FL',
		description:
			'Tropical paradise with beautiful beaches and vibrant nightlife.',
		hotelCount: 650,
		averagePrice: 259,
	},
	{
		_id: '4',
		name: 'Las Vegas',
		city: 'Las Vegas',
		state: 'NV',
		description:
			'Entertainment capital with world-class shows and casinos.',
		hotelCount: 450,
		averagePrice: 189,
	},
	{
		_id: '5',
		name: 'Chicago',
		city: 'Chicago',
		state: 'IL',
		description:
			'Architectural marvel with deep-dish pizza and jazz heritage.',
		hotelCount: 500,
		averagePrice: 210,
	},
	{
		_id: '6',
		name: 'Los Angeles',
		city: 'Los Angeles',
		state: 'CA',
		description:
			'Hollywood glamour, beaches, and diverse neighborhoods.',
		hotelCount: 700,
		averagePrice: 275,
	},
];

export function DestinationsSection() {
	const destinations = mockDestinations;

	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Popular Destinations
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover trending destinations loved by travelers worldwide
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{destinations.map((destination) => (
						<Card
							key={destination._id}
							hover
							className="overflow-hidden group cursor-pointer"
						>
							<div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
								<div className="w-full h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
									<span className="text-white text-5xl">🌍</span>
								</div>
								<div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200" />
								<div className="absolute bottom-4 left-4 text-white">
									<h3 className="text-xl font-bold">
										{destination.name}
									</h3>
									<p className="text-sm opacity-90">
										{destination.city}, {destination.state}
									</p>
								</div>
							</div>
							<CardContent className="p-4">
								<p className="text-gray-600 text-sm mb-3 line-clamp-2">
									{destination.description}
								</p>
								<div className="flex items-center justify-between">
									<div className="text-sm text-gray-500">
										{destination.hotelCount} properties
									</div>
									<div className="text-lg font-semibold text-blue-600">
										From ${destination.averagePrice}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center">
					<Button variant="outline" size="lg">
						View All Destinations
					</Button>
				</div>
			</div>
		</section>
	);
}
