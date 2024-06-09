import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const chapters = [
  "Chapter 1: Introduction",
  "Chapter 2: Getting Started",
  "Chapter 3: Deep Dive",
  // Add more chapters as needed
];

const BookDetail = () => {
  const { title } = useParams();
  const [currentChapter, setCurrentChapter] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: 'rgba(243, 244, 246, 0.7)',
        padding: 4,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        {chapters[currentChapter]}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, width: '100%', maxWidth: 600 }}>
        <Button variant="contained" color="primary" onClick={handlePrev} disabled={currentChapter === 0}>
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext} disabled={currentChapter === chapters.length - 1}>
          Next
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default BookDetail;
