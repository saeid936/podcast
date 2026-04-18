import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Divider, ListItemButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { usePlayerStore } from '../store/playerStore';
import { useNavigate } from 'react-router-dom';

const MOCK_LIBRARY = [
  { id: 'l1', title: 'My Awesome Playlist', type: 'Playlist', count: '12 tracks', cover: 'https://picsum.photos/seed/p1/100/100' },
  { id: 'l2', title: 'Late Night Jazz', type: 'Playlist', count: '45 tracks', cover: 'https://picsum.photos/seed/p2/100/100' },
  { id: 'l3', title: 'Morning Coffee', type: 'Playlist', count: '20 tracks', cover: 'https://picsum.photos/seed/p3/100/100' },
  { id: 'l4', title: 'Workout Mix', type: 'Playlist', count: '15 tracks', cover: 'https://picsum.photos/seed/p4/100/100' },
];

export default function Library() {
  const play = usePlayerStore((state) => state.play);
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Your Library
      </Typography>

      <List sx={{ bgcolor: 'background.paper', borderRadius: 4, overflow: 'hidden' }}>
        {MOCK_LIBRARY.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton edge="end">
                  <MoreVertIcon />
                </IconButton>
              }
              sx={{
                '&:hover': {
                  bgcolor: 'action.hover',
                  '& .play-btn': { opacity: 1 }
                }
              }}
            >
              <ListItemButton onClick={() => navigate(`/playlist/${item.id}`)} sx={{ py: 2 }}>
                <ListItemAvatar sx={{ mr: 2, position: 'relative' }}>
                  <Avatar
                    variant="rounded"
                    src={item.cover}
                    sx={{ width: 64, height: 64 }}
                  />
                  <IconButton
                    className="play-btn"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      play({ id: item.id, title: item.title, artistName: 'Various Artists' });
                    }}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'primary.main',
                      color: 'white',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={`${item.type} • ${item.count}`}
                  slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                />
              </ListItemButton>
            </ListItem>
            {index < MOCK_LIBRARY.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
