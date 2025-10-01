import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import fire from '/Users/zackariasvalavanis/Desktop/Portfolio/fork-flame/fork-flame-frontend/src/assets/flames-icon.svg'

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
          <h1 onClick={() => navigate('/')}>Fork <img style={{ height: '50px', width: '50px' }} src={fire} alt="Logo" />Flame</h1>
        </div>

        <div className="container-right-side">
          <h1 onClick={() => navigate('/restaurants')}>Restaurants</h1>
          <h1 onClick={() => navigate('/new-recipe')}>New Recipe</h1>
        </div>
      </div>

      <div className="border-line"></div>
    </div>
  );
}
