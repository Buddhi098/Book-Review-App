import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    Rating,
    Alert,
    Stack,
    Autocomplete,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import apiClient from '../../api/apiClient';

const AddReviewForm = ({ fetchData }) => {
    const theme = useTheme();

    const [existingBooks, setExistingBooks] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorsResponse = await apiClient.get('/authors');
                const booksResponse = await apiClient.get('/books');
                setExistingBooks(booksResponse.data);
                setAuthors(authorsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        rating: 0,
        reviewText: '',
    });

    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

    const [openModal, setOpenModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleRatingChange = (event, newValue) => {
        console.log(newValue);
        setFormData({ ...formData, rating: newValue });
        setErrors({ ...errors, rating: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Book title is required.';
        if (!formData.author) newErrors.author = 'Author name is required.';
        if (!formData.rating) newErrors.rating = 'Please provide a rating.';
        if (!formData.reviewText || formData.reviewText.length < 10)
            newErrors.reviewText = 'Review text must be at least 10 characters long.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const postData = async () => {
            try {
                const userID = localStorage.getItem('userID');
                const requestData = {
                    userId: userID,
                    bookTopic: formData.title,
                    bookAuthor: formData.author,
                    rating: formData.rating,
                    reviewText: formData.reviewText,
                };
                const response = await apiClient.post('', requestData);
                console.log(response.data);

                setResponseMessage({ type: 'success', text: 'Review submitted successfully!' });
                setFormData({ title: '', author: '', rating: 0, reviewText: '' });

                fetchData();
            } catch (error) {
                setResponseMessage({ type: 'error', text: 'Failed to submit the review. Please try again.' });
                console.error('Error posting data:', error);
            }
        };
        postData();
    };

    const handleOpenModal = () => {
        setResponseMessage({ type: '', text: '' });
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    return (
        <Box>
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    borderRadius: 3,
                    padding: '8px 16px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    marginBottom: 2,
                }}
                onClick={handleOpenModal}
            >
                + Book Review
            </Button>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 500 },
                        bgcolor: theme.palette.background.paper,
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                        Add a New Review
                    </Typography>

                    {responseMessage.text && (
                        <Alert severity={responseMessage.type} sx={{ mb: 2 }}>
                            {responseMessage.text}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <Stack spacing={2}>
                            <Autocomplete
                                value={formData.title}
                                onChange={(event, newValue) => {
                                    setFormData({ ...formData, title: newValue });
                                    setErrors({ ...errors, title: '' });
                                }}
                                options={existingBooks}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Book Title"
                                        name="title"
                                        onChange={handleChange}
                                        error={!!errors.title}
                                        helperText={errors.title}
                                        fullWidth
                                    />
                                )}
                            />

                            <Autocomplete
                                value={formData.author}
                                onChange={(event, newValue) => {
                                    setFormData({ ...formData, author: newValue });
                                    setErrors({ ...errors, author: '' });
                                }}
                                options={authors}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Author Name"
                                        name="author"
                                        onChange={handleChange}
                                        error={!!errors.author}
                                        helperText={errors.author}
                                        fullWidth
                                    />
                                )}
                            />

                            <Box>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Rating
                                </Typography>
                                <Rating
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleRatingChange}
                                    precision={1}
                                    sx={{ color: theme.palette.secondary.main }}
                                />
                                {errors.rating && (
                                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                        {errors.rating}
                                    </Typography>
                                )}
                            </Box>

                            <TextField
                                label="Review Text"
                                name="reviewText"
                                value={formData.reviewText}
                                onChange={handleChange}
                                error={!!errors.reviewText}
                                helperText={errors.reviewText}
                                fullWidth
                                multiline
                                rows={4}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.common.white,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Submit Review
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default AddReviewForm;
