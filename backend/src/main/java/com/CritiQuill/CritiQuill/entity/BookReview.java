package com.CritiQuill.CritiQuill.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "book_reviews")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String bookTopic;

    private String bookAuthor;

    private String reviewText;

    private int rating;

    private LocalDate addedDate;

}

