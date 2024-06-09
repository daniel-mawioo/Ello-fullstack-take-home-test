import React, { useContext, useState, useRef } from 'react';
import { TextField, Box, CircularProgress, Grid, Card, CardMedia, CardContent, Typography, Button, Popper, Paper, ClickAwayListener, IconButton, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useBooks } from '../hooks/useBooks';
import { SearchContext } from '../context/SearchContext';
import { ReadingListContext } from '../context/ReadingListContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { updateSearchQuery } = useContext(SearchContext);
  const { readingList, addBook } = useContext(ReadingListContext);
  const { loading, error, books } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    updateSearchQuery(query);
    if (query) {
      const filtered = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredBooks(filtered);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddBook = (book) => {
    if (readingList.some(item => item.title === book.title)) {
      setSnackbarMessage('Book is already in the reading list');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    } else {
      addBook(book);
      setSnackbarMessage('Book added to the reading list');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  const handleCardClick = (title) => {
    navigate(`/book/${title}`);
  };

  return (
    <Box>
      <Box my={2} ref={anchorRef}>
        <TextField
          label="Search Books"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
        />
      </Box>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" style={{ zIndex: 1300 }}>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper elevation={3} sx={{ maxHeight: 400, overflow: 'auto', mt: 1, width: anchorRef.current ? anchorRef.current.clientWidth : 'auto', position: 'relative' }}>
            <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
            <Box p={2} pt={5}>
              {loading && <CircularProgress />}
              {error && <Typography color="error">Error loading books.</Typography>}
              <Grid container spacing={2}>
                {filteredBooks.length === 0 && <Typography>No books found.</Typography>}
                {filteredBooks.map((book) => (
                  <Grid item key={book.title} xs={12}>
                    <Card
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        boxShadow: 3,
                        m: 2,
                        p: 2,
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleCardClick(book.title)}
                    >
                      <Box sx={{ flexShrink: 0, width: 100, height: 140, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
                        <CardMedia
                          component="img"
                          sx={{ maxHeight: '100%', maxWidth: '100%' }}
                          image={book.coverPhotoURL}
                          alt={book.title}
                        />
                      </Box>
                      <CardContent sx={{ flex: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', pb: 1 }}>
                          {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', pb: 1 }}>
                          {book.author}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            handleAddBook(book);
                          }}
                        >
                          Add
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchBar;
