// Caesar Cipher Page JavaScript

let currentUserId = null;

// Get current user ID from session
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    currentUserId = user.id;
});

async function encryptCaesar() {
    const plaintext = document.getElementById('plaintext').value;
    const shift = parseInt(document.getElementById('shift').value);

    if (!plaintext) {
        alert('Please enter a message');
        return;
    }

    if (shift < 0 || shift > 25) {
        alert('Shift must be between 0 and 25');
        return;
    }

    try {
        const startTime = performance.now();
        const response = await fetch('http://localhost:8080/api/crypto/caesar/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ plaintext, shift })
        });

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('result').textContent = data.ciphertext;
            document.getElementById('resultSection').style.display = 'block';

            // Log performance
            await logPerformance('CAESAR', executionTime, plaintext.length, 'ENCRYPT');

            // Save to history
            if (currentUserId) {
                await saveHistory('CAESAR', plaintext, data.ciphertext, shift.toString(), 'ENCRYPT');
            }
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function decryptCaesar() {
    const ciphertext = document.getElementById('plaintext').value;
    const shift = parseInt(document.getElementById('shift').value);

    if (!ciphertext) {
        alert('Please enter a message');
        return;
    }

    if (shift < 0 || shift > 25) {
        alert('Shift must be between 0 and 25');
        return;
    }

    try {
        const startTime = performance.now();
        const response = await fetch('http://localhost:8080/api/crypto/caesar/decrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ciphertext, shift })
        });

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('result').textContent = data.plaintext;
            document.getElementById('resultSection').style.display = 'block';

            // Log performance
            await logPerformance('CAESAR', executionTime, ciphertext.length, 'DECRYPT');

            // Save to history
            if (currentUserId) {
                await saveHistory('CAESAR', ciphertext, data.plaintext, shift.toString(), 'DECRYPT');
            }
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function showVisualization() {
    const plaintext = document.getElementById('plaintext').value;
    const shift = parseInt(document.getElementById('shift').value);

    if (!plaintext) {
        alert('Please enter a message');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/visualize/CAESAR?plaintext=${encodeURIComponent(plaintext)}&shift=${shift}`);
        const data = await response.json();

        if (response.ok) {
            displaySteps(data.steps);
            document.getElementById('visualizationSection').style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displaySteps(steps) {
    const container = document.getElementById('stepsContainer');
    container.innerHTML = '';

    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-item';
        stepDiv.style.animationDelay = `${index * 0.1}s`;

        let html = `<h4>Position ${step.position}: Character '${step.originalChar}'</h4>`;
        
        if (step.note) {
            html += `<p>${step.note}</p>`;
        } else {
            html += `
                <div class="step-details">
                    <div class="step-detail">
                        <strong>Original</strong>
                        <div>Position: ${step.originalPosition}</div>
                        <div>Char: ${step.originalChar}</div>
                    </div>
                    <div class="step-detail">
                        <strong>Shift</strong>
                        <div>+${step.shift}</div>
                    </div>
                    <div class="step-detail">
                        <strong>Formula</strong>
                        <div style="font-size: 12px;">${step.formula}</div>
                    </div>
                    <div class="step-detail">
                        <strong>Result</strong>
                        <div>Position: ${step.newPosition}</div>
                        <div>Char: ${step.newChar}</div>
                    </div>
                </div>
            `;
        }

        stepDiv.innerHTML = html;
        container.appendChild(stepDiv);
    });
}

async function logPerformance(algorithm, executionTime, inputSize, operationType) {
    try {
        await fetch('http://localhost:8080/api/performance/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                algorithm,
                executionTime,
                inputSize,
                operationType
            })
        });
    } catch (error) {
        console.error('Failed to log performance:', error);
    }
}

async function saveHistory(algorithm, inputText, outputText, keyUsed, operationType) {
    if (!currentUserId) return;

    try {
        await fetch('http://localhost:8080/api/history/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUserId,
                algorithm,
                inputText,
                outputText,
                keyUsed,
                operationType
            })
        });
    } catch (error) {
        console.error('Failed to save history:', error);
    }
}



