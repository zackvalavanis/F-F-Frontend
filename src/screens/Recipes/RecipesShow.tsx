import { Button, Typography, Box, Divider } from '@mui/material';
import './RecipesShow.css';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const recipe = location.state as Recipe;
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND_HOST;

  const handleDeleteRecipe = async () => {
    try {
      const res = await fetch(`${backend}/recipes/${recipe.id}.json`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Recipe deleted successfully');
      console.log('Deleted recipe:', res);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const totalTime = recipe.prep_time + recipe.cook_time;

  return (
    <Box className="recipe-show-container" sx={{ padding: 4, maxWidth: 1000, margin: '0 auto' }}>
      {/* Rating */}
      <Box className="rating-container" sx={{ marginBottom: 2 }}>
        <Typography variant="h6">{recipe.rating} ⭐</Typography>
      </Box>

      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        {recipe.title}
      </Typography>

      {/* Times */}
      <Box sx={{ display: 'flex', gap: 3, marginBottom: 2 }}>
        <Typography>Prep Time: {recipe.prep_time} min</Typography>
        <Typography>Cook Time: {recipe.cook_time} min</Typography>
        <Typography>Total Time: {totalTime} min</Typography>
      </Box>

      {/* Image */}
      {recipe.images && recipe.images[0] && (
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <img
            src={recipe.images[0]}
            alt={recipe.title}
            style={{ maxHeight: 500, width: '100%', objectFit: 'cover', borderRadius: 8 }}
          />
        </Box>
      )}

      {/* Description */}
      <Typography variant="body1" sx={{ fontSize: 18, textAlign: 'center', marginBottom: 3 }}>
        {recipe.description}
      </Typography>

      <Divider sx={{ marginY: 3 }} />

      {/* Ingredients */}
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

      {/* Directions */}
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

      {/* Delete Button */}
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteRecipe}
        >
          Delete Recipe
        </Button>
      </Box>
    </Box>
  );
}
