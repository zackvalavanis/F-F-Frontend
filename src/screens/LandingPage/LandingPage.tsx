import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import './LandingPage.css';
import { Player } from "@lottiefiles/react-lottie-player";
import foodAnimation from "../../assets/Food-animation.json";
import prepareFood from "../../assets/Prepare-Food.json";
import { useState } from "react";

export function LandingPage() {
  const navigate = useNavigate();
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div className="landing-page">
      <Header />

      {/* Optional clickable area */}
      <div
        className="clickable-area"
        onClick={() => navigate('/login')}
        style={{ cursor: 'pointer', height: '50px', background: 'transparent' }}
      >
        {/* You can add text or keep it empty */}
      </div>

      <div className="main-container">
        {!showSecond && (
          <Player
            autoplay
            speed={6}
            src={prepareFood}
            loop={false}
            style={{ height: 300, width: 300 }}
            onEvent={(event) => {
              if (event === "complete") {
                setShowSecond(true); // show second animation when first finishes
              }
            }}
          />
        )}
        {showSecond && (
          <div className="second-animation-container">
            <Player
              autoplay
              speed={1}
              src={foodAnimation}
              keepLastFrame
              loop={false}
              style={{ height: 300, width: 300 }}
            />
            <h1 style={{ display: 'flex', justifyContent: 'center', color: '#f37136' }}>Generate a new recipe or find an existing!</h1>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f37136', fontSize: '25px' }}>Enter your ingredients below</p>
            <div className='container-input-buttons' style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <input style={{ width: '400px', height: '40px' }} type='list'></input>
              <button className='landingPage-buttons' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px' }}>Generate new Recipe</button>
              <button className='landingPage-buttons' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px' }}>Find current Recipe</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
