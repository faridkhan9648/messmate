import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import Spinner from "./Spinner";
import MessCard from "./MessCard";
import { useAuth } from "../context/AuthContext"; // ✅ ADD

function MessList({ refresh }) {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");

  const { isAuthenticated } = useAuth(); // ✅ ADD

  // Fetch mess data
  const fetchData = async (selectedLocation = "") => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/messes", {
        params: { location: selectedLocation },
      });

      setMesses(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch mess data");
    }

    setLoading(false);
  };

  // Initial + refresh + filter + auth change
  useEffect(() => {
    fetchData(location);
  }, [refresh, location, isAuthenticated]); // ✅ ADD isAuthenticated

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mess Listings</h2>

      <select
        value={location}
        onChange={handleLocationChange}
        className="border p-2 rounded mb-4"
      >
        <option value="">All Locations</option>
        <option value="Wakad">Wakad</option>
        <option value="Pune">Pune</option>
        <option value="Delhi">Delhi</option>
        <option value="New York">New York</option>
      </select>

      {messes.length === 0 ? (
        <p>No messes available.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {messes.map((mess) => (
            <MessCard
              key={mess.id}
              mess={mess}
              onRefresh={() => fetchData(location)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MessList;






