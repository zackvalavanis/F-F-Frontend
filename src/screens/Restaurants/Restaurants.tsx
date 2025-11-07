/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Paper, Button, TextField, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Restaurant {
  id?: number; // made optional to handle missing IDs
  name: string;
  city: string,
  category: string;
  rating: number;
  price?: number;
}

export function Restaurants() {
  const api = import.meta.env.VITE_BACKEND_HOST;
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 16;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  // Filters
  const [price, setPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [city, setCity] = useState('');
  const [foodType, setFoodType] = useState('');

  const priceMapping: Record<string, number> = {
    '$': 1,
    '$$': 2,
    '$$$': 3,
    '$$$$': 4,
  };

  const fetchRestaurants = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (price) params.append('price', priceMapping[price].toString());
      if (minRating) params.append('min_rating', minRating);
      if (city) params.append('city', city);
      if (foodType) params.append('food_type', foodType);

      const queryString = params.toString();
      const res = await fetch(`${api}/restaurants?${queryString}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  }, [price, minRating, city, foodType, api]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // Pagination logic
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentRestaurants = restaurants.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(restaurants.length / perPage);
  const displayedRestaurants = searchQuery ? filteredRestaurants : currentRestaurants;


  const resetFilters = () => {
    setPrice('');
    setMinRating('');
    setCity('');
    setFoodType('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const q = value.toLowerCase().trim();

    const filtered = restaurants.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    });

    setFilteredRestaurants(filtered);
    setCurrentPage(1);
  };

  return (
    <div style={{ marginTop: '8rem' }}>
      <Box sx={{ minHeight: { xs: '50vh', sm: '100vh' }, p: 4 }}>
        <Typography
          variant="h3"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mb: 4,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#ff7043',
            fontWeight: 600,
          }}
        >
          Restaurants
        </Typography>

        {/* Filters */}
        <Box component="form" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <TextField
            label="Price"
            select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="$">$</MenuItem>
            <MenuItem value="$$">$$</MenuItem>
            <MenuItem value="$$$">$$$</MenuItem>
            <MenuItem value="$$$$">$$$$</MenuItem>
          </TextField>
          <TextField
            sx={{ minWidth: 150 }}
            label="Min Rating"
            type="number"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            inputProps={{ min: 0, max: 10 }}
          />
          <TextField
            onChange={handleChange}
            value={searchQuery}
            type='text'
            label='search'
          ></TextField>
          {/* <TextField label="City" value={city} onChange={(e) => handleChange(e.target.value)} /> */}
          <TextField label="Food Type" value={foodType} onChange={(e) => setFoodType(e.target.value)} />
          <Button sx={{ backgroundColor: '#ff7043' }} variant="contained" onClick={fetchRestaurants}>
            Apply Filters
          </Button>
          <Button sx={{ backgroundColor: '#ff7043' }} variant="contained" onClick={resetFilters}>
            Clear Filters
          </Button>
        </Box>

        {/* Restaurant grid */}
        <Grid container spacing={5} justifyContent="center">
          {displayedRestaurants.map((restaurant, index) => (
            <Grid
              key={restaurant.id ?? `${restaurant.name}-${index}`} // fallback key
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Paper
                onClick={() => navigate(`/restaurants/${restaurant.id}`, { state: restaurant })}
                elevation={3}
                sx={{
                  p: 3,
                  height: 180,
                  width: 200,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {restaurant.name}
                </Typography>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  {restaurant.city}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                  {restaurant.category}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ff7043', fontWeight: 500 }}>
                  {restaurant.rating ? `Rating: ${restaurant.rating} ⭐` : 'Not yet rated'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ff7043', fontWeight: 500 }}>
                  Price: {'$'.repeat(restaurant.price || 0)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
              Previous
            </Button>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
}
