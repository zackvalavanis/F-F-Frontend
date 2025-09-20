import './Recipes.css'
import RecipeReviewCard from "../../components/RecipeCard"
import { useState, useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

interface Recipe {
  id: number;
  category: string;
  description: string;
  difficulty: number;
  ingredients: string;
  prep_time: number;
  rating: number;
  servings: number;
  tags: string;
  title: string;
  images?: string[];
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [category, setCategory] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND);
        const data = await res.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleSearch = () => {
    if (!category) {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter(r => r.category === category));
    }
    setModalShow(false); // close modal after applying filter
  };

  return (
    <div className='recipes-page-container'>
      <div className='recipe-top-container'>
        <h1 style={{ fontSize: '50px' }}>Recipes</h1>
        <div className='search-recipes'>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalShow(true)}
            sx={{ fontSize: '18px' }}
          >
            Filter
          </Button>
        </div>
      </div>

      {/* MODAL */}
      <Modal open={modalShow} onClose={() => setModalShow(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filter Recipes
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((cat, idx) => (
                <MenuItem key={idx} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setModalShow(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSearch}>
              Apply
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* RECIPES GRID */}
      <div
        className='recipe-container'
        style={{
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'stretch',
        }}
      >
        {filteredRecipes.map((recipe) => (
          <RecipeReviewCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
