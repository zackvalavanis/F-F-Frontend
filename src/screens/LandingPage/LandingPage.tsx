import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import { Player } from "@lottiefiles/react-lottie-player";
import foodAnimation from "../../assets/Food-animation.json";
import prepareFood from "../../assets/Prepare-Food.json";
import { useState, type FormEvent } from "react";
import useUser from '../../components/Context/useUser.tsx';
import { Box, TextField, Button, Paper } from '@mui/material';

export function LandingPage() {
  const navigate = useNavigate();
  const [showSecond, setShowSecond] = useState(false);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_BACKEND_HOST;
  const [recipeId, setRecipeId] = useState('');
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const [category, setCategory] = useState<string>('');
  console.log(recipeId)

  console.log(user.user_id)

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleRecipeGenerator = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const ingredientsInput = form.elements.namedItem('ingredients') as HTMLInputElement | null;
    const servingsInput = form.elements.namedItem('servings') as HTMLInputElement | null;

    if (!ingredientsInput) return;

    const ingredients = ingredientsInput.value.split(',').map(s => s.trim());
    const servings = servingsInput ? parseInt(servingsInput.value) || 1 : 1;

    try {
      const res = await fetch(`${api}/recipes/generate_from_ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, servings, category, user_id: user?.user_id, save: true })
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setRecipeId(json);
      navigate('/recipes');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Full-screen loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <Player
            autoplay
            loop
            src={foodAnimation}
            className="lottie-player"
          />
          <h2 style={{ color: '#f37136' }}>Cooking something up...</h2>
        </div>
      )}

      <div className="main-container">
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

        {showSecond && (
          <div className="second-animation-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '90vh',   // take full height
              width: '100%',
            }}>

            <Player
              autoplay
              speed={1}
              src={foodAnimation}
              keepLastFrame
              loop={false}
              className="lottie-player"
            />
            {user ? (
              <div>
                <h1>Welcome {user.name}</h1>
              </div>
            ) : (
              <div>

              </div>
            )}

            <Box
              sx={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: {
                  xs: '350px',   // extra small screens (mobile)
                  sm: '400px', // small screens
                  md: '500px', // medium screens and up
                },
              }}
            >
              <Paper
                elevation={7}
                sx={{
                  display: 'flex',
                  p: 3,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                  flexDirection: {
                    xs: 'column', // stack children vertically on mobile
                    sm: 'row',    // row layout on larger screens
                  },
                }}
              >
                <form className='generate-new-recipe-container' onSubmit={handleRecipeGenerator}>
                  <select id="category" value={category} onChange={handleChangeCategory} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '20px',
                    backgroundColor: '#ff7043',
                    textAlign: 'center',
                    height: '50px',
                    width: '20rem',
                    fontSize: '20px',
                    alignItems: 'center',
                    color: 'white'
                  }}>
                    <option style={{ color: 'white' }} value="">-- Select a category --</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <TextField
                    name="ingredients"
                    type="text"
                    placeholder="e.g., chicken, garlic, lemon"
                  />
                  <TextField
                    name='servings'
                    type='text'
                    placeholder='How many servings'
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
                  >
                    Ask Ai to Generate a New Recipe
                  </Button>

                  <Button
                    onClick={() => navigate('/loading')}
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
    </div>
  );
}
