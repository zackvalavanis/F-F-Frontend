import './Footer.css'
import { useNavigate } from 'react-router-dom'
import food from "../../assets/Food.json"
import { Player } from "@lottiefiles/react-lottie-player";

export function Footer() {
  const navigate = useNavigate()
  return (
    <div className='footer-container'>

      <div className='footer-left-side'>
        <h1 onClick={() => navigate('/')}>Login</h1>
        <h1 onClick={() => navigate('/recipes')}>Recipes</h1>
        <h1 onClick={() => navigate('/favorites')}>Favorites</h1>
        <h1 onClick={() => navigate('/story')}>Story</h1>
      </div>

      <div>
        <Player
          autoplay
          keepLastFrame
          src={food}
          style={{ height: "100px", width: "100px" }}
          loop={false}
        />
      </div>

      <div className='footer-right-side'>
        <h1 style={{ fontSize: '18px' }}>© 2024 All Rights Reserved Fork & Flame</h1>
      </div>
    </div>
  )
}


