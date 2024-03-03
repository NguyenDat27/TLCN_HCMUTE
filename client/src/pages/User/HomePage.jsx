import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../../components/Layout/HeaderUser';
import Hero from "../../components/Layout/Hero";
import Info from "../../components/Layout/Info";
import About from "../../components/Layout/About";
import Reviews from "../../components/Layout/Reviews";
import Doctors from "../../components/Layout/Doctors";
import Footer from "../../components/Layout/Footer";

const HomePage = () => {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("fullname");
  const navigate = useNavigate();
  const Logout = () =>{
    localStorage.removeItem("email");
    localStorage.removeItem("fullname");
    localStorage.removeItem("token");

    navigate("/");
  }
  return (
    <div>
      <div className="home-section">
        <HeaderUser />
        <Hero />
        <Info />
        <About />
        <Reviews />
        <Doctors />
        <Footer />
    </div>
    </div>
  )
}

export default HomePage