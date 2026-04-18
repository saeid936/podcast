import React from 'react';
import { Box, Typography, Avatar, Button, List, ListItem, ListItemText, IconButton, Divider, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { usePlayerStore } from '../store/playerStore';

const MOCK_TRACKS = [
  { id: 't1', title: 'Midnight City', artist: 'M83', duration: '4:03' },
  { id: 't2', title: 'Starboy', artist: 'The Weeknd', duration: '3:50' },
  { id: 't3', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
  { id: 't4', title: 'Levitating', artist: 'Dua Lipa', duration: '3:23' },
  { id: 't5', title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35' },
];

export default function PlaylistDetail() {
  const play = usePlayerStore((state) => state.play);

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3, mb: 4, mt: 2 }}>
        <Avatar
          variant="square"
          src="https://picsum.photos/seed/playlist/300/300"
          sx={{ width: 232, height: 232, boxShadow: 10, borderRadius: 2 }}
        />
        <Box>
          <Typography variant="overline" sx={{ fontWeight: 'bold' }}>
            Playlist
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2rem', md: '4rem' } }}>
            Today's Top Hits
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              AudioStream
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              • 1,234,567 likes • 50 songs, 2 hr 35 min
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Action Bar */}
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon fontSize="large" />}
          onClick={() => play({ id: 'p1', title: "Today's Top Hits", artistName: 'Various Artists' })}
          sx={{ borderRadius: 10, px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Play
        </Button>
        <IconButton size="large">
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
        <IconButton size="large">
          <MoreHorizIcon fontSize="large" />
        </IconButton>
      </Stack>

      {/* Tracks Table Header */}
      <Box sx={{ px: 2, mb: 1, display: 'flex', color: 'text.secondary', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: 1 }}>
        <Box sx={{ width: 40 }}>#</Box>
        <Box sx={{ flexGrow: 1 }}>Title</Box>
        <Box sx={{ width: 100, textAlign: 'right' }}><AccessTimeIcon fontSize="small" /></Box>
      </Box>
      <Divider sx={{ mb: 1 }} />

      {/* Tracks List */}
      <List sx={{ p: 0 }}>
        {MOCK_TRACKS.map((track, index) => (
          <ListItem
            key={track.id}
            disablePadding
            sx={{
              '&:hover': { bgcolor: 'action.hover' },
              borderRadius: 1,
              mb: 0.5
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1,
                cursor: 'pointer'
              }}
              onClick={() => play({ id: track.id, title: track.title, artistName: track.artist })}
            >
              <Typography sx={{ width: 40, color: 'text.secondary' }}>{index + 1}</Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {track.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {track.artist}
                </Typography>
              </Box>
              <Typography sx={{ width: 100, textAlign: 'right', color: 'text.secondary' }}>
                {track.duration}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
