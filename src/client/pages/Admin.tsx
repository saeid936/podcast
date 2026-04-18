import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Grid } from '@mui/material';

const MOCK_USERS = [
  { id: 'u1', email: 'admin@audiostream.com', role: 'ADMIN', status: 'Active' },
  { id: 'u2', email: 'creator@example.com', role: 'CREATOR', status: 'Active' },
  { id: 'u3', email: 'listener@example.com', role: 'LISTENER', status: 'Active' },
  { id: 'u4', email: 'baduser@spam.com', role: 'LISTENER', status: 'Suspended' },
];

export default function Admin() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>1,284</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
            <Typography variant="h6">Active Tracks</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>8,432</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'info.main', color: 'info.contrastText' }}>
            <Typography variant="h6">Reports</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>12</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        User Management
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip label={user.role} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.status} 
                    size="small" 
                    color={user.status === 'Active' ? 'success' : 'error'} 
                  />
                </TableCell>
                <TableCell align="right">
                  <Button size="small">Edit</Button>
                  <Button size="small" color="error">Suspend</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
