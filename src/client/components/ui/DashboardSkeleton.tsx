import React from 'react';
import { Box, Skeleton, Grid } from '@mui/material';

export default function DashboardSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" sx={{ fontSize: '2.5rem', mb: 4, width: '30%' }} />
      
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Grid key={i} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>

      <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 3, width: '20%' }} />
      
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid key={i} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '16px 16px 0 0' }} />
            <Box sx={{ pt: 1 }}>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%' }} />
              <Skeleton variant="text" sx={{ fontSize: '0.8rem', width: '60%' }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
