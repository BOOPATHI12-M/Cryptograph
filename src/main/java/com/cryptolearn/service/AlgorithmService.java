package com.cryptolearn.service;

import com.cryptolearn.entity.Algorithm;
import com.cryptolearn.repository.AlgorithmRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlgorithmService {
    private final AlgorithmRepository algorithmRepository;

    public AlgorithmService(AlgorithmRepository algorithmRepository) {
        this.algorithmRepository = algorithmRepository;
    }

    public List<Algorithm> getAllAlgorithms() {
        return algorithmRepository.findAll();
    }

    public Optional<Algorithm> getAlgorithmById(Long id) {
        return algorithmRepository.findById(id);
    }

    public Algorithm createAlgorithm(Algorithm algorithm) {
        return algorithmRepository.save(algorithm);
    }

    public Algorithm updateAlgorithm(Long id, Algorithm algorithm) {
        Algorithm existing = algorithmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Algorithm not found"));
        existing.setName(algorithm.getName());
        existing.setTheory(algorithm.getTheory());
        existing.setSteps(algorithm.getSteps());
        existing.setExample(algorithm.getExample());
        existing.setFormula(algorithm.getFormula());
        existing.setType(algorithm.getType());
        return algorithmRepository.save(existing);
    }

    public void deleteAlgorithm(Long id) {
        algorithmRepository.deleteById(id);
    }
}

