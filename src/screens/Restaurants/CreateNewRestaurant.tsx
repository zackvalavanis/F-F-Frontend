import './CreateNewRestaurants.css';
import { Box, Paper, Button, TextField, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';

export function CreateNewRestaurant() {
  const api = import.meta.env.VITE_BACKEND_HOST
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    rating: '',
    food_type: '',
    category: '',
    description: '',
    phone_number: '',
    website: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: '',
    longitude: '',
    opening_hours: '',
    delivery_option: false,
    vegan_friendly: false,
    kid_friendly: false,
    parking: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name as string]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted data:', formData);

    try {
      const res = await fetch(`${api}/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurant: formData })
      })
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className='create-restaurant-page'>
      <Box
        sx={{
          minHeight: '120vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60rem',
            p: 4,
          }}
        >
          <h1 style={{ paddingBottom: '30px' }}>Create a New Restaurant</h1>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              width: '100%',
            }}
          >
            {/* Basic Info */}
            <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} />
            <TextField
              select
              label="Price"
              name="price"
              fullWidth
              value={formData.price}
              onChange={handleChange}
            >
              <MenuItem value="$">$</MenuItem>
              <MenuItem value="$$">$$</MenuItem>
              <MenuItem value="$$$">$$$</MenuItem>
              <MenuItem value="$$$$">$$$$</MenuItem>
            </TextField>

            <TextField
              select
              label="Rating"
              name="rating"
              fullWidth
              value={formData.rating}
              onChange={handleChange}
            >
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="Food Type" name="food_type" fullWidth value={formData.food_type} onChange={handleChange} />
            <TextField label="Category" name="category" fullWidth value={formData.category} onChange={handleChange} />
            <TextField label="Phone Number" name="phone_number" fullWidth value={formData.phone_number} onChange={handleChange} />
            <TextField label="Website" name="website" fullWidth value={formData.website} onChange={handleChange} />
            <TextField label="Email" name="email" fullWidth value={formData.email} onChange={handleChange} />

            {/* Address Section */}
            <TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} />
            <TextField label="City" name="city" fullWidth value={formData.city} onChange={handleChange} />
            <TextField label="State" name="state" fullWidth value={formData.state} onChange={handleChange} />
            <TextField label="Zip Code" name="zip_code" fullWidth value={formData.zip_code} onChange={handleChange} />

            {/* Geo + Details */}
            <TextField label="Latitude" name="latitude" fullWidth value={formData.latitude} onChange={handleChange} />
            <TextField label="Longitude" name="longitude" fullWidth value={formData.longitude} onChange={handleChange} />
            <TextField label="Opening Hours" name="opening_hours" fullWidth value={formData.opening_hours} onChange={handleChange} />
            <TextField label="Parking" name="parking" fullWidth value={formData.parking} onChange={handleChange} />

            {/* Description (Full Width) */}
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              sx={{ gridColumn: 'span 2' }}
              value={formData.description}
              onChange={handleChange}
            />

            {/* Checkboxes (Full Width) */}
            <Box sx={{ gridColumn: 'span 2', display: 'flex', gap: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.delivery_option}
                    onChange={handleChange}
                    name="delivery_option"
                  />
                }
                label="Delivery Option"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.vegan_friendly}
                    onChange={handleChange}
                    name="vegan_friendly"
                  />
                }
                label="Vegan Friendly"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.kid_friendly}
                    onChange={handleChange}
                    name="kid_friendly"
                  />
                }
                label="Kid Friendly"
              />
            </Box>

            <Box sx={{ gridColumn: 'span 2', textAlign: 'center', mt: 2 }}>
              <Button variant="contained" type="submit">
                Submit Restaurant
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
}
