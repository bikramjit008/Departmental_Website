import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

import "./App.css";
import AlumniList from "./pages/Alumni/Alumni";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/alumni" element={<AlumniList />} />
        </Routes>
      </div>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
