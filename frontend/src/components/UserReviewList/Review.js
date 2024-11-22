import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Modal,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete, Close } from "@mui/icons-material";
import UpdateReviewForm from "../ReviewForm/UpdateReviewForm";
import apiClient from "../../api/apiClient";

const Review = ({ review , fetchData}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteDialogOpen = () => setOpenDeleteDialog(true);
  const handleDeleteDialogClose = () => setOpenDeleteDialog(false);

  const handleDelete = () => {
    console.log("Delete review");
    const deleteReview = async () => {
      try {
        const response = await apiClient.delete(`/${review.id}`);
        console.log("Review deleted successfully", response);
        fetchData();
      } catch (error) {
        console.error("Failed to delete review", error);
      }
    }
    deleteReview();

    handleDeleteDialogClose();
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 500,
          margin: "20px auto",
          borderRadius: 2,
          boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
        }}
      >
        <CardContent onClick={handleOpenModal}>
          <Typography variant="h5" fontWeight="bold">
            {review?.bookTopic || "Book Name"}
          </Typography>
          <Typography variant="body2" fontStyle="italic">
            Author: {review.bookAuthor || "Unknown Author"}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: "pointer",
            }}
          >
            {review.reviewText}
          </Typography>
          <Rating
            value={review.rating || 0}
            precision={0.5}
            readOnly
            sx={{ marginTop: 1 }}
          />
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: "block", marginTop: 1 }}
          >
            Added on: {review.addedDate || "Unknown Date"}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <UpdateReviewForm existingReview={review} fetchData={fetchData}/>
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={handleDeleteDialogOpen}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            padding: 4,
            maxWidth: 600,
            width: "90%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography id="review-modal-title" variant="h6" fontWeight="bold">
              Review Message
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Box>
          <Typography id="review-modal-description" variant="body1">
            {review.reviewText}
          </Typography>
        </Box>
      </Modal>

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete this review? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Review;
