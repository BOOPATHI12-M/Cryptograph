package com.cryptolearn.repository;

import com.cryptolearn.entity.Score;
import com.cryptolearn.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUser(User user);
    List<Score> findByUserId(Long userId);
    List<Score> findByAlgorithmId(Long algorithmId);
}

