import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllStudents.css";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  axios.get(
    "http://localhost:5000/api/admin/allstudents",
    { withCredentials: true }
  )
  .then((res) => setStudents(res.data))
  .catch((err) => console.error(err));
}, []);


  return (
    <div className="students-container">
      {students.map((student) => (
        <div
          className="student-card"
          key={student._id}
          onClick={() => navigate(`/student/${student.academic.registration}`)}
        >
          <h3>{student.basic.name}</h3>
          <p><strong>Department:</strong> {student.academic.department}</p>
          <p><strong>Roll:</strong> {student.academic.roll}</p>
          <p><strong>Registration:</strong> {student.academic.registration}</p>
          <p><strong>Semester:</strong> {student.academic.currentSemester}</p>
          <button className="view-btn">View</button>
        </div>
      ))}
    </div>
  );
}
