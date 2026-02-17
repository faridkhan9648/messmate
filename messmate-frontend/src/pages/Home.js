// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-white py-20 px-6 text-center shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Find the Best Mess Near You 🍽️
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          MessMate helps students and professionals discover affordable,
          hygienic and tasty mess services around their location.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Signup
          </Link>

          <Link
            to="/login"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose MessMate?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              🍛 Nearby Mess
            </h3>
            <p className="text-gray-600">
              Discover mess services near your hostel, college or office.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              ⭐ Reviews & Ratings
            </h3>
            <p className="text-gray-600">
              Check real student reviews before choosing your mess.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              💰 Affordable Plans
            </h3>
            <p className="text-gray-600">
              Compare monthly meal plans and pricing easily.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-gray-500">
        © {new Date().getFullYear()} MessMate. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;

