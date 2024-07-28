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
      <Route path="*" element={<p>Not Found</p>} /> {/* Default to Dashboard */}
    </Routes>
  </Router>
  );
};

export default App;


// {
//   "sub": "auth0|66a500291a8520fdcca3bc2f",
//   "nickname": "ashpritmehra",
//   "name": "ashpritmehra@gmail.com",
//   "picture": "https://s.gravatar.com/avatar/322ff4865319fe53e6cd786d10f0829f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fas.png",
//   "updated_at": "2024-07-27T14:12:07.553Z"
// }


// home will be the login "/"
// dashboard = home "/home/patient_search"
// scans = "home/scans"
// individuals: "home/patient_search/patient_id"
// scan = "/home/scans/scan_id"
// settings would be a pop up blurring the screen /home/settings maybe?
