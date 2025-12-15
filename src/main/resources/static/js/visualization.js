// Visualization Page JavaScript

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

async function visualizeCaesar() {
    const text = document.getElementById('caesar-text').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);

    if (!text) {
        alert('Please enter text');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/visualize/CAESAR?plaintext=${encodeURIComponent(text)}&shift=${shift}`);
        const data = await response.json();

        if (response.ok) {
            displayCaesarSteps(data);
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayCaesarSteps(data) {
    const container = document.getElementById('caesar-steps');
    container.innerHTML = `<h3>Result: ${data.result}</h3>`;

    data.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-item';
        stepDiv.style.animationDelay = `${index * 0.1}s`;

        if (step.note) {
            stepDiv.innerHTML = `
                <h4>Position ${step.position}: '${step.originalChar}'</h4>
                <p>${step.note}</p>
            `;
        } else {
            stepDiv.innerHTML = `
                <h4>Position ${step.position}: '${step.originalChar}' → '${step.newChar}'</h4>
                <p><strong>Original Position:</strong> ${step.originalPosition}</p>
                <p><strong>Shift:</strong> +${step.shift}</p>
                <p><strong>New Position:</strong> ${step.newPosition}</p>
                <p><strong>Formula:</strong> ${step.formula}</p>
            `;
        }

        container.appendChild(stepDiv);
    });
}

async function visualizeAES() {
    const text = document.getElementById('aes-text').value || 'Sample Message';

    try {
        const response = await fetch(`http://localhost:8080/api/visualize/AES?plaintext=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (response.ok) {
            displayAESSteps(data);
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayAESSteps(data) {
    const container = document.getElementById('aes-steps');
    container.innerHTML = `
        <h3>AES Encryption Process</h3>
        <p><strong>Block Size:</strong> ${data.blockSize}</p>
        <p><strong>Rounds:</strong> ${data.rounds}</p>
    `;

    data.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-item';
        stepDiv.style.animationDelay = `${index * 0.2}s`;

        stepDiv.innerHTML = `
            <h4>${step.step}</h4>
            <p>${step.description}</p>
            <p><strong>State:</strong> ${step.state}</p>
        `;

        container.appendChild(stepDiv);
    });
}

async function visualizeRSA() {
    const text = document.getElementById('rsa-text').value || 'Sample Message';

    try {
        const response = await fetch(`http://localhost:8080/api/visualize/RSA?plaintext=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (response.ok) {
            displayRSASteps(data);
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayRSASteps(data) {
    const container = document.getElementById('rsa-steps');
    container.innerHTML = `
        <h3>RSA Encryption Process</h3>
        <p><strong>Key Size:</strong> ${data.keySize}</p>
        <p><strong>Security:</strong> ${data.security}</p>
    `;

    data.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-item';
        stepDiv.style.animationDelay = `${index * 0.2}s`;

        let html = `<h4>${step.step}</h4>`;
        html += `<p>${step.description}</p>`;
        if (step.formula) {
            html += `<p><strong>Formula:</strong> ${step.formula}</p>`;
        }

        stepDiv.innerHTML = html;
        container.appendChild(stepDiv);
    });
}



