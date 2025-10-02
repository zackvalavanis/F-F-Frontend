import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import { Player } from "@lottiefiles/react-lottie-player";
import foodAnimation from "../../assets/Food-animation.json";
import prepareFood from "../../assets/Prepare-Food.json";
import { useState, type FormEvent } from "react";
import { useUser } from "../../components/Context/user-context";
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

export function LandingPage() {
  const navigate = useNavigate();
  const [showSecond, setShowSecond] = useState(false);
  const { user } = useUser();
  const api = import.meta.env.VITE_BACKEND_HOST
  const [recipeId, setrecipeId] = useState('')

  console.log(user?.name)


  const handleRecipeGenerator = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const ingredientsInput = form.elements.namedItem('ingredients') as HTMLInputElement | null;
    const servingsInput = form.elements.namedItem('servings') as HTMLInputElement | null;

    if (!ingredientsInput) {
      console.error("Ingredients input not found!");
      return;
    }

    const ingredients = ingredientsInput.value.split(',').map(s => s.trim());
    const servings = servingsInput ? parseInt(servingsInput.value) || 1 : 1;

    try {
      const res = await fetch(`${api}/recipes/generate_from_ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, servings, save: true })
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setrecipeId(json);
      console.log("Recipe saved:", json);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="landing-page">
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
            <h1 style={{ textAlign: 'center', color: '#f37136' }}>Welcome {user?.name || null}</h1>
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



            <Box
              sx={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
              }}>

              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  width: '100%',
                  maxWidth: 400,
                  borderRadius: 3,
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <form className='generate-new-recipe-container' onSubmit={handleRecipeGenerator}>
                  <TextField
                    name="ingredients"
                    style={{ width: '400px', height: '40px', borderRadius: '20px' }}
                    type="text"
                    placeholder="e.g., chicken, garlic, lemon"
                  />
                  <TextField
                    name='servings'
                    type='text'
                    placeholder='How many servings'
                    style={{ width: '400px', height: '40px', borderRadius: '20px' }}
                  >
                  </TextField>
                  {/* <Button
                    type="submit"
                    className="landingPage-buttons"
                    style={{ width: '150px' }}
                  >
                    Generate new Recipe
                  </Button> */}

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
                  >
                    Ask Ai to Generate a New Recipe
                  </Button>

                  <Button
                    onClick={() => navigate('/recipes')}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
                  >
                    Find a Recipe
                  </Button>
                </form>
              </Paper>
            </Box>
          </div>
        )}
      </div>
    </div >
  );
}
