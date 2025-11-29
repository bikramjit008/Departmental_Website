import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
