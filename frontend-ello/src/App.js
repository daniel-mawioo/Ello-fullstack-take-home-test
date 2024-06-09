import React from "react";
import {
  Container,
  Typography,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApolloProviderWrapper from "./apollo/client";
import SearchBar from "./components/SearchBar";
import ReadingList from "./components/ReadingList";
import BookDetail from "./components/BookDetail";
import { ReadingListProvider } from "./context/ReadingListContext";
import { SearchProvider } from "./context/SearchContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5Acccc",
    },
    background: {
      default: "rgb(243, 244, 246)",
    },
  },
});

const App = () => {
  return (
    <ApolloProviderWrapper>
      <ThemeProvider theme={theme}>
        <Router>
          <SearchProvider>
            <ReadingListProvider>
              <CssBaseline />
              <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                  Ello Book Assignment
                </Typography>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <>
                        <SearchBar />
                        <Typography variant="h5" component="h2" gutterBottom>
                          Reading List
                        </Typography>
                        <ReadingList />
                      </>
                    }
                  />
                  <Route path="/book/:title" element={<BookDetail />} />
                </Routes>
              </Container>
            </ReadingListProvider>
          </SearchProvider>
        </Router>
      </ThemeProvider>
    </ApolloProviderWrapper>
  );
};

export default App;
