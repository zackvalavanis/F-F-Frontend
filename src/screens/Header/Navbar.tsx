import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import food from "../../assets/Food.json"
import { Player } from "@lottiefiles/react-lottie-player";

export function Navbar() {
  const navigate = useNavigate()

  return (
    <div className='navbar-container-before'>
      <div className='navbar-links'>

        <div className='container-left-side'>
          <h1 onClick={() => navigate('/recipes')}>Recipes</h1>
          <h1 onClick={() => navigate('/favorites')}>Favorites</h1>
        </div>

        <div className='container-center'>
          <h1 onClick={() => navigate('/')}>NavBar</h1>
          <Player
            autoplay
            keepLastFrame
            src={food}
            style={{ height: "70px", width: "70px" }}
            loop={false}
          />
        </div>

        <div className='container-right-side'>
          <h1 onClick={() => navigate('/story')}>Story</h1>
          <h1 onClick={() => navigate('/')}>Placeholder-Link</h1>
        </div>

      </div>
    </div>
  )
}