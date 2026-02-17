import React from "react";
import api from "../axiosConfig";

function MessCard({ mess, onRefresh }) {
  const token = localStorage.getItem("token");

  // DELETE
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this mess?")) return;

    try {
      await api.delete(`/messes/${mess.id}`);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    const newName = prompt("Enter mess name:", mess.name);
    const newLocation = prompt("Enter location:", mess.location);
    const newPrice = prompt("Enter price:", mess.price);
    const newRating = prompt("Enter rating:", mess.rating);

    if (!newName || !newLocation || !newPrice || !newRating) return;

    try {
      await api.put(`/messes/${mess.id}`, {
        name: newName,
        location: newLocation,
        price: Number(newPrice),
        rating: Number(newRating),
      });

      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold">{mess.name}</h3>
      <p className="text-gray-600">📍 {mess.location}</p>
      <p className="text-green-600 font-bold mt-2">₹{mess.price}</p>
      <p className="text-yellow-500">⭐ {mess.rating}</p>

      {/* Show buttons only if logged in */}
      {token && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Update
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MessCard;

