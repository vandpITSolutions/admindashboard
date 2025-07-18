import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Students from "./components/Student.jsx";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
