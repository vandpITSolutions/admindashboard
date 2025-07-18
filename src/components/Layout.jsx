// src/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>College Admin</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/notices">Notices</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="navbar">
          <span>Welcome Admin</span>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
