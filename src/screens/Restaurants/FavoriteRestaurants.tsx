import './FavoriteRestaurants.css'
import { useEffect, useState } from 'react'
import { Typography, Paper } from '@mui/material';
import Grid from "@mui/material/Grid"
import { useNavigate } from 'react-router-dom';

interface Restaurant {
  id: number;
  name: string;
  category: string;
  rating: number;
  price: number
}

export function FavoriteRestaurants() {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
  const api = import.meta.env.VITE_BACKEND_HOST;
  const navigate = useNavigate()

  const fetchRestaurants = async () => {
    try {
      const res = await fetch(`${api}/restaurants`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setFavoriteRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const sortedRestaurants = favoriteRestaurants.filter((restaurants) => restaurants.rating >= 8)

  console.log(FavoriteRestaurants)


  return (
    <div className='favorite-restaurants-page'>
      <h1 style={{ marginBottom: '100px', color: '#ff7043' }}>Our Favorites</h1>
      <Grid container spacing={4} justifyContent="center">
        {sortedRestaurants.map((restaurant) => (
          <Grid sx={{ height: { xs: '200px', sm: '400px' }, display: 'flex', flexDirection: 'column' }} key={restaurant.id} spacing={4} justifyContent="center">
            <Paper
              onClick={() => navigate(`/restaurants/${restaurant.id}`, { state: restaurant })}
              elevation={3}
              sx={{
                p: 3,
                height: 120,
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
              <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                {restaurant.category}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ff7043', fontWeight: 500 }}>
                {restaurant.rating ? `Rating: ${restaurant.rating} ⭐` : 'Not yet rated'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ff7043', fontWeight: 500 }}>
                Price: {'$'.repeat(restaurant.price)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>


    </div>
  )
}