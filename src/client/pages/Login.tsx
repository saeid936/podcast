import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real scenario, this fetches from /api/auth/login
    // For the UI demo, we'll mock a successful login
    setUser({ id: 'user-1', email, role: 'CREATOR' });
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper sx={{ p: 5, width: '100%', maxWidth: 400, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
          AudioStream Pro
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to continue listening
        </Typography>

        <form onSubmit={handleLogin}>
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
            Sign In
          </Button>
        </form>

        <Typography variant="body2" color="text.secondary">
          Don't have an account? <Link href="/register" underline="hover">Sign up</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
