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
import "../components/Student.css";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    hod: "",
  });
  const [editId, setEditId] = useState(null);

  const deptRef = collection(db, "departments");

  const fetchDepartments = async () => {
    const data = await getDocs(deptRef);
    setDepartments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, "departments", editId), formData);
      setEditId(null);
    } else {
      await addDoc(deptRef, formData);
    }
    setFormData({ name: "", hod: "" });
    fetchDepartments();
  };

  const handleEdit = (dept) => {
    setFormData(dept);
    setEditId(dept.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "departments", id));
    fetchDepartments();
  };

  return (
    <Layout>
      <div className="students-container">
        <h2>Manage Departments</h2>
        <form className="students-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Department Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="hod"
            placeholder="HOD Name"
            value={formData.hod}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? "Update" : "Add"} Department</button>
        </form>

        <table className="students-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>HOD</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td>{dept.name}</td>
                <td>{dept.hod}</td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(dept)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(dept.id)}
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

export default Departments;
