import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real scenario, this fetches from /api/auth/register
    setUser({ id: 'user-1', email, role: 'LISTENER' });
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper sx={{ p: 5, width: '100%', maxWidth: 400, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
          Join AudioStream
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Create an account to save playlists
        </Typography>

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <Button fullWidth variant="contained" size="large" type="submit" sx={{ mb: 2 }}>
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" color="text.secondary">
          Already have an account? <Link href="/login" underline="hover">Sign in</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
