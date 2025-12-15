package com.cryptolearn.service;

import com.cryptolearn.entity.Algorithm;
import com.cryptolearn.entity.Score;
import com.cryptolearn.entity.User;
import com.cryptolearn.repository.AlgorithmRepository;
import com.cryptolearn.repository.ScoreRepository;
import com.cryptolearn.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;
    private final AlgorithmRepository algorithmRepository;

    public ScoreService(ScoreRepository scoreRepository, UserRepository userRepository, 
                       AlgorithmRepository algorithmRepository) {
        this.scoreRepository = scoreRepository;
        this.userRepository = userRepository;
        this.algorithmRepository = algorithmRepository;
    }

    public Score saveScore(Long userId, Long algorithmId, int score, int totalQuestions) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Algorithm algorithm = algorithmRepository.findById(algorithmId)
                .orElseThrow(() -> new RuntimeException("Algorithm not found"));
        
        Score scoreEntity = new Score();
        scoreEntity.setUser(user);
        scoreEntity.setAlgorithm(algorithm);
        scoreEntity.setScore(score);
        scoreEntity.setTotalQuestions(totalQuestions);
        
        return scoreRepository.save(scoreEntity);
    }

    public List<Score> getScoresByUser(Long userId) {
        return scoreRepository.findByUserId(userId);
    }

    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    public List<Score> getScoresByAlgorithm(Long algorithmId) {
        return scoreRepository.findByAlgorithmId(algorithmId);
    }
}

