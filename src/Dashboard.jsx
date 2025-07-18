// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";
import "./css/dash.css";
import Layout from "./components/Layout";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentsSnapshot = await getDocs(collection(db, "students"));
      const facultySnapshot = await getDocs(collection(db, "faculty"));
      const deptSnapshot = await getDocs(collection(db, "departments"));
      const noticeSnapshot = await getDocs(collection(db, "notices"));

      setStudentCount(studentsSnapshot.size);
      setFacultyCount(facultySnapshot.size);
      setDepartments(deptSnapshot.docs.map((doc) => doc.data()));
      setNotices(noticeSnapshot.docs.map((doc) => doc.data()));
    };

    fetchData();
  }, []);

  return (
    <Layout>
<div className="dashboard-container">
      <h1 className="dashboard-title">College Admin Dashboard</h1>

      <div className="cards-grid">
        <div className="card">
          <h2>Total Students</h2>
          <p>{studentCount}</p>
        </div>
        <div className="card">
          <h2>Total Faculty</h2>
          <p>{facultyCount}</p>
        </div>
        <div className="card">
          <h2>Departments</h2>
          <ul className="departments-list">
            {departments.map((dept, index) => (
              <li key={index}>
                {dept.name} (HOD: {dept.hod})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h2>Latest Notices</h2>
        {notices.length === 0 ? (
          <p>No notices available.</p>
        ) : (
          <ul className="notices-list">
            {notices.slice(0, 5).map((notice, index) => (
              <li key={index} className="notice-item">
                <p><strong>{notice.title}</strong></p>
                <p>{notice.content}</p>
                <p style={{ fontSize: "12px", color: "#777" }}>
                  Date: {notice.date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </Layout>
    
  );
};

export default Dashboard;
