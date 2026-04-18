import React from 'react';
import { Box, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'motion/react';

const CATEGORIES = [
  { name: 'Podcasts', color: '#6750A4' },
  { name: 'Made For You', color: '#006491' },
  { name: 'New Releases', color: '#8C4A60' },
  { name: 'Discover', color: '#3B6939' },
  { name: 'Live Events', color: '#7D5260' },
  { name: 'Pop', color: '#984061' },
  { name: 'Hip-Hop', color: '#006874' },
  { name: 'Rock', color: '#9C4239' },
];

export default function Discover() {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Browse all
      </Typography>

      <Grid container spacing={3}>
        {CATEGORIES.map((category, index) => (
          <Grid key={category.name} sx={{ width: { xs: '50%', sm: '33.33%', md: '25%' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                sx={{
                  height: 160,
                  bgcolor: category.color,
                  color: 'white',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    filter: 'brightness(1.1)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                </CardContent>
                {/* Decorative circle */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
