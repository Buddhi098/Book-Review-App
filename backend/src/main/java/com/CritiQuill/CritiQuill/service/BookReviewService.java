package com.CritiQuill.CritiQuill.service;

import com.CritiQuill.CritiQuill.dto.BookReviewDTO;
import com.CritiQuill.CritiQuill.entity.BookReview;
import com.CritiQuill.CritiQuill.entity.User;
import com.CritiQuill.CritiQuill.repository.BookReviewRepository;
import com.CritiQuill.CritiQuill.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookReviewService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private BookReviewRepository bookReviewRepository;


    public List<BookReviewDTO> getAllReviews() {
        return bookReviewRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookReviewDTO getReviewById(Long id) {
        Optional<BookReview> review = bookReviewRepository.findById(id);
        return review.map(this::convertToDTO).orElse(null);
    }

    public List<BookReviewDTO> getReviewsByUserId(Long userId) {
        return bookReviewRepository.findByUserId(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookReviewDTO createReview(BookReviewDTO bookReviewDTO) {
        BookReview bookReview = BookReview.builder()
                .bookTopic(bookReviewDTO.getBookTopic())
                .bookAuthor(bookReviewDTO.getBookAuthor())
                .reviewText(bookReviewDTO.getReviewText())
                .userId(bookReviewDTO.getUserId())
                .rating(bookReviewDTO.getRating())
                .addedDate(LocalDate.now())
                .build();

        bookReview = bookReviewRepository.save(bookReview);
        return convertToDTO(bookReview);
    }

    public BookReviewDTO updateReview(Long id, BookReviewDTO bookReviewDTO) {
        Optional<BookReview> existingReview = bookReviewRepository.findById(id);
        if (existingReview.isPresent()) {
            BookReview updatedReview = existingReview.get();
            updatedReview.setBookTopic(bookReviewDTO.getBookTopic());
            updatedReview.setBookAuthor(bookReviewDTO.getBookAuthor());
            updatedReview.setReviewText(bookReviewDTO.getReviewText());
            updatedReview.setRating(bookReviewDTO.getRating());
            updatedReview.setAddedDate(LocalDate.now());
            bookReviewRepository.save(updatedReview);
            return convertToDTO(updatedReview);
        }
        return null;
    }

    public boolean deleteReview(Long id) {
        Optional<BookReview> review = bookReviewRepository.findById(id);
        if (review.isPresent()) {
            bookReviewRepository.delete(review.get());
            return true;
        }
        return false;
    }

    public List<String> getAllBookNames() {
        return bookReviewRepository.findAll()
                .stream()
                .map(BookReview::getBookTopic)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getAuthorsList() {
        // Fetch all unique author names
        return bookReviewRepository.findAll()
                .stream()
                .map(BookReview::getBookAuthor)
                .distinct()
                .collect(Collectors.toList());
    }

    private BookReviewDTO convertToDTO(BookReview bookReview) {
        BookReviewDTO dto = new BookReviewDTO();
        dto.setId(bookReview.getId());
        dto.setBookTopic(bookReview.getBookTopic());
        dto.setBookAuthor(bookReview.getBookAuthor());
        dto.setUserId(bookReview.getUserId());
        dto.setReviewText(bookReview.getReviewText());
        dto.setRating(bookReview.getRating());
        dto.setAddedDate(bookReview.getAddedDate());
        return dto;
    }

    public List<Map<String, Object>> getBooksWithRatings() {
        List<BookReview> reviews = bookReviewRepository.findAll();

        // Group reviews by book topic and author
        Map<String, Map<String, List<BookReview>>> groupedData = reviews.stream()
                .collect(Collectors.groupingBy(
                        BookReview::getBookTopic,
                        Collectors.groupingBy(BookReview::getBookAuthor)
                ));

        List<Map<String, Object>> result = new ArrayList<>();

        for (var entry : groupedData.entrySet()) {
            String bookTopic = entry.getKey();
            for (var subEntry : entry.getValue().entrySet()) {
                String bookAuthor = subEntry.getKey();
                List<BookReview> bookReviews = subEntry.getValue();

                // Compute average rating
                double avgRating = bookReviews.stream()
                        .mapToInt(BookReview::getRating)
                        .average()
                        .orElse(0.0);

                // Collect individual ratings
                List<Map<String, Object>> individualRatings = bookReviews.stream()
                        .map(review -> {
                            Map<String, Object> ratingDetails = new HashMap<>();
                            ratingDetails.put("userId", review.getUserId());
                            ratingDetails.put("reviewText", review.getReviewText());
                            ratingDetails.put("rating", review.getRating());
                            ratingDetails.put("date", review.getAddedDate());

                            // Fetch username from UserRepository
                            Optional<User> user = userRepository.findById(review.getUserId());
                            user.ifPresent(u -> ratingDetails.put("username", u.getName()));

                            return ratingDetails;
                        })
                        .collect(Collectors.toList());

                // Build result map
                Map<String, Object> bookData = new HashMap<>();
                bookData.put("bookName", bookTopic);
                bookData.put("bookAuthor", bookAuthor);
                bookData.put("averageRating", avgRating);
                bookData.put("individualRatings", individualRatings);

                result.add(bookData);
            }
        }

        return result;
    }
}
