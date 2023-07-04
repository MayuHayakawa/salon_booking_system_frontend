import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Appointments from './pages/Dashboard/Appointments';
import Account from "./pages/Dashboard/Account";
import Menu from './pages/Booking/Menu';
import SelectStaff from './pages/Booking/SelectStaff';
import PickATime from './pages/Booking/PickATime';
import Confirm from './pages/Booking/Confirm';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UpdateMenu from './pages/Admin/UpdateMenu';
import AddMenu from './pages/Admin/AddMenu';
import UpdateStaff from './pages/Admin/UpdateStaff';
import AddStaff from './pages/Admin/AddStaff';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const user = useSelector(state => state.user);

  return (
    <Router>
      <Navbar />
      <Routes>
        { user.data != null ? (
          <Route path="/" element={<Dashboard />} />
        ):(
          <Route path="/" element={<Home />} />
        )}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/account" element={<Account />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/selectstaff" element={<SelectStaff />} />
        <Route path="/menu/pickatime" element={<PickATime />} />
        <Route path="/menu/confirm" element={<Confirm />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/updatemenu" element={<UpdateMenu />} />
        <Route path="/addmenu" element={<AddMenu />} />
        <Route path="/updatestaff" element={<UpdateStaff />} />
        <Route path="/addstaff" element={<AddStaff />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
