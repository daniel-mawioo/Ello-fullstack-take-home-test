import React, { useContext } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';
import { useBooks } from '../hooks/useBooks';
import { SearchContext } from '../context/SearchContext';
import { ReadingListContext } from '../context/ReadingListContext';

const BookList = () => {
  const { loading, error, books } = useBooks();
  const { searchQuery } = useContext(SearchContext);
  const { addBook } = useContext(ReadingListContext);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading books.</Typography>;

  return (
    <Grid container spacing={2}>
      {filteredBooks.length === 0 && <Typography>No books found.</Typography>}
      {filteredBooks.map((book) => (
        <Grid item key={book.title} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image={book.coverPhotoURL}
              alt={book.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author}
              </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Button variant="contained" color="primary" fullWidth onClick={() => addBook(book)}>
                Add to Reading List
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
