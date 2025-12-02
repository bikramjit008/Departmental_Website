import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

import "./App.css";
import Alumni from "./pages/Alumni/Alumni.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/alumni" element={<Alumni />} />
        </Routes>
      </div>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
