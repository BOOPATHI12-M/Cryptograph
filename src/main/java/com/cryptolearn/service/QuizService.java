package com.cryptolearn.service;

import com.cryptolearn.entity.Algorithm;
import com.cryptolearn.entity.QuizQuestion;
import com.cryptolearn.repository.AlgorithmRepository;
import com.cryptolearn.repository.QuizQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuizService {
    private final QuizQuestionRepository quizQuestionRepository;
    private final AlgorithmRepository algorithmRepository;

    public QuizService(QuizQuestionRepository quizQuestionRepository, AlgorithmRepository algorithmRepository) {
        this.quizQuestionRepository = quizQuestionRepository;
        this.algorithmRepository = algorithmRepository;
    }

    public List<QuizQuestion> getQuestionsByAlgorithm(Long algorithmId) {
        return quizQuestionRepository.findByAlgorithmId(algorithmId);
    }

    public Optional<QuizQuestion> getQuestionById(Long id) {
        return quizQuestionRepository.findById(id);
    }

    public QuizQuestion createQuestion(QuizQuestion question) {
        return quizQuestionRepository.save(question);
    }

    public QuizQuestion updateQuestion(Long id, QuizQuestion question) {
        QuizQuestion existing = quizQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        existing.setAlgorithm(question.getAlgorithm());
        existing.setQuestion(question.getQuestion());
        existing.setOptionA(question.getOptionA());
        existing.setOptionB(question.getOptionB());
        existing.setOptionC(question.getOptionC());
        existing.setOptionD(question.getOptionD());
        existing.setCorrectAnswer(question.getCorrectAnswer());
        existing.setPoints(question.getPoints());
        return quizQuestionRepository.save(existing);
    }

    public void deleteQuestion(Long id) {
        quizQuestionRepository.deleteById(id);
    }

    public int calculateScore(Long algorithmId, Map<Long, String> answers) {
        List<QuizQuestion> questions = quizQuestionRepository.findByAlgorithmId(algorithmId);
        int totalScore = 0;
        for (QuizQuestion q : questions) {
            if (answers.containsKey(q.getId()) && 
                answers.get(q.getId()).equalsIgnoreCase(q.getCorrectAnswer())) {
                totalScore += q.getPoints();
            }
        }
        return totalScore;
    }
}

