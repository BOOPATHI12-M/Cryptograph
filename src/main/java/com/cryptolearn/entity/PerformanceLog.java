package com.cryptolearn.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity to store performance metrics for cryptographic operations
 */
@Entity
@Table(name = "performance_log")
public class PerformanceLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String algorithm;

    @Column(name = "execution_time", nullable = false)
    private Long executionTime; // in milliseconds

    @Column(name = "input_size")
    private Integer inputSize; // size of input in bytes

    @Column(name = "operation_type")
    private String operationType; // "ENCRYPT" or "DECRYPT"

    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    public PerformanceLog() {
    }

    public PerformanceLog(String algorithm, Long executionTime, Integer inputSize, String operationType) {
        this.algorithm = algorithm;
        this.executionTime = executionTime;
        this.inputSize = inputSize;
        this.operationType = operationType;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public void setAlgorithm(String algorithm) {
        this.algorithm = algorithm;
    }

    public Long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(Long executionTime) {
        this.executionTime = executionTime;
    }

    public Integer getInputSize() {
        return inputSize;
    }

    public void setInputSize(Integer inputSize) {
        this.inputSize = inputSize;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}



