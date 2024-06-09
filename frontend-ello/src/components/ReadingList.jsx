import React, { useContext, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import { ReadingListContext } from "../context/ReadingListContext";
import { useNavigate } from 'react-router-dom';

const ReadingList = () => {
  const { readingList, removeBook } = useContext(ReadingListContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  const handleViewClick = (title) => {
    navigate(`/book/${title}`);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Pagination logic
  const paginatedReadingList = readingList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {readingList.length === 0 && (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            No books in the reading list.
          </Typography>
        )}
        {paginatedReadingList.map((book) => (
          <Grid item key={book.title} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxShadow: 3,
                p: 2,
                backgroundColor: "#fff",
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 200,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ maxHeight: "100%", maxWidth: "100%", borderRadius: 2 }}
                  image={book.coverPhotoURL}
                  alt={book.title}
                />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', gap: 1, p: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => handleViewClick(book.title)}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#f76434",
                    "&:hover": {
                      backgroundColor: "#e05d30",
                    },
                    color: "#ffffff",
                  }}
                  onClick={() => removeBook(book)}
                >
                  Remove
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {readingList.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(readingList.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ReadingList;
