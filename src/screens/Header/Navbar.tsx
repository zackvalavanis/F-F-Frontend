import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll listener (skip for mobile)
  useEffect(() => {
    if (isMobile) {
      setScrolled(true); // always scrolled on mobile
      return;
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>

      {/* Mobile Hamburger */}
      <div className="mobile-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <div className="container-left-side">
          <h1 onClick={() => { navigate('/recipes'); setMenuOpen(false); }}>Recipes</h1>
          <h1 onClick={() => { navigate('/new-recipe'); setMenuOpen(false); }}>New Recipe</h1>
        </div>

        <div className="container-right-side">
          <h1 onClick={() => { navigate('/restaurants'); setMenuOpen(false); }}>Restaurants</h1>
          <h1 onClick={() => { navigate('/create-restaurant'); setMenuOpen(false); }}>New Restaurant</h1>
        </div>
      </div>

      {/* Center brand */}
      <div className="container-center" onClick={() => navigate('/')}>
        <h1>Fork & Flame</h1>
      </div>


      <div className="border-line"></div>
    </div>
  );
}
