package com.cryptolearn.repository;

import com.cryptolearn.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByUserIdOrderByTimestampDesc(Long userId);
    
    List<History> findByUserIdAndAlgorithmOrderByTimestampDesc(Long userId, String algorithm);
    
    @Query("SELECT h.algorithm, COUNT(h) as count FROM History h WHERE h.userId = ?1 GROUP BY h.algorithm")
    List<Object[]> findAlgorithmUsageStats(Long userId);
}



