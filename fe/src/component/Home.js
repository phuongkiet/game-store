import React from 'react';

export default function Home() {
  return (
    <div className="bg-gray-100">
      <section
        className="bg-cover bg-center h-screen relative"
        style={{ backgroundImage: "url('https://via.placeholder.com/1920x800')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-lg mb-8">Find the best deals on games and gift cards</p>
          <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </a>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {['Category 1', 'Category 2', 'Category 3', 'Category 4'].map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src="https://via.placeholder.com/150" alt={category} className="w-24 h-24 mb-4" />
                <a href="#" className="text-lg font-semibold">{category}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {['Product 1', 'Product 2', 'Product 3', 'Product 4'].map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img src="https://via.placeholder.com/200" alt={product} className="w-full mb-4" />
                <h3 className="text-lg font-semibold mb-2">{product}</h3>
                <p className="text-gray-700 mb-4">$19.99</p>
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Buy Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">New Arrivals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {['New Arrival 1', 'New Arrival 2', 'New Arrival 3', 'New Arrival 4'].map((arrival, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img src="https://via.placeholder.com/200" alt={arrival} className="w-full mb-4" />
                <h3 className="text-lg font-semibold mb-2">{arrival}</h3>
                <p className="text-gray-700 mb-4">$19.99</p>
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Buy Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Special Promotions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Discount Bundle', description: 'Get 20% off on selected games and gift cards. Limited time offer!' },
              { title: 'Buy One Get One Free', description: "Purchase a game and get another one for free. Don't miss out!" },
              { title: 'Exclusive Member Deals', description: 'Join our membership and unlock exclusive discounts and rewards.' },
            ].map((promo, index) => (
              <div key={index} className="bg-yellow-100 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-4">{promo.title}</h3>
                <p className="text-gray-700 mb-6">{promo.description}</p>
                <a href="#" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                  {promo.title === 'Exclusive Member Deals' ? 'Join Now' : 'Shop Now'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { quote: "Great service and amazing deals. I always find what I'm looking for!", name: 'Customer 1' },
              { quote: 'Fast delivery and excellent customer support. Highly recommend!', name: 'Customer 2' },
              { quote: 'Best prices on games and gift cards. I always check here first!', name: 'Customer 3' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <h3 className="text-lg font-semibold">- {testimonial.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
