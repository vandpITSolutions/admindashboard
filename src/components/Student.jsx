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
import "./Student.css";

const Students = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        rollNo: "",
        department: "",
        year: "",
    });
    const [editId, setEditId] = useState(null);

    const studentsRef = collection(db, "students");

    const fetchStudents = async () => {
        const data = await getDocs(studentsRef);
        setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            const docRef = doc(db, "students", editId);
            await updateDoc(docRef, formData);
            setEditId(null);
        } else {
            await addDoc(studentsRef, formData);
        }
        setFormData({ name: "", rollNo: "", department: "", year: "" });
        fetchStudents();
    };

    const handleEdit = (student) => {
        setFormData(student);
        setEditId(student.id);
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "students", id));
        fetchStudents();
    };

    return (
        <Layout>
            <div className="students-container">
                <h2>Manage Students</h2>
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
                        name="rollNo"
                        placeholder="Roll Number"
                        value={formData.rollNo}
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
                    <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                    <button type="submit">{editId ? "Update" : "Add"} Student</button>
                </form>
                <input
                    type="text"
                    placeholder="Search by name, roll no, department"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
                />
                {students
                    .filter((stu) => {
                        const term = searchTerm.toLowerCase();
                        return (
                            stu.name.toLowerCase().includes(term) ||
                            stu.rollNo.toLowerCase().includes(term) ||
                            stu.department.toLowerCase().includes(term)
                        );
                    })
                    .map((stu) => (
                        <tr key={stu.id}>
                            <td>{stu.name}</td>
                            <td>{stu.rollNo}</td>
                            <td>{stu.department}</td>
                            <td>{stu.year}</td>
                            <td>
                                <button className="action-btn edit-btn" onClick={() => handleEdit(stu)}>Edit</button>
                                <button className="action-btn delete-btn" onClick={() => handleDelete(stu.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((stu) => (
                            <tr key={stu.id}>
                                <td>{stu.name}</td>
                                <td>{stu.rollNo}</td>
                                <td>{stu.department}</td>
                                <td>{stu.year}</td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => handleEdit(stu)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(stu.id)}
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

export default Students;
