import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    Alert,
    Stack,
    Autocomplete,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Edit } from '@mui/icons-material';
import apiClient from '../../api/apiClient';

const UpdateReviewForm = ({ existingReview, fetchData }) => {
    const theme = useTheme();

    const [existingBooks, setExistingBooks] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorsResponse = await apiClient.get('/authors');
                const response = await apiClient.get('/books');
                setExistingBooks(response.data);
                setAuthors(authorsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        title: existingReview.bookTopic || '',
        author: existingReview.bookAuthor || '',
        rating: existingReview.rating || 0,
        reviewText: existingReview.reviewText || '',
    });

    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

    const [openModal, setOpenModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Book title is required.';
        if (!formData.author) newErrors.author = 'Author name is required.';
        if (!formData.rating || formData.rating < 1)
            newErrors.rating = 'Please provide a rating between 1 and 5.';
        if (!formData.reviewText || formData.reviewText.length < 10)
            newErrors.reviewText = 'Review text must be at least 10 characters long.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const updatedReview = async () => {
            try {
                const userID = localStorage.getItem('userID');
                const requestData = {
                    userId: userID,
                    bookTopic: formData.title,
                    bookAuthor: formData.author,
                    rating: formData.rating,
                    reviewText: formData.reviewText,
                };
                const response = await apiClient.put(`/${existingReview.id}`, requestData);
                setResponseMessage({ type: 'success', text: 'Review updated successfully!' });
                fetchData();
            } catch (error) {
                console.error('Error updating review:', error);
                setResponseMessage({ type: 'error', text: 'Failed to update the review. Please try again.' });
            }
        };

        updatedReview();
    };

    const handleOpenModal = () => {
        setResponseMessage({ type: '', text: '' });
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    return (
        <Box>
            <Button
                variant="outlined"
                size="small"
                startIcon={<Edit />}
                onClick={handleOpenModal}
            >
                Edit Review
            </Button>

            <Modal open={openModal} onClose={handleCloseModal} key={existingReview.id}>
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
                        Edit Review
                    </Typography>

                    {responseMessage.text && (
                        <Alert severity={responseMessage.type} sx={{ mb: 2 }}>
                            {responseMessage.text}
                        </Alert>
                    )}

                    <form noValidate>
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
                                <FormControl fullWidth error={!!errors.rating}>
                                    <InputLabel id="rating-label">Rating</InputLabel>
                                    <Select
                                        labelId="rating-label"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        label="Rating"
                                    >
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <MenuItem key={value} value={value}>
                                                {value} Star{value > 1 ? 's' : ''}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.rating && (
                                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                            {errors.rating}
                                        </Typography>
                                    )}
                                </FormControl>
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
                                onClick={handleSubmit}
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

export default UpdateReviewForm;
