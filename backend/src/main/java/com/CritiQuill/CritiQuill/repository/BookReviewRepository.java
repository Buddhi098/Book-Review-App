package com.CritiQuill.CritiQuill.repository;

import com.CritiQuill.CritiQuill.entity.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookReviewRepository extends JpaRepository<BookReview, Long> {
    List<BookReview> findByUserId(Long userId);
}
