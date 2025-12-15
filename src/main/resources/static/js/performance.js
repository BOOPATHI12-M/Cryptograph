// Performance Comparison Page JavaScript

let performanceChart = null;

document.addEventListener('DOMContentLoaded', () => {
    loadPerformanceData();
});

async function loadPerformanceData() {
    try {
        const response = await fetch('http://localhost:8080/api/performance/compare');
        const data = await response.json();

        if (response.ok) {
            displayPerformanceChart(data);
            displayStats(data);
            displaySecurityMeter(data);
        } else {
            alert('Error loading performance data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading performance data: ' + error.message);
    }
}

function displayPerformanceChart(data) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    const algorithms = Object.keys(data);
    const avgTimes = algorithms.map(algo => {
        const stats = data[algo];
        return stats.averageTime || 0;
    });
    const minTimes = algorithms.map(algo => {
        const stats = data[algo];
        return stats.minTime || 0;
    });
    const maxTimes = algorithms.map(algo => {
        const stats = data[algo];
        return stats.maxTime || 0;
    });

    if (performanceChart) {
        performanceChart.destroy();
    }

    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: algorithms,
            datasets: [
                {
                    label: 'Average Time (ms)',
                    data: avgTimes,
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Min Time (ms)',
                    data: minTimes,
                    backgroundColor: 'rgba(51, 154, 240, 0.8)',
                    borderColor: 'rgba(51, 154, 240, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Max Time (ms)',
                    data: maxTimes,
                    backgroundColor: 'rgba(255, 107, 107, 0.8)',
                    borderColor: 'rgba(255, 107, 107, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Execution Time (milliseconds)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Algorithm'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Algorithm Performance Comparison'
                }
            }
        }
    });
}

function displayStats(data) {
    const container = document.getElementById('statsGrid');
    container.innerHTML = '';

    Object.keys(data).forEach(algorithm => {
        const stats = data[algorithm];
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <h3>${algorithm}</h3>
            <div class="value">${stats.averageTime ? stats.averageTime.toFixed(2) : '0'} ms</div>
            <div class="label">Average Execution Time</div>
            <div style="margin-top: 15px; font-size: 14px;">
                <div>Min: ${stats.minTime || 0} ms</div>
                <div>Max: ${stats.maxTime || 0} ms</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function displaySecurityMeter(data) {
    const container = document.getElementById('securityMeter');
    container.innerHTML = '';

    const securityLevels = {
        'LOW': { class: 'low', width: 25 },
        'MEDIUM': { class: 'medium', width: 50 },
        'HIGH': { class: 'high', width: 75 },
        'VERY_HIGH': { class: 'very-high', width: 100 }
    };

    Object.keys(data).forEach(algorithm => {
        const stats = data[algorithm];
        const security = stats.securityStrength || 'MEDIUM';
        const level = securityLevels[security] || securityLevels['MEDIUM'];

        const meterDiv = document.createElement('div');
        meterDiv.style.marginBottom = '20px';
        meterDiv.innerHTML = `
            <div class="algorithm-name">${algorithm}</div>
            <div class="meter-bar">
                <div class="meter-fill ${level.class}" style="width: ${level.width}%">
                    ${security.replace('_', ' ')}
                </div>
            </div>
        `;
        container.appendChild(meterDiv);
    });
}



