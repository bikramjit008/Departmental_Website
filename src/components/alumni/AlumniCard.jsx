import React from "react";
import "./AlumniCard.css";

export default function AlumniCard({ name, photo, department, batch, position }) {
  return (
    <div className="alumni-card">
      <div className="alumni-image-section">
        <img src={photo} alt={name} className="alumni-image" />
      </div>

      <div className="alumni-info">
        <h2 className="alumni-name">{name}</h2>
        <p className="alumni-position">{position}</p>
        <p className="alumni-department">{department}</p>
        <p className="alumni-batch">Batch: {batch}</p>

        <button className="alumni-btn" onClick={()=>{alert("under development")}}>View Profile</button>
      </div>
    </div>
  );
}
