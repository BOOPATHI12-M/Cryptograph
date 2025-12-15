// AES Page JavaScript

let currentUserId = null;
let currentKey = null;
let currentIV = null;

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    currentUserId = user.id;
});

async function encryptAES() {
    const plaintext = document.getElementById('plaintext').value;

    if (!plaintext) {
        alert('Please enter a message');
        return;
    }

    try {
        const startTime = performance.now();
        const response = await fetch('http://localhost:8080/api/crypto/aes/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ plaintext })
        });

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('ciphertext').textContent = data.ciphertext;
            document.getElementById('keyDisplay').textContent = data.key;
            document.getElementById('ivDisplay').textContent = data.iv;
            document.getElementById('resultSection').style.display = 'block';

            // Store for decryption
            currentKey = data.key;
            currentIV = data.iv;
            document.getElementById('ciphertextInput').value = data.ciphertext;
            document.getElementById('keyInput').value = data.key;
            document.getElementById('ivInput').value = data.iv;
            document.getElementById('decryptSection').style.display = 'block';

            // Log performance
            await logPerformance('AES', executionTime, plaintext.length, 'ENCRYPT');

            // Save to history
            if (currentUserId) {
                await saveHistory('AES', plaintext, data.ciphertext, data.key, 'ENCRYPT');
            }
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function decryptAES() {
    const ciphertext = document.getElementById('ciphertextInput').value;
    const key = document.getElementById('keyInput').value;
    const iv = document.getElementById('ivInput').value;

    if (!ciphertext || !key || !iv) {
        alert('Please enter ciphertext, key, and IV');
        return;
    }

    try {
        const startTime = performance.now();
        const response = await fetch('http://localhost:8080/api/crypto/aes/decrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ciphertext, key, iv })
        });

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('plaintext').value = data.plaintext;
            document.getElementById('resultSection').style.display = 'block';

            // Log performance
            await logPerformance('AES', executionTime, ciphertext.length, 'DECRYPT');

            // Save to history
            if (currentUserId) {
                await saveHistory('AES', ciphertext, data.plaintext, key, 'DECRYPT');
            }
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function showAESVisualization() {
    const plaintext = document.getElementById('plaintext').value;

    if (!plaintext) {
        alert('Please enter a message');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/visualize/AES?plaintext=${encodeURIComponent(plaintext)}`);
        const data = await response.json();

        if (response.ok) {
            displayAESSteps(data.steps);
            document.getElementById('visualizationSection').style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayAESSteps(steps) {
    const container = document.getElementById('aesStepsContainer');
    container.innerHTML = '';

    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'aes-step';
        stepDiv.style.animationDelay = `${index * 0.3}s`;
        
        setTimeout(() => {
            stepDiv.classList.add('active');
        }, index * 300);

        stepDiv.innerHTML = `
            <h4>${step.step}</h4>
            <p>${step.description}</p>
            <div class="step-animation">
                ${Array(4).fill(0).map((_, i) => `<div class="block">${String.fromCharCode(65 + i)}</div>`).join('')}
            </div>
        `;

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



