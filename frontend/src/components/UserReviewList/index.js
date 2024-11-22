import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Container,
    Paper,
    Grid,
    Pagination,
    Typography,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Review from './Review';
import apiClient from '../../api/apiClient';

const UserReviewList = ({ searchQuery = '', rating = 'none', dateOrder = 'desc' , reviews , fetchData}) => {
    const theme = useTheme();
    
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6;

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredReviews = reviews
        .filter((review) =>
            review.bookTopic.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (Math.floor(review.rating) === Number(rating) || rating === 'none')
        )
        .sort((a, b) => {
            const dateA = new Date(a.addedDate);
            const dateB = new Date(b.addedDate);
            return dateOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const currentReviews = filteredReviews.slice(startIndex, endIndex);

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    background: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        marginBottom: 3,
                        fontWeight: 'bold',
                        color: theme.palette.common.white,
                    }}
                >
                    Manage Your Reviews
                </Typography>

                <Grid container spacing={3}>
                    {currentReviews.length > 0 ? (
                        currentReviews.map((review) => (
                            <Grid item xs={12} sm={6} md={4} key={review.id}>
                                <Link to="#" style={{ textDecoration: 'none' }}>
                                    <Review review={review} fetchData={fetchData} key={review.id}/>
                                </Link>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{ textAlign: 'center', width: '100%', marginTop: 3 }}
                        >
                            No reviews found matching your criteria.
                        </Typography>
                    )}
                </Grid>

                {filteredReviews.length > booksPerPage && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 4,
                        }}
                    >
                        <Pagination
                            count={Math.ceil(filteredReviews.length / booksPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="secondary"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: 'gray',
                                },
                                '& .Mui-selected': {
                                    color: theme.palette.common.white,
                                    backgroundColor: theme.palette.secondary.main,
                                },
                            }}
                        />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default UserReviewList;
