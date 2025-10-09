import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import Grid from "@mui/material/Grid"


interface Restaurant {
  id: number;
  name: string;
  category: string;
  rating: number;
  price: number
}

export function Restaurants() {
  const api = import.meta.env.VITE_BACKEND_HOST;
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9; // 3x3 grid

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${api}/restaurants.json`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setRestaurants(data);

      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    fetchRestaurants();
  }, []);
  console.log(restaurants)
  // Pagination logic
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentRestaurants = restaurants.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(restaurants.length / perPage);

  return (
    <div style={{ marginTop: '10rem' }}>
      <Box sx={{ minHeight: '100vh', p: 4 }}>
        <Typography
          variant="h3"
          sx={{ mb: 4, textAlign: 'center', color: '#ff7043', fontWeight: 600 }}
        >
          Restaurants
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {currentRestaurants.map((restaurant) => (
            <Grid container spacing={4} justifyContent="center">
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {restaurant.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                  {restaurant.category}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ff7043', fontWeight: 500 }}>
                  Rating: {restaurant.rating} ⭐
                </Typography>
                <Typography variant="body2" sx={{ color: '#ff7043', fontWeight: 500 }}>
                  Price: {'$'.repeat(restaurant.price)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Pagination buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </div>
  );
}
