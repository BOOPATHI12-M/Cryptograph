package com.cryptolearn.service;

import com.cryptolearn.entity.PerformanceLog;
import com.cryptolearn.repository.PerformanceLogRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PerformanceService {
    private final PerformanceLogRepository performanceLogRepository;

    public PerformanceService(PerformanceLogRepository performanceLogRepository) {
        this.performanceLogRepository = performanceLogRepository;
    }

    public PerformanceLog logPerformance(String algorithm, Long executionTime, Integer inputSize, String operationType) {
        PerformanceLog log = new PerformanceLog(algorithm, executionTime, inputSize, operationType);
        return performanceLogRepository.save(log);
    }

    public Map<String, Object> getPerformanceComparison() {
        List<Object[]> stats = performanceLogRepository.findPerformanceStats();
        Map<String, Object> result = new HashMap<>();
        
        for (Object[] stat : stats) {
            String algorithm = (String) stat[0];
            Double avgTime = (Double) stat[1];
            Long minTime = ((Number) stat[2]).longValue();
            Long maxTime = ((Number) stat[3]).longValue();
            
            Map<String, Object> algoStats = new HashMap<>();
            algoStats.put("averageTime", avgTime != null ? avgTime : 0);
            algoStats.put("minTime", minTime);
            algoStats.put("maxTime", maxTime);
            algoStats.put("securityStrength", getSecurityStrength(algorithm));
            
            result.put(algorithm, algoStats);
        }
        
        return result;
    }

    private String getSecurityStrength(String algorithm) {
        switch (algorithm.toUpperCase()) {
            case "CAESAR":
                return "LOW";
            case "AES":
                return "HIGH";
            case "RSA":
                return "VERY_HIGH";
            default:
                return "MEDIUM";
        }
    }

    public List<PerformanceLog> getRecentLogs(String algorithm, int limit) {
        List<PerformanceLog> logs = performanceLogRepository.findByAlgorithmOrderByTimestampDesc(algorithm);
        return logs.size() > limit ? logs.subList(0, limit) : logs;
    }
}



