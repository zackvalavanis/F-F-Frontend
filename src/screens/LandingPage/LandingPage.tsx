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
  const api = import.meta.env.VITE_BACKEND_HOST
  const [recipeId, setrecipeId] = useState('')
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"]
  const [category, setCategory] = useState<string>('')

  console.log(user?.name)
  console.log(recipeId)

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategory(value);
    console.log("Selected category", value);
  };

  const handleRecipeGenerator = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
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
        body: JSON.stringify({ ingredients, servings, category, save: true })
      });
      console.log(res)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setrecipeId(json);
      navigate('/recipes')
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
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
            style={{ height: 200, width: 200 }}
          />
          <h2 style={{ color: '#f37136' }}>Cooking something up...</h2>
        </div>
      )}

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
                setShowSecond(true);
              }
            }}
          />
        )}

        {showSecond && (
          <div className="second-animation-container">
            <h1 style={{ textAlign: 'center', color: '#f37136' }}>
              Welcome {user?.name || null}
            </h1>

            <Player
              autoplay
              speed={1}
              src={foodAnimation}
              keepLastFrame
              loop={false}
              style={{ height: 300, width: 300 }}
            />

            <Box
              sx={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
              }}
            >
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
                  <select id="category" value={category} onChange={handleChangeCategory}>
                    <option value="">-- Select a category --</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
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