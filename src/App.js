import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Students from "./components/Student.jsx";
import Faculty from "./components/Faculty.jsx";
import Departments from "./components/Department.jsx";
import Notices from "./components/Notices.jsx";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/notices" element={<Notices />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
