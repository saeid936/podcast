import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) return;
    setIsUploading(true);
    
    try {
      // Simulate upload for UI demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the uploaded track title in sessionStorage for demo persistence
      const uploadedTracks = JSON.parse(sessionStorage.getItem('uploadedTracks') || '[]');
      uploadedTracks.push({
        id: `u-${Date.now()}`,
        title,
        artistName: 'My Channel',
        coverUrl: 'https://picsum.photos/seed/upload/300/300'
      });
      sessionStorage.setItem('uploadedTracks', JSON.stringify(uploadedTracks));

      alert('Upload successful! It is now processing in the background.');
      setTitle('');
      setFile(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Upload Media
      </Typography>
      
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <TextField
          fullWidth
          label="Track / Episode Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
        />
        
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            p: 6,
            textAlign: 'center',
            mb: 3,
            bgcolor: 'background.default',
            cursor: 'pointer',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' }
          }}
          component="label"
        >
          <input
            type="file"
            hidden
            accept="audio/*"
            onChange={handleFileChange}
          />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            {file ? file.name : 'Click or drag audio file to upload'}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!file || !title || isUploading}
          onClick={handleUpload}
          startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isUploading ? 'Uploading & Processing...' : 'Publish Track'}
        </Button>
      </Paper>
    </Box>
  );
}
