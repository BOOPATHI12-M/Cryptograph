// RSA Page JavaScript

let currentUserId = null;
let currentPublicKey = null;
let currentPrivateKey = null;

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    currentUserId = user.id;
});

async function generateRSAKeys() {
    try {
        const response = await fetch('http://localhost:8080/api/crypto/rsa/generate-keys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        if (response.ok) {
            currentPublicKey = data.publicKey;
            currentPrivateKey = data.privateKey;
            
            document.getElementById('publicKey').textContent = data.publicKey;
            document.getElementById('privateKey').textContent = data.privateKey;
            document.getElementById('keysSection').style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function encryptRSA() {
    const plaintext = document.getElementById('plaintext').value;

    if (!plaintext) {
        alert('Please enter a message');
        return;
    }

    if (!currentPublicKey) {
        alert('Please generate a key pair first');
        return;
    }

    if (plaintext.length > 245) {
        alert('RSA can only encrypt messages up to 245 characters with 2048-bit keys');
        return;
    }

    try {
        const startTime = performance.now();
        const response = await fetch('http://localhost:8080/api/crypto/rsa/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                plaintext, 
                publicKey: currentPublicKey 
            })
        });

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('result').textContent = data.ciphertext;
            document.getElementById('resultSection').style.display = 'block';

            // Log performance
            await logPerformance('RSA', executionTime, plaintext.length, 'ENCRYPT');

            // Save to history
            if (currentUserId) {
                await saveHistory('RSA', plaintext, data.ciphertext, 'Public Key Used', 'ENCRYPT');
            }
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function decryptRSA() {
    const ciphertext = document.getElementById('result').textContent;

    if (!ciphertext) {
        alert('Please encrypt a message first');
        return;
    }

    if (!currentPrivateKey) {
        alert('Please generate a key pair first');
        return;
    }

    try {
        const startTime = performance.now();
        const response = await fetch('http://localhost:8080/api/crypto/rsa/decrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                ciphertext, 
                privateKey: currentPrivateKey 
            })
        });

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('plaintext').value = data.plaintext;
            document.getElementById('result').textContent = data.plaintext;
            document.getElementById('resultSection').style.display = 'block';

            // Log performance
            await logPerformance('RSA', executionTime, ciphertext.length, 'DECRYPT');

            // Save to history
            if (currentUserId) {
                await saveHistory('RSA', ciphertext, data.plaintext, 'Private Key Used', 'DECRYPT');
            }
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function showRSAVisualization() {
    const plaintext = document.getElementById('plaintext').value || 'Sample Message';

    try {
        const response = await fetch(`http://localhost:8080/api/visualize/RSA?plaintext=${encodeURIComponent(plaintext)}`);
        const data = await response.json();

        if (response.ok) {
            displayRSASteps(data.steps, data);
            document.getElementById('visualizationSection').style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayRSASteps(steps, data) {
    const container = document.getElementById('rsaStepsContainer');
    container.innerHTML = '';

    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'rsa-step';
        stepDiv.style.animationDelay = `${index * 0.2}s`;

        let html = `<h4>${step.step}</h4>`;
        html += `<p>${step.description}</p>`;
        if (step.formula) {
            html += `<div class="formula">${step.formula}</div>`;
        }

        stepDiv.innerHTML = html;
        container.appendChild(stepDiv);
    });

    // Add additional info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'rsa-step';
    infoDiv.innerHTML = `
        <h4>Additional Information</h4>
        <p><strong>Key Size:</strong> ${data.keySize}</p>
        <p><strong>Security:</strong> ${data.security}</p>
    `;
    container.appendChild(infoDiv);
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



