package com.CritiQuill.CritiQuill.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookReviewDTO {
    private Long id;
    private Long userId;
    private String bookTopic;
    private String bookAuthor;
    private String reviewText;
    private int rating;
    private LocalDate addedDate;
}
