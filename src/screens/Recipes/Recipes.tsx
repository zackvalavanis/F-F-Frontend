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
  TextField,
} from '@mui/material'

interface Recipe {
  id: number;
  category: string;
  description: string;
  difficulty: number;
  ingredients: string;
  prep_time: number;
  average_rating: number;
  servings: number;
  tags: string;
  title: string;
  images?: string[];
  directions: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export function Recipes({ onSearch }: { onSearch?: (query: string) => void }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [category, setCategory] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [rating, setRating] = useState('');
  const [searchQuery, setSearchQuery] = useState('')


  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9; // 3x3 grid

  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const difficulties = [1, 2, 3, 4, 5]
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/recipes`);
        const data = await res.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  console.log(recipes)

  const handleSearch = () => {
    const filtered = recipes.filter((r) => {
      let match = true;

      if (category) match = match && r.category === category;
      if (rating) match = match && r.average_rating === Number(rating);
      if (difficulty) match = match && r.difficulty === Number(difficulty);

      // NEW: check if searchQuery matches title, description, or tags
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        match =
          match &&
          (
            r.title?.toLowerCase().includes(q) ||
            r.description?.toLowerCase().includes(q) ||
            r.tags?.toLowerCase().includes(q)
          );
      }

      return match;
    });

    setFilteredRecipes(filtered);
    setCurrentPage(1);
    setModalShow(false);
  };

  const clearFilter = () => {
    setFilteredRecipes(recipes);
    setCategory('');
    setCurrentPage(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filtered = recipes.filter((r) => {
      const q = value.toLowerCase();
      return (
        r.title?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.tags?.toLowerCase().includes(q)
      );
    });
    setFilteredRecipes(filtered);
    setCurrentPage(1);

    onSearch?.(value);
  };

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div className='recipes-page-container'>
      <h1 style={{ color: '#ff7043' }}>Recipes</h1>
      <div className='recipe-top-container'>
        <TextField
          fullWidth
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
            maxWidth: '500px',
            maxHeight: '40px',
            borderRadius: '20px',
            padding: '20px',
            '& .MuiInputBase-root': {
              borderRadius: '20px', // ensures inner input respects borderRadius
              height: '50px',        // sets input height explicitly
            }
          }
          }
          onChange={handleChange}
          value={searchQuery}
          type='text'
          placeholder='search'
        >
        </TextField>
        <div className='search-recipes'>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalShow(true)}
            sx={{ fontSize: '18px', backgroundColor: '#ff7043' }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            onClick={clearFilter}
            sx={{ fontSize: '18px', backgroundColor: '#ff7043' }}
          >
            Clear filters
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
            width: { xs: 300, sm: 400 },
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
          <FormControl fullWidth sx={{ mb: 2 }}>

            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              value={difficulty}
              label="difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {difficulties.map((dif, idx) => (
                <MenuItem key={idx} value={dif}>
                  {dif}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>

            <InputLabel id="rating-label">Rating</InputLabel>
            <Select
              labelId="rating-label"
              value={rating}
              label="rating"
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {ratings.map((rate, idx) => (
                <MenuItem key={idx} value={rate}>
                  {rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button sx={{ color: '#ff7043' }} onClick={() => setModalShow(false)}>Cancel</Button>
            <Button sx={{ backgroundColor: '#ff7043' }} variant="contained" onClick={handleSearch}>
              Apply
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* RECIPES GRID */}
      <div
        className='recipe-container'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '6rem',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          justifyItems: 'center',
        }}
      >
        {currentRecipes.map((recipe) => (
          <RecipeReviewCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}
