import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Profile from './pages/Profile';
import SellBook from './pages/SellBook';
import AllBooks from "./pages/AllBooks";
import SellerProfile from './pages/SellerProfile';

function App() {
  return (
    <Router>
      <Navbar /> {/* Now inside the Router! */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sell" element={<SellBook />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/seller/:id" element={<SellerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
