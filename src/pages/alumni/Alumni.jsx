import React, { useEffect, useState, useContext } from "react";
import AlumniCard from "../../components/alumni/AlumniCard.jsx";
import "./Alumni.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Alumni() {
  const [alumniData, setAlumniData] = useState([]);
  const API = import.meta.env.VITE_SERVER;

  const { user } = useContext(AuthContext);

  const isAdmin =
    user &&
    (user.type?.toLowerCase() === "admin" ||
      user.type?.toLowerCase() === "superadmin");

  useEffect(() => {
    fetch(`${API}/api/alumni`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAlumniData(data.data); // FIX: Access data.data
        }
      })
      .catch((err) => {
        console.error("Error fetching alumni data:", err);
      });
  }, []);


  // 🔥 DELETE FUNCTION
  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this alumni?");
    if (!ok) return;

    try {
      await axios.delete(`${API}/api/admin/alumni/${id}`, {
        withCredentials: true,
      });

      alert("Alumni deleted successfully");

      // update UI instantly
      setAlumniData((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete alumni");
    }
  };

  return (
    <div className="alumni-page">
      <div className="alumni-header">
        <h1 className="alumni-title">Our Distinguished Alumni</h1>
        <p className="alumni-subtitle">
          Meet the proud graduates who are making remarkable impacts in industries worldwide.
        </p>
      </div>

      <div className="alumni-grid">
        {alumniData.map((alum) => (
          <div key={alum._id} className="alumni-card-wrapper">
            <AlumniCard
              key={alum._id}
              name={alum.name}
              photo={alum.profilePhoto}
              department={alum.department}
              batch={alum.batch}
              position={alum.currentPosition}
            />

            {/* 🔥 ADMIN ONLY DELETE BUTTON */}
            {isAdmin && (
              <button
                className="alumni-del-btn"
                onClick={() => handleDelete(alum._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
