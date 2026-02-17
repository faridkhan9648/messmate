// src/pages/Dashboard.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AddMessForm from '../components/AddMessForm';
import MessList from '../components/MessList';

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  // Trigger refresh for MessList after adding a new mess
  const handleMessAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar handles login/logout and user display */}
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Add Mess Form */}
        <div className="mb-6">
          <AddMessForm onMessAdded={handleMessAdded} />
        </div>

        {/* List of Messes */}
        <MessList refresh={refresh} />
      </div>
    </div>
  );
};

export default Dashboard;



