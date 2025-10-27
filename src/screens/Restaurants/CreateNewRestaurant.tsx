import './CreateNewRestaurants.css';
import { Box, Paper, Button, TextField, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';

export function CreateNewRestaurant() {
  const api = import.meta.env.VITE_BACKEND_HOST;
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
        body: JSON.stringify({ restaurant: formData }),
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: { xs: '50px', sm: '150px' },
        minHeight: '120vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        sx={{
          width: { xs: '100%', sm: '60rem' },
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create a New Restaurant</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
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

          {/* Address */}
          <TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} />
          <TextField label="City" name="city" fullWidth value={formData.city} onChange={handleChange} />
          <TextField label="State" name="state" fullWidth value={formData.state} onChange={handleChange} />
          <TextField label="Zip Code" name="zip_code" fullWidth value={formData.zip_code} onChange={handleChange} />

          {/* Geo + Details */}
          <TextField label="Latitude" name="latitude" fullWidth value={formData.latitude} onChange={handleChange} />
          <TextField label="Longitude" name="longitude" fullWidth value={formData.longitude} onChange={handleChange} />
          <TextField label="Opening Hours" name="opening_hours" fullWidth value={formData.opening_hours} onChange={handleChange} />
          <TextField label="Parking" name="parking" fullWidth value={formData.parking} onChange={handleChange} />

          {/* Description */}
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />

          {/* Checkboxes */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={<Checkbox checked={formData.delivery_option} onChange={handleChange} name="delivery_option" />}
              label="Delivery Option"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.vegan_friendly} onChange={handleChange} name="vegan_friendly" />}
              label="Vegan Friendly"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.kid_friendly} onChange={handleChange} name="kid_friendly" />}
              label="Kid Friendly"
            />
          </Box>

          {/* Submit */}
          <Button variant="contained" type="submit" sx={{ mt: 2, width: '100%' }}>
            Submit Restaurant
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
