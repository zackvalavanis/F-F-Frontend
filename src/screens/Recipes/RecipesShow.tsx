import { Button, Typography, Box, Divider } from '@mui/material';
import './RecipesShow.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  category: string;
  price: number;
  description: string;
  difficulty: number;
  ingredients: string;
  prep_time: number;
  cook_time: number;
  rating: number;
  directions: string;
  servings: number;
  tags: string;
  title: string;
  images?: string[];
}

export function RecipesShow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // get id from URL
  const backend = import.meta.env.VITE_BACKEND_HOST;

  // recipe state
  const [recipeData, setRecipeData] = useState<Recipe | null>(
    (location.state as Recipe) || null
  );

  // fetch if no location.state
  useEffect(() => {
    if (!recipeData && id) {
      fetch(`${backend}/recipes/${id}`)
        .then(res => res.json())
        .then(data => setRecipeData(data))
        .catch(() => setRecipeData(null));
    }
  }, [id]);

  if (!recipeData) return <div>Loading recipe...</div>;

  const recipe = recipeData; // alias for easier usage
  const totalTime = recipe.prep_time + recipe.cook_time;

  const handleDeleteRecipe = async () => {
    try {
      const res = await fetch(`${backend}/recipes/${recipe.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(res)
      alert('Recipe deleted successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="recipe-show-container" sx={{ padding: 4, maxWidth: 1000, margin: '0 auto' }}>
      <Box className="rating-container" sx={{ marginBottom: 2 }}>
        <Typography variant="h6">{recipe.rating} ⭐</Typography>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        {recipe.title}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, marginBottom: 2 }}>
        <Typography>Prep Time: {recipe.prep_time} min</Typography>
        <Typography>Cook Time: {recipe.cook_time} min</Typography>
        <Typography>Total Time: {totalTime} min</Typography>
      </Box>

      {recipe.images && recipe.images[0] && (
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <img
            src={recipe.images[0]}
            alt={recipe.title}
            style={{ maxHeight: 500, width: '100%', objectFit: 'cover', borderRadius: 8 }}
          />
        </Box>
      )}

      <Typography variant="body1" sx={{ fontSize: 18, textAlign: 'center', marginBottom: 3 }}>
        {recipe.description}
      </Typography>

      <Divider sx={{ marginY: 3 }} />

      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Ingredients
      </Typography>
      <ul>
        {recipe.ingredients
          ?.split(',')
          .map(i => i.trim())
          .filter(Boolean)
          .map((ingredient, index) => (
            <li key={index}>
              <Typography variant="body1">{ingredient}</Typography>
            </li>
          ))}
      </ul>

      <Divider sx={{ marginY: 3 }} />

      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Directions
      </Typography>
      <ol>
        {recipe.directions
          .split('.')
          .map(step => step.trim())
          .filter(step => step.length > 0)
          .map((step, index) => (
            <li key={index}>
              <Typography variant="body1">{step}</Typography>
            </li>
          ))}
      </ol>

      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button variant="contained" color="error" onClick={handleDeleteRecipe}>
          Delete Recipe
        </Button>
      </Box>
    </Box>
  );
}
