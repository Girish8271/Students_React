import React, { useEffect, useState } from "react";
import BaseUrl from "../API/API.js";
import axios from "axios";
import Navbar from "../Components/Navbar.jsx";

const StudentsDetails = () => {
  const [students, setStudents] = useState([]); // plural for clarity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Make the GET request using Axios
        const response = await axios.get(`${BaseUrl}/students/all`);

        // Check if the response contains data and it's an array
        if (response.data.success && Array.isArray(response.data.data)) {
          setStudents(response.data.data); // Set students array from response
        } else {
          setError("Unexpected response format");
        }

        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch students data");
        setLoading(false); // Set loading to false even when error occurs
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);
  // Make sure students is an array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="bg-light">
        <div className="container mt-5">
          <h2 className="text-center mb-4">Students Dashboard</h2>
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>{" "}
                  {/* Using _id as per the response format */}
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentsDetails;
