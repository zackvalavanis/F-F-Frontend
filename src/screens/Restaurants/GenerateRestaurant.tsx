import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import foodAnimation from "../../assets/Food-animation.json";
import prepareFood from "../../assets/Prepare-Food.json";
import { useState, type FormEvent } from "react";
import useUser from '../../components/Context/useUser.tsx';
import { Box, TextField, Button, Paper } from '@mui/material';

export interface User {
  name: string;
  user_id: number;
}

export function GenerateRestaurant() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showSecond, setShowSecond] = useState(false);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_BACKEND_HOST;

  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const prices = ["$", "$$", "$$$", "$$$$"];
  const priceMapping: Record<string, number> = {
    '$': 1,
    '$$': 2,
    '$$$': 3,
    '$$$$': 4,
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrice(event.target.value);
  };

  const handleRecipeGenerator = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!user || typeof user.user_id !== "number") {
      alert("You must be logged in to generate a recipe.");
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const cityInput = form.elements.namedItem('city') as HTMLInputElement | null;

    if (!cityInput) {
      alert("City field is required.");
      setLoading(false);
      return;
    }

    const city = cityInput.value.trim();

    try {
      const res = await fetch(`${api}/restaurants/generate_restaurant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city,
          category,
          price: priceMapping[price],
          user_id: user.user_id,
          save: true
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("Error response:", errorData);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      console.log("Generated restaurant:", json);
      navigate('/restaurants', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to generate restaurant. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh',
              width: '100%',
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

            {user && <h1 style={{ color: '#ff7043' }}>Generate a new Restaurant!</h1>}

            {user ? (
              <Box
                sx={{
                  minHeight: '60vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: '350px', sm: '400px', md: '500px' },
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
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <form className='generate-new-recipe-container' onSubmit={handleRecipeGenerator}>
                    <select
                      value={category}
                      onChange={handleChangeCategory}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: '20px',
                        backgroundColor: '#ff7043',
                        textAlign: 'center',
                        height: '50px',
                        width: '20rem',
                        fontSize: '20px',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <option style={{ color: 'white' }} value="">-- Select a category --</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <select
                      value={price}
                      onChange={handleChangePrice}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: '20px',
                        backgroundColor: '#ff7043',
                        textAlign: 'center',
                        height: '50px',
                        width: '20rem',
                        fontSize: '20px',
                        color: 'white',
                        marginTop: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option style={{ color: 'white' }} value="">-- Select a price --</option>
                      {prices.map((p, idx) => (
                        <option key={idx} value={p}>{p}</option>
                      ))}
                    </select>

                    <TextField
                      name="city"
                      type="text"
                      placeholder="City"
                      sx={{ mt: 2, width: '100%' }}
                    />



                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
                    >
                      Generate Restaurant
                    </Button>
                  </form>
                </Paper>
              </Box>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Log in to generate restaurants</h1>
                <Button
                  onClick={() => navigate('/login')}
                  sx={{ width: { xs: 200, sm: 400 }, backgroundColor: '#ff7043', marginTop: 5 }}
                  variant="contained"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate('/restaurants')}
                  variant="contained"
                  sx={{ width: { xs: 200, sm: 400 }, backgroundColor: '#ff7043', marginTop: 5 }}
                >
                  Check out other users' restaurants
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
