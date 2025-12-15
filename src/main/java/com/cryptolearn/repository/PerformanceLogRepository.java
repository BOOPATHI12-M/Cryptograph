package com.cryptolearn.repository;

import com.cryptolearn.entity.PerformanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerformanceLogRepository extends JpaRepository<PerformanceLog, Long> {
    List<PerformanceLog> findByAlgorithmOrderByTimestampDesc(String algorithm);
    
    @Query("SELECT AVG(p.executionTime) FROM PerformanceLog p WHERE p.algorithm = ?1")
    Double findAverageExecutionTimeByAlgorithm(String algorithm);
    
    @Query("SELECT p.algorithm, AVG(p.executionTime) as avgTime, MIN(p.executionTime) as minTime, MAX(p.executionTime) as maxTime FROM PerformanceLog p GROUP BY p.algorithm")
    List<Object[]> findPerformanceStats();
}



