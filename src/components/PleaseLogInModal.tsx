import {
  Modal,
  Typography,
  Box,
  Button
} from '@mui/material'

import { useNavigate } from 'react-router-dom';

interface PleaseLogInModal {
  show: boolean,
  onClose: () => void;
  children?: React.ReactNode;
}

export function PleaseLogInModal({ show, onClose }: PleaseLogInModal) {
  const navigate = useNavigate()
  return (
    <div>
      <Modal
        open={show}
        onClose={onClose}
      >
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            display: 'flex',
            width: { xs: 300, sm: 400 },
            height: { xs: 580, sm: 300 },
            justifyContent: 'center',
            color: 'black',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }} >
            <Typography variant="h5" textAlign="center">
              Please Log In To Start Rating Recipes
            </Typography>

            <Button sx={{ backgroundColor: '#ff7043' }} variant='contained' onClick={() => navigate('/login')}>
              Log In
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}