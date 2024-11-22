import React, { useState } from 'react';
import { Stack, Typography, Card, CardContent, Box, Pagination, Rating } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useLocation } from 'react-router-dom';

const BookReviews = ({ id }) => {

  const location = useLocation();
  const book = location.state.data;
  console.log("fucj" , book);

  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const totalPages = Math.ceil(book.individualRatings.length / reviewsPerPage);
  const currentReviews = book.individualRatings.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Stack spacing={3} padding={4} sx={{minWidth:{sm:"400px" , md:"800px" , lg:"800px"}}}>
        <Card
          sx={{
            padding: 4,
            backgroundColor: `${theme.palette.primary.main}`,
            color: theme.palette.common.white,
            borderRadius: 4,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {book.bookName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Author:</strong> {book.bookAuthor}
            </Typography>
            <Typography variant="h6">
              <strong>Average Rating:</strong> {book.averageRating}
            </Typography>
            <Box marginTop={1}>
              <Rating value={book.averageRating} readOnly />
            </Box>
          </CardContent>
        </Card>

        <Stack spacing={3} sx={{minHeight:"80vh"}}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Reviews
          </Typography>
          {book.individualRatings.map((rating, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 4,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: 2,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  <strong>{rating.username}</strong>: {rating.reviewText}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
                  <Rating value={rating.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({rating.rating}/5)
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Date: {rating.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Box display="flex" justifyContent="center" marginTop={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
      </Stack>
    </Stack>
  );
};

export default BookReviews;
