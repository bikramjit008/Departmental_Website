import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StudentProfile.css";

export default function StudentProfile() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/admin/student/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setStudent(res.data);  // directly set the returned student
            })
            .catch((err) => console.error(err));
    }, [id]);


    if (!student) return <p className="loading">Loading...</p>;

    const { basic, academic, contact, address, guardian, previousMarks, photo } = student;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={photo} alt={basic.name} className="profile-photo" />
                <div>
                    <h2>{basic.name}</h2>
                    <p><strong>Department:</strong> {academic.department}</p>
                </div>
            </div>

            <div className="profile-body">
                <section>
                    <h3>Academic Info</h3>
                    <p><strong>Roll:</strong> {academic.roll}</p>
                    <p><strong>Registration:</strong> {academic.registration}</p>
                    <p><strong>Stream:</strong> {academic.stream}</p>
                    <p><strong>Year:</strong> {academic.currentYear}</p>
                    <p><strong>Semester:</strong> {academic.currentSemester}</p>
                    <p><strong>Section:</strong> {academic.section}</p>
                </section>

                <section>
                    <h3>Contact Info</h3>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Alternate:</strong> {contact.alternatePhone}</p>
                </section>

                <section>
                    <h3>Address</h3>
                    <p><strong>Present:</strong> {address.present.line1}, {address.present.city}, {address.present.state}, {address.present.pin}</p>
                    <p><strong>Permanent:</strong> {address.permanent.line1}, {address.permanent.city}, {address.permanent.state}, {address.permanent.pin}</p>
                </section>

                <section>
                    <h3>Guardian</h3>
                    <p><strong>Father:</strong> {guardian.father.name} ({guardian.father.occupation}) - {guardian.father.phone}</p>
                    <p><strong>Mother:</strong> {guardian.mother.name} ({guardian.mother.occupation}) - {guardian.mother.phone}</p>
                </section>

                <section>
                    <h3>Previous Marks</h3>
                    {previousMarks.map(pm => (
                        <p key={pm._id}><strong>Semester {pm.semester}:</strong> SGPA {pm.sgpa} - {pm.result}</p>
                    ))}
                </section>
            </div>
        </div>
    );
}
