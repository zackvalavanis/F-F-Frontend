import { Box, Modal, Typography } from '@mui/material';
import React from 'react';

interface LikeModalProps {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function LikeModal({ show, onClose, children }: LikeModalProps) {
  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="like-modal-title"
      aria-describedby="like-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          width: { xs: 300, sm: 400 },
        }}
      >
        <Typography id="like-modal-title" variant="h6" gutterBottom>
          Copied to clipboard!
        </Typography>
        {children}
      </Box>
    </Modal>
  );
}
