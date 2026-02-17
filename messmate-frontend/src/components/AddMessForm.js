// src/components/AddMessForm.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../axiosConfig';

const AddMessForm = ({ onMessAdded }) => {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    name: '',
    location: '',
    price: '',
    rating: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If user is not authenticated, do not render the form
  if (!isAuthenticated) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/messes', {
        ...form,
        price: parseInt(form.price),
        rating: parseFloat(form.rating)
      });

      // Clear the form
      setForm({ name: '', location: '', price: '', rating: '' });

      // Notify parent to refresh mess list
      onMessAdded();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add mess.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Add New Mess</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Mess Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        min="1000"
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="number"
        name="rating"
        placeholder="Rating (0.0 - 5.0)"
        value={form.rating}
        onChange={handleChange}
        min="0"
        max="5"
        step="0.1" // allows decimal values
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Adding...' : 'Add Mess'}
      </button>
    </form>
  );
};

export default AddMessForm;





