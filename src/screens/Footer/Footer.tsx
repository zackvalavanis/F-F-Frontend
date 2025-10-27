import './Footer.css'
import { useNavigate } from 'react-router-dom'
import food from "../../assets/Food.json"
import { Player } from "@lottiefiles/react-lottie-player";
import axios from 'axios'
import useUser from '../../components/Context/useUser';
import { useEffect, useState } from 'react';

export function Footer() {
  const navigate = useNavigate();
  const { user } = useUser();

  const breakpoint = 480; // define mobile breakpoint
  const [mobile, setMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem('jwt');
    localStorage.removeItem("user");
    window.location.href = '/';
  };

  return (
    <div className='footer-container'>
      <div className='footer-left-side'>
        <h1 onClick={() => navigate('/recipes')}>Recipes</h1>
        <h1 onClick={() => navigate('/favorites')}>Favorite Recipes</h1>
        <h1 onClick={() => navigate('/restaurants')}>Restaurants</h1>
        <h1 onClick={() => navigate('/favorite-restaurants')}>Favorite Restaurants</h1>
      </div>

      <div>
        {mobile ? (
          ""
        ) : (
          <Player
            autoplay
            keepLastFrame
            src={food}
            style={{ height: "100px", width: "100px" }}
            loop={false}
          />
        )}
        <h1 style={{ fontSize: '18px' }}>© 2024 All Rights Reserved Fork & Flame</h1>
      </div>

      <div className='footer-right-side'>
        {user ? (
          <h1 onClick={handleLogout}>Logout</h1>
        ) : (
          <>
            <h1 onClick={() => navigate('/sign-up')}>Sign Up</h1>
            <h1 onClick={() => navigate('/login')}>Login</h1>
          </>
        )}
      </div>
    </div>
  );
}
