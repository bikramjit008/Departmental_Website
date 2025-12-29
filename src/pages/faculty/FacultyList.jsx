import React, { useEffect, useState, useContext } from "react";
import "./Faculty.css"; // import CSS file
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_SERVER;

  const { user } = useContext(AuthContext);   // Get logged in user

  const showAwardPopup = () => {
    alert("Awards section is under development.");
  };

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch(`${API}/api/faculty`);
        const data = await res.json();

        if (data.success) {
          setFaculty(data.data);
        }
      } catch (error) {
        console.log("Error loading faculty:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);


  // 🔥 DELETE FUNCTION
  const deleteFaculty = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this faculty?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API}/api/admin/faculty/${id}`, {
        withCredentials: true,
      });

      alert("Faculty deleted successfully");

      // 🔥 update UI instantly
      setFaculty(prev => prev.filter(f => f._id !== id));

    } catch (err) {
      console.log(err);
      alert("Failed to delete faculty");
    }
  };
  // console.log("Logged user =", user);
  const isAdmin =
    user &&
    (user.type?.toLowerCase() === "admin" ||
      user.type?.toLowerCase() === "superadmin");

  // console.log("Is Admin =", isAdmin);


  return (
    <div className="faculty-page">
      <h1 className="faculty-title">Our Faculty Members</h1>

      {loading && <p className="loading-text">Loading faculty...</p>}

      {!loading && (
        <div className="faculty-grid">
          {faculty.map((f) => (
            <div key={f._id} className="faculty-card">
              <div className="photo-wrapper">
                <img src={f.photo} alt={f.name} />
              </div>

              <h2 className="faculty-name">{f.name}</h2>
              <p className="faculty-position">{f.position}</p>
              <p className="faculty-email">{f.email}</p>

              <div className="faculty-btn-group">
                <button onClick={showAwardPopup} className="award-btn">
                  See Awards
                </button>

                {isAdmin && (
                  <button className="del-btn" onClick={() => deleteFaculty(f._id)}>
                    Delete
                  </button>
                )}
              </div>




            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FacultyList;
