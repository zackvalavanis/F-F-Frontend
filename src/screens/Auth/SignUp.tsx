import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import './SignUp.css'
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const api = import.meta.env.VITE_BACKEND_HOST
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const formObj = Object.fromEntries(formData.entries())

    try {
      const res = await fetch(`${api}/users`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formObj)
      })
      console.log(res)
      const data = await res.json()
      console.log('Response:', data)
      if (res.ok) {
        alert('User created')
        navigate('/')
      } else {
        alert('error: User not created')
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className='sign-up-page'>
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
            Sign Up
          </Typography>
          <form onSubmit={handleSignUp}>
            <TextField
              fullWidth
              label="name"
              type="name"
              name="name"
              // value={ }
              // onChange={ }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              // value={ }
              // onChange={ }
              margin="normal"
            />
            <TextField
              fullWidth
              label="password"
              type="password"
              name="password"
              // value={ }
              // onChange={ }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password Confirmation"
              type="Password"
              name="password_confirmation"
              // value={formData.password}
              // onChange={handleChange}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
            >
              Sign Up
            </Button>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#ff5722' } }}
            >
              Sign up with Google
            </Button>

          </form>
        </Paper>
      </Box>
    </div >
  )
}