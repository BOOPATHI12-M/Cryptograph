package com.cryptolearn.repository;

import com.cryptolearn.entity.Algorithm;
import com.cryptolearn.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    List<QuizQuestion> findByAlgorithm(Algorithm algorithm);
    List<QuizQuestion> findByAlgorithmId(Long algorithmId);
}

