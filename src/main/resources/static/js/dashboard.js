// Load user scores
async function loadDashboard() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Show loading state
    const container = document.getElementById('scoresList');
    if (container) {
        showSkeleton(container, 3);
    }
    
    try {
        const result = await scoreAPI.getByUser(user.id);
        
        if (result.success) {
            const scores = result.data;
            displayStats(scores);
            displayScores(scores);
        } else {
            Toast.show('Failed to load dashboard data', 'error');
            if (container) {
                container.innerHTML = '<p>Failed to load scores. Please try again.</p>';
            }
        }
    } catch (error) {
        Toast.show('An error occurred while loading dashboard', 'error');
        if (container) {
            container.innerHTML = '<p>An error occurred. Please refresh the page.</p>';
        }
    }
}

// Display statistics with animations
function displayStats(scores) {
    const totalQuizzes = scores.length;
    let totalScore = 0;
    let bestScore = 0;
    
    scores.forEach(score => {
        totalScore += score.score;
        if (score.score > bestScore) {
            bestScore = score.score;
        }
    });
    
    const averageScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
    
    // Animate counters
    animateCounter('totalQuizzes', 0, totalQuizzes, 1000);
}

// Animate counter
function animateCounter(elementId, start, end, duration, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, 16);
}

// Display scores list
async function displayScores(scores) {
    const container = document.getElementById('scoresList');
    
    if (scores.length === 0) {
        container.innerHTML = '<p>No quiz scores yet. Take a quiz to see your scores here!</p>';
        return;
    }
    
    // Get algorithm names
    const algorithmsResult = await algorithmAPI.getAll();
    const algorithms = algorithmsResult.success ? algorithmsResult.data : [];
    const algorithmMap = {};
    algorithms.forEach(alg => {
        algorithmMap[alg.id] = alg.name;
    });
    
    let html = '';
    scores.forEach((score, index) => {
        const algorithmName = algorithmMap[score.algorithm.id] || 'Unknown Algorithm';
        const percentage = Math.round((score.score / (score.totalQuestions * 10)) * 100);
        const date = new Date(score.completedAt).toLocaleDateString();
        
        html += `
            <div class="score-item reveal" style="animation-delay: ${index * 0.1}s">
                <div class="score-info">
                    <h4>${algorithmName}</h4>
                    <p>Completed on: ${date}</p>
                    <div class="progress-container" style="margin-top: 10px; max-width: 300px;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="progress-text">${percentage}%</span>
                    </div>
                </div>
                <div class="score-value">
                    ${score.score}/${score.totalQuestions * 10} (${percentage}%)
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Trigger reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Load encryption history
async function loadHistory() {
    const user = getCurrentUser();
    if (!user) return;

    const container = document.getElementById('historyList');
    if (container) {
        showSkeleton(container, 3);
    }

    try {
        const response = await fetch(`http://localhost:8080/api/history/${user.id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const history = await response.json();

        if (Array.isArray(history)) {
            console.log('History loaded successfully:', history.length, 'items');
            displayHistory(history);
            loadUsageStats(user.id);
        } else {
            console.error('History response is not an array:', history);
            if (container) {
                container.innerHTML = '<p>Failed to load history. Invalid data format.</p>';
            }
        }
    } catch (error) {
        console.error('Failed to load history:', error);
        if (container) {
            container.innerHTML = '<p>Failed to load history. Please try again.</p>';
        }
    }
}

// Display encryption history
function displayHistory(history) {
    const container = document.getElementById('historyList');
    
    if (!container) {
        console.error('historyList container not found');
        return;
    }
    
    if (!Array.isArray(history)) {
        console.error('History is not an array:', history);
        container.innerHTML = '<p>Invalid history data format.</p>';
        return;
    }
    
    console.log('Displaying history:', history.length, 'items');
    
    if (history.length === 0) {
        container.innerHTML = '<p>No encryption history yet. Start encrypting to see your history here!</p>';
        return;
    }
    
    let html = '';
    history.forEach((item, index) => {
        if (!item || !item.timestamp || !item.algorithm) {
            console.warn('Invalid history item:', item);
            return;
        }
        
        const date = new Date(item.timestamp).toLocaleString();
        const operation = item.operationType === 'ENCRYPT' ? '🔒 Encrypted' : '🔓 Decrypted';
        const inputText = item.inputText || '';
        const outputText = item.outputText || '';
        
        html += `
            <div class="score-item reveal" style="animation-delay: ${index * 0.1}s">
                <div class="score-info">
                    <h4>${item.algorithm} - ${operation}</h4>
                    <p><strong>Input:</strong> ${inputText.substring(0, 50)}${inputText.length > 50 ? '...' : ''}</p>
                    <p><strong>Output:</strong> ${outputText.substring(0, 50)}${outputText.length > 50 ? '...' : ''}</p>
                    <p style="color: #666; font-size: 14px;">${date}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Trigger reveal animations
    const revealElements = container.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => observer.observe(el));
        
        // Fallback: Make visible after a short delay if observer doesn't trigger
        setTimeout(() => {
            revealElements.forEach(el => {
                if (!el.classList.contains('revealed')) {
                    el.classList.add('revealed');
                }
            });
        }, 500);
    }
}

// Load algorithm usage statistics
async function loadUsageStats(userId) {
    try {
        const response = await fetch(`http://localhost:8080/api/history/${userId}/stats`);
        const stats = await response.json();

        if (response.ok) {
            displayUsageStats(stats);
        }
    } catch (error) {
        console.error('Failed to load usage stats:', error);
    }
}

// Display usage statistics
function displayUsageStats(stats) {
    const container = document.getElementById('usageStats');
    container.innerHTML = '';

    Object.keys(stats).forEach(algorithm => {
        const count = stats[algorithm];
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <h3>${algorithm}</h3>
            <p style="font-size: 32px; font-weight: bold; margin: 10px 0;">${count}</p>
            <p style="opacity: 0.9;">Operations</p>
        `;
        container.appendChild(card);
    });
}

// Load on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadDashboard();
    loadHistory();
});

