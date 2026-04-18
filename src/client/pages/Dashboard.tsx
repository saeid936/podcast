import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, useTheme, Avatar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { usePlayerStore } from '../store/playerStore';
import { motion } from 'motion/react';
import DashboardSkeleton from '../components/ui/DashboardSkeleton';

const MOCK_PODCASTS = [
  { id: '1', title: 'The Tech Daily', artistName: 'Tech Network', coverUrl: 'https://picsum.photos/seed/tech/300/300' },
  { id: '2', title: 'Design Matters', artistName: 'Creative Studio', coverUrl: 'https://picsum.photos/seed/design/300/300' },
  { id: '3', title: 'Startup Stories', artistName: 'Founders Inc', coverUrl: 'https://picsum.photos/seed/startup/300/300' },
  { id: '4', title: 'Mindful Moments', artistName: 'Zen Health', coverUrl: 'https://picsum.photos/seed/zen/300/300' },
];

const RECENTLY_PLAYED = [
  { id: 'r1', title: 'Deep Focus', artist: 'Ambient Flow', cover: 'https://picsum.photos/seed/focus/100/100' },
  { id: 'r2', title: 'Morning Coffee', artist: 'Jazz Vibes', cover: 'https://picsum.photos/seed/coffee/100/100' },
  { id: 'r3', title: 'Coding Session', artist: 'Lo-Fi Beats', cover: 'https://picsum.photos/seed/code/100/100' },
  { id: 'r4', title: 'Evening Chill', artist: 'Sunset Soul', cover: 'https://picsum.photos/seed/chill/100/100' },
];

export default function Dashboard() {
  const theme = useTheme();
  const play = usePlayerStore((state) => state.play);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = (track: any) => {
    play({
      id: track.id,
      title: track.title,
      artistName: track.artistName || track.artist,
      coverUrl: track.coverUrl || track.cover,
    });
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, letterSpacing: -0.5 }}>
        Good Morning
      </Typography>

      {/* Recently Played Grid */}
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {RECENTLY_PLAYED.map((item) => (
          <Grid key={item.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
            <Card
              onClick={() => handlePlay(item)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'background.paper',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover',
                  '& .play-icon': { opacity: 1 }
                }
              }}
            >
              <Avatar
                variant="square"
                src={item.cover}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box sx={{ flexGrow: 1, minWidth: 0, pr: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} noWrap>
                  {item.title}
                </Typography>
              </Box>
              <IconButton
                className="play-icon"
                sx={{
                  mr: 2,
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                <PlayArrowIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Trending Podcasts
      </Typography>
      
      <Grid container spacing={3}>
        {MOCK_PODCASTS.map((podcast, index) => (
          <Grid key={podcast.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                sx={{ 
                  bgcolor: 'background.paper', 
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                    '& .play-button': { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={podcast.coverUrl}
                    alt={podcast.title}
                    sx={{ borderRadius: '16px 16px 0 0' }}
                  />
                  <IconButton
                    className="play-button"
                    onClick={() => handlePlay(podcast)}
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      opacity: 0,
                      transform: 'translateY(10px)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.1)' },
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    <PlayArrowIcon fontSize="large" />
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                    {podcast.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {podcast.artistName}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
