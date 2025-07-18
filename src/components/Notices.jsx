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

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);

  const noticesRef = collection(db, "notices");

  const fetchNotices = async () => {
    const data = await getDocs(noticesRef);
    setNotices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, "notices", editId), formData);
      setEditId(null);
    } else {
      await addDoc(noticesRef, formData);
    }
    setFormData({ title: "", content: "", date: "" });
    fetchNotices();
  };

  const handleEdit = (notice) => {
    setFormData(notice);
    setEditId(notice.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notices", id));
    fetchNotices();
  };

  return (
    <Layout>
      <div className="students-container">
        <h2>Manage Notices</h2>
        <form className="students-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? "Update" : "Add"} Notice</button>
        </form>

        <table className="students-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id}>
                <td>{notice.title}</td>
                <td>{notice.content}</td>
                <td>{notice.date}</td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(notice)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(notice.id)}
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

export default Notices;
