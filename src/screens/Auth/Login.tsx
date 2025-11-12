import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import useUser from '../../components/Context/useUser.tsx';
import { useCurrentLocation } from '../../components/Context/get_user_location.tsx';



export function Login() {
  const navigate = useNavigate()
  const { setUser } = useUser()
  const api = import.meta.env.VITE_BACKEND_HOST
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const { getLocation } = useCurrentLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Login data:', formData);
    try {
      const res = await fetch(`${api}/sessions.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const data = await res.json()
        // console.log('Logged in user', data)
        setUser(data)
        localStorage.setItem('jwt', data.jwt)
        getLocation()
        navigate('/')
      } else {
        alert('Incorrect Email or Password')
      }
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <div className='login-page-container'>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 3,
            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#ff7043' }}>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
}
