import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import { Player } from "@lottiefiles/react-lottie-player";
import foodAnimation from "../../assets/Food-animation.json";
import prepareFood from "../../assets/Prepare-Food.json";
import { useState } from "react";
import useUser from '../../components/Context/useUser.tsx';
import { Box, Button, Paper } from '@mui/material';

export interface User {
  name: string;
  user_id: number;
}

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div className="main-container">
      {/* First animation */}
      {!showSecond && (
        <Player
          autoplay
          speed={4}
          src={prepareFood}
          loop={false}
          className="lottie-player"
          onEvent={(event) => {
            if (event === "complete") setShowSecond(true);
          }}
        />
      )}

      {/* Second animation + content */}
      {showSecond && (
        <div
          className="second-animation-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            width: '100%',
            padding: '1rem',
          }}
        >
          <Player
            autoplay
            speed={1}
            src={foodAnimation}
            keepLastFrame
            loop={false}
            className="lottie-player"
          />

          {user && <h1>Welcome {user.name}</h1>}

          {user ? (
            <Box
              sx={{
                minHeight: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '90%', sm: '400px', md: '500px' },
                mt: 3,
              }}
            >
              <Paper
                elevation={7}
                sx={{
                  display: 'flex',
                  p: 4,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  flexDirection: 'column',
                }}
              >
                <Button
                  onClick={() => navigate('/generate-recipe')}
                  type="button"
                  variant="contained"
                  fullWidth
                  sx={{ height: 50, mt: 1, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
                >
                  AI Generated Recipes
                </Button>

                <Button
                  onClick={() => navigate('/generate-restaurant')}
                  type="button"
                  variant="contained"
                  fullWidth
                  sx={{ height: 50, mt: 3, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
                >
                  AI Generated Restaurants
                </Button>
              </Paper>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5,
              }}
            >
              <h2>Log in to generate recipes</h2>
              <Button
                onClick={() => navigate('/login')}
                sx={{ width: { xs: '80%', sm: 400 }, mt: 3, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
                variant="contained"
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate('/recipes')}
                sx={{ width: { xs: '80%', sm: 400 }, mt: 2, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
                variant="contained"
              >
                Browse Recipes
              </Button>
            </Box>
          )}
        </div>
      )}
    </div>
  );
}
