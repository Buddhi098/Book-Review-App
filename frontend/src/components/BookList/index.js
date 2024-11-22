import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Container,
    Paper,
    Grid,
    Pagination,
    Typography,
    Box,
    Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Book from './Book';
import apiClient from '../../api/apiClient';
import api from '../../api/api';

const BookList = ({ searchQuery, rating, dateOrder }) => {
    const theme = useTheme();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/book-detailed-stats")
                console.log(response.data)
                setBooks(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6;

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredBooks = books
        .filter((book) =>
            book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (Math.floor(book.averageRating) == rating || rating == "none")
        )
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateOrder === 'asc') return dateA - dateB;
            return dateB - dateA;
        });

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const currentBooks = filteredBooks.slice(startIndex, endIndex);

    const navigate = useNavigate();

    const handleNavigate = (book) => {
        const data = book;

        navigate(`/book/${book.bookName}`, { state: { data } });
    }

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    background: `${theme.palette.primary.main}`,
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
                    Explore Books
                </Typography>

                <Grid container spacing={3}>
                    {currentBooks.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <Box onClick={()=>handleNavigate(book)}>
                                <Book
                                    name={book.bookName}
                                    author={book.bookAuthor}
                                    rating={book.averageRating}
                                />
                            </Box>

                        </Grid>
                    ))}
                </Grid>
                
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 4,
                    }}
                >
                    <Pagination
                        count={Math.ceil(filteredBooks.length / booksPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="secondary"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'gray',
                            },
                            '& .Mui-selected': {
                                color: `${theme.palette.common.white}`,
                                backgroundColor: `${theme.palette.secondary.main}`,
                            },
                        }}
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default BookList;
