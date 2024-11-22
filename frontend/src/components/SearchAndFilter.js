import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Container,
  Paper,
  InputAdornment,
  Button,
} from '@mui/material';
import { Search, Star, CalendarToday } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import AddReviewForm from './ReviewForm/AddReviewForm';

export default function SearchFilters({
  setSearchQuery,
  setRating,
  setDateOrder,
  searchQuery,
  rating,
  dateOrder,
  fetchData
}) {
  const theme = useTheme();
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleDateOrderChange = (e) => {
    setDateOrder(e.target.value);
  };

  const handleAddBookReview = () => {
    console.log('Add Book Review button clicked');
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          background: `${theme.palette.primary.main}`,
          boxShadow: theme.shadows[8],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            color="white"
            sx={{
              marginBottom: 2,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 1.2,
            }}
          >
            Search and Filter
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            size="small"
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'white' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '100%',
              maxWidth: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                color: 'white',
                '&:hover fieldset': {
                  borderColor: theme.palette.secondary.dark,
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
            }}
          />
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: 'white' }}>Filter by Rating</InputLabel>
            <Select
              value={rating}
              onChange={handleRatingChange}
              label="Filter by Rating"
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <Star sx={{ color: 'white' }} />
                </InputAdornment>
              }
              sx={{
                borderRadius: 3,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.secondary.main,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.secondary.dark,
                },
              }}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value="1">1 Star</MenuItem>
              <MenuItem value="2">2 Stars</MenuItem>
              <MenuItem value="3">3 Stars</MenuItem>
              <MenuItem value="4">4 Stars</MenuItem>
              <MenuItem value="5">5 Stars</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: 'white' }}>Sort by Date</InputLabel>
            <Select
              value={dateOrder}
              onChange={handleDateOrderChange}
              label="Sort by Date"
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <CalendarToday sx={{ color: 'white' }} />
                </InputAdornment>
              }
              sx={{
                borderRadius: 3,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.secondary.main,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.secondary.dark,
                },
              }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          {loggedIn && (
            <AddReviewForm fetchData={fetchData}/>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
