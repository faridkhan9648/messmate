import React, { useState } from 'react';
import api from '../axiosConfig';

const SignupForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', form);
      alert('Registration successful. Please log in.');
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
          required
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;





