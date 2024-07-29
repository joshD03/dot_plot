import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import Dashboard from './components/PatientDashboard';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from 'react-router-dom';
import ScanDashboard from './components/ScanDashboard';
import Login from './components/Login';
import PatientCard from './components/PatientCard';
import { PatientDetails } from './components/PatientDetails';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/patients/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to={'/login'}/>} /> {/* Default to Dashboard */}
    </Routes>
  </Router>
  );
};

export default App;

