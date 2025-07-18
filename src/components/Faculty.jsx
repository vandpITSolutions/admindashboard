import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Layout from "../components/Layout";
import "../components/Student.css"; // Reuse same styling

const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    facultyId: "",
    department: "",
    designation: "",
  });
  const [editId, setEditId] = useState(null);

  const facultyRef = collection(db, "faculty");

  const fetchFaculty = async () => {
    const data = await getDocs(facultyRef);
    setFacultyList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const docRef = doc(db, "faculty", editId);
      await updateDoc(docRef, formData);
      setEditId(null);
    } else {
      await addDoc(facultyRef, formData);
    }
    setFormData({ name: "", facultyId: "", department: "", designation: "" });
    fetchFaculty();
  };

  const handleEdit = (faculty) => {
    setFormData(faculty);
    setEditId(faculty.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "faculty", id));
    fetchFaculty();
  };

  return (
    <Layout>
      <div className="students-container">
        <h2>Manage Faculty</h2>
        <form className="students-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="facultyId"
            placeholder="Faculty ID"
            value={formData.facultyId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? "Update" : "Add"} Faculty</button>
        </form>

        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Faculty ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((fac) => (
              <tr key={fac.id}>
                <td>{fac.name}</td>
                <td>{fac.facultyId}</td>
                <td>{fac.department}</td>
                <td>{fac.designation}</td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(fac)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(fac.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Faculty;
