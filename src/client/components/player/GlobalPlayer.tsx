import React, { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { Box, IconButton, Slider, Typography, useTheme, Avatar, Stack, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function GlobalPlayer() {
  const theme = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(1);
  
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    isLiked,
    togglePlayPause,
    setVolume,
    setProgress,
    setDuration,
    toggleLike,
  } = usePlayerStore();

  // Handle Play/Pause sync with audio element
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error('Playback failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Handle Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (_: Event, newValue: number | number[]) => {
    const newTime = newValue as number;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const newVol = (newValue as number) / 100;
    setVolume(newVol);
    if (newVol > 0) setIsMuted(false);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolume(0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        px: 3,
        zIndex: 1300,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
      }}
    >
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={`/api/media/stream/${currentTrack.id}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => usePlayerStore.getState().pause()}
      />

      {/* Track Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '30%', minWidth: 200 }}>
        <Avatar
          variant="rounded"
          src={currentTrack.coverUrl || 'https://picsum.photos/seed/music/100/100'}
          sx={{ width: 56, height: 56, mr: 2, boxShadow: 2 }}
        />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} noWrap>
            {currentTrack.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {currentTrack.artistName}
          </Typography>
        </Box>
        <IconButton 
          size="small" 
          onClick={toggleLike}
          sx={{ 
            ml: 1, 
            color: isLiked ? 'primary.main' : 'text.secondary',
            '&:hover': { color: isLiked ? 'primary.dark' : 'text.primary' }
          }}
        >
          {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
      </Box>

      {/* Player Controls */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title="Shuffle">
            <IconButton size="small" color="inherit" sx={{ opacity: 0.7 }}>
              <ShuffleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton color="inherit">
            <SkipPreviousIcon />
          </IconButton>
          <IconButton
            onClick={togglePlayPause}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 40,
              height: 40,
              '&:hover': { bgcolor: 'primary.dark' },
              boxShadow: theme.shadows[2],
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton color="inherit">
            <SkipNextIcon />
          </IconButton>
          <Tooltip title="Repeat">
            <IconButton size="small" color="inherit" sx={{ opacity: 0.7 }}>
              <RepeatIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2, mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ minWidth: 35 }} data-testid="progress-time">
            {formatTime(progress)}
          </Typography>
          <Slider
            size="small"
            value={progress}
            max={duration || 100}
            onChange={handleSeek}
            sx={{
              color: 'primary.main',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 0,
                height: 0,
                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                '&:before': {
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                },
                '&.Mui-active': {
                  width: 12,
                  height: 12,
                },
              },
              '& .MuiSlider-rail': {
                opacity: 0.28,
              },
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ minWidth: 35 }} data-testid="duration-time">
            {formatTime(duration)}
          </Typography>
        </Box>
      </Box>

      {/* Volume Control */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '30%', justifyContent: 'flex-end', gap: 2 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', width: 150 }}>
          <IconButton size="small" onClick={handleToggleMute}>
            {isMuted || volume === 0 ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
          </IconButton>
          <Slider
            size="small"
            value={volume * 100}
            onChange={handleVolumeChange}
            sx={{
              color: 'text.secondary',
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                bgcolor: 'text.primary',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                },
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
