import React from 'react';
import { Link } from 'react-router-dom';
import KHM from '../assest/KHM.png';

const AboutUs = () => {
  return (
    <div className="min-h-screen pt-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About KHM Electronics</h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Electronics Store" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2023, KHM Electronics has quickly become a trusted name in the world of e-commerce for cutting-edge electronics. 
              What began as a small startup with a passion for technology has grown into a premier online destination for tech enthusiasts.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We pride ourselves on offering the latest gadgets, electronics, and tech accessories at competitive prices, 
              all while providing exceptional customer service and fast, reliable shipping.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex-1 min-w-[200px]">
                <h3 className="text-xl font-bold text-purple-600 mb-2">10,000+</h3>
                <p className="text-gray-600">Products Available</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex-1 min-w-[200px]">
                <h3 className="text-xl font-bold text-purple-600 mb-2">500K+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex-1 min-w-[200px]">
                <h3 className="text-xl font-bold text-purple-600 mb-2">24/7</h3>
                <p className="text-gray-600">Customer Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl mb-6">
            To make cutting-edge technology accessible to everyone by providing high-quality electronics at affordable prices, 
            backed by unparalleled customer service and expert advice.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600">
                ✓
              </div>
              <span>Quality Products</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600">
                ✓
              </div>
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600">
                ✓
              </div>
              <span>Secure Payments</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose KHM Electronics?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3">Authentic Products</h3>
              <p className="text-gray-600">
                All our products are 100% genuine with manufacturer warranties. No compromises on quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                We deliver most products within 2-3 business days with our efficient logistics network.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Our tech specialists are available 24/7 to help you make the right purchase decisions.
              </p>
            </div>
          </div>
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;