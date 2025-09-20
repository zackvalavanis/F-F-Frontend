import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-links">
        <div className="container-left-side">
          <h1 onClick={() => navigate('/recipes')}>Recipes</h1>
          <h1 onClick={() => navigate('/favorites')}>Favorites</h1>
        </div>

        <div className="container-center">
          <h1 onClick={() => navigate('/')}>Fork & Flame</h1>
        </div>

        <div className="container-right-side">
          <h1 onClick={() => navigate('/story')}>Story</h1>
          <h1 onClick={() => navigate('/new-recipe')}>New Recipe</h1>
        </div>
      </div>

      <div className="border-line"></div>
    </div>
  );
}
