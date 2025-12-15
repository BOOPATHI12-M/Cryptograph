package com.cryptolearn.service;

import com.cryptolearn.entity.History;
import com.cryptolearn.repository.HistoryRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HistoryService {
    private final HistoryRepository historyRepository;

    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public History saveHistory(Long userId, String algorithm, String inputText, String outputText, String keyUsed, String operationType) {
        History history = new History(userId, algorithm, inputText, outputText, keyUsed, operationType);
        return historyRepository.save(history);
    }

    public List<History> getUserHistory(Long userId) {
        return historyRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public List<History> getUserHistoryByAlgorithm(Long userId, String algorithm) {
        return historyRepository.findByUserIdAndAlgorithmOrderByTimestampDesc(userId, algorithm);
    }

    public Map<String, Long> getAlgorithmUsageStats(Long userId) {
        List<Object[]> stats = historyRepository.findAlgorithmUsageStats(userId);
        Map<String, Long> result = new HashMap<>();
        for (Object[] stat : stats) {
            result.put((String) stat[0], (Long) stat[1]);
        }
        return result;
    }
}



