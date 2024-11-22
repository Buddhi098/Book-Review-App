package com.CritiQuill.CritiQuill.controller;

import com.CritiQuill.CritiQuill.dto.BookReviewDTO;
import com.CritiQuill.CritiQuill.service.BookReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class BookReviewController {

    @Autowired
    private BookReviewService bookReviewService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllReviews() {
        try {
            List<BookReviewDTO> allBookReviews = bookReviewService.getAllReviews();
            return ResponseEntity.status(HttpStatus.OK).body(allBookReviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving reviews: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id) {
        try {
            BookReviewDTO review = bookReviewService.getReviewById(id);
            return review != null ? ResponseEntity.ok(review) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving review: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getReviewsByUserId(@PathVariable Long userId) {
        try {
            List<BookReviewDTO> allBookReviewsByUserID = bookReviewService.getReviewsByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(allBookReviewsByUserID);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving reviews for user: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody BookReviewDTO bookReviewDTO) {
        try {
            BookReviewDTO createdReview = bookReviewService.createReview(bookReviewDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating review: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody BookReviewDTO bookReviewDTO) {
        try {
            BookReviewDTO updatedReview = bookReviewService.updateReview(id, bookReviewDTO);
            return updatedReview != null ? ResponseEntity.ok(updatedReview) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating review: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        try {
            return bookReviewService.deleteReview(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting review: " + e.getMessage());
        }
    }

    @GetMapping("/books")
    public ResponseEntity getAllBookNames() {
        try{
            List<String> books =  bookReviewService.getAllBookNames();
            return ResponseEntity.status(HttpStatus.OK).body(books);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting review: " + e.getMessage());
        }

    }

    @GetMapping("/authors")
    public ResponseEntity<? extends Object> getAuthorsList() {
        try{
            List<String> response =  bookReviewService.getAuthorsList();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting review: " + e.getMessage());
        }

    }

    @GetMapping("/book-detailed-stats")
    public ResponseEntity<? extends Object> getBooksWithDetailedRatings() {
        try{
            List<Map<String, Object>> response =  bookReviewService.getBooksWithRatings();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting review: " + e.getMessage());
        }

    }
}
