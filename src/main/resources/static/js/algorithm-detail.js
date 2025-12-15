let currentAlgorithm = null;
let currentAlgorithmId = null;
let displayedQuizQuestions = []; // Store questions displayed in quiz

// Load algorithm details
async function loadAlgorithmDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        window.location.href = 'algorithms.html';
        return;
    }
    
    currentAlgorithmId = id;
    const result = await algorithmAPI.getById(id);
    
    if (result.success) {
        currentAlgorithm = result.data;
        displayAlgorithmInfo();
        loadCryptoTool();
    } else {
        window.location.href = 'algorithms.html';
    }
}

// Display algorithm information
function displayAlgorithmInfo() {
    const container = document.getElementById('algorithmDetail');
    if (container) {
        container.innerHTML = `
            <h1>${currentAlgorithm.name}</h1>
            <p><strong>Type:</strong> ${currentAlgorithm.type}</p>
        `;
    }
    
    document.getElementById('theoryContent').innerHTML = 
        `<pre>${currentAlgorithm.theory || 'No theory available'}</pre>`;
    
    document.getElementById('stepsContent').innerHTML = 
        `<pre>${currentAlgorithm.steps || 'No steps available'}</pre>`;
    
    document.getElementById('exampleContent').innerHTML = 
        `<pre>${currentAlgorithm.example || 'No example available'}</pre>`;
    
    document.getElementById('formulaContent').innerHTML = 
        `<pre>${currentAlgorithm.formula || 'No formula available'}</pre>`;
}

// Show tab
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`${tabName}Tab`).classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'quiz') {
        loadQuiz();
    }
}

// Load crypto tool
function loadCryptoTool() {
    const container = document.getElementById('cryptoToolContent');
    const algName = currentAlgorithm.name.toLowerCase();
    
    let toolHTML = '';
    
    if (algName.includes('caesar')) {
        toolHTML = `
            <div class="crypto-input-group">
                <label>Plaintext</label>
                <textarea id="plaintext" rows="3" placeholder="Enter text to encrypt"></textarea>
            </div>
            <div class="crypto-input-group">
                <label>Shift Value (1-25)</label>
                <input type="number" id="shift" min="1" max="25" value="3">
            </div>
            <div class="crypto-buttons">
                <button onclick="encryptCaesar()" class="btn btn-primary">Encrypt</button>
                <button onclick="decryptCaesar()" class="btn btn-secondary">Decrypt</button>
            </div>
            <div id="cryptoResult"></div>
        `;
    } else if (algName.includes('vigenère') || algName.includes('vigenere')) {
        toolHTML = `
            <div class="crypto-input-group">
                <label>Plaintext</label>
                <textarea id="plaintext" rows="3" placeholder="Enter text to encrypt"></textarea>
            </div>
            <div class="crypto-input-group">
                <label>Key</label>
                <input type="text" id="key" placeholder="Enter key">
            </div>
            <div class="crypto-buttons">
                <button onclick="encryptVigenere()" class="btn btn-primary">Encrypt</button>
                <button onclick="decryptVigenere()" class="btn btn-secondary">Decrypt</button>
            </div>
            <div id="cryptoResult"></div>
        `;
    } else if (algName.includes('playfair')) {
        toolHTML = `
            <div class="crypto-input-group">
                <label>Plaintext</label>
                <textarea id="plaintext" rows="3" placeholder="Enter text to encrypt"></textarea>
            </div>
            <div class="crypto-input-group">
                <label>Key</label>
                <input type="text" id="key" placeholder="Enter key">
            </div>
            <div class="crypto-buttons">
                <button onclick="encryptPlayfair()" class="btn btn-primary">Encrypt</button>
                <button onclick="decryptPlayfair()" class="btn btn-secondary">Decrypt</button>
            </div>
            <div id="cryptoResult"></div>
        `;
    } else if (algName.includes('rsa')) {
        toolHTML = `
            <div class="crypto-input-group">
                <label>Plaintext</label>
                <textarea id="plaintext" rows="3" placeholder="Enter text to encrypt"></textarea>
            </div>
            <div class="crypto-buttons">
                <button onclick="generateRSAKeys()" class="btn btn-success">Generate Keys</button>
                <button onclick="encryptRSA()" class="btn btn-primary">Encrypt</button>
                <button onclick="decryptRSA()" class="btn btn-secondary">Decrypt</button>
            </div>
            <div class="crypto-input-group">
                <label>Public Key</label>
                <textarea id="publicKey" rows="3" placeholder="Public key will appear here"></textarea>
            </div>
            <div class="crypto-input-group">
                <label>Private Key</label>
                <textarea id="privateKey" rows="3" placeholder="Private key will appear here"></textarea>
            </div>
            <div id="cryptoResult"></div>
        `;
    } else if (algName.includes('aes')) {
        toolHTML = `
            <div class="crypto-input-group">
                <label>Plaintext</label>
                <textarea id="plaintext" rows="3" placeholder="Enter text to encrypt"></textarea>
            </div>
            <div class="crypto-buttons">
                <button onclick="encryptAES()" class="btn btn-primary">Encrypt</button>
                <button onclick="decryptAES()" class="btn btn-secondary">Decrypt</button>
            </div>
            <div class="crypto-input-group">
                <label>Key (will be generated)</label>
                <textarea id="aesKey" rows="2" readonly></textarea>
            </div>
            <div class="crypto-input-group">
                <label>IV (will be generated)</label>
                <textarea id="aesIV" rows="2" readonly></textarea>
            </div>
            <div id="cryptoResult"></div>
        `;
    } else if (algName.includes('des')) {
        toolHTML = `
            <div class="crypto-input-group">
                <label>Plaintext</label>
                <textarea id="plaintext" rows="3" placeholder="Enter text to encrypt"></textarea>
            </div>
            <div class="crypto-buttons">
                <button onclick="encryptDES()" class="btn btn-primary">Encrypt</button>
                <button onclick="decryptDES()" class="btn btn-secondary">Decrypt</button>
            </div>
            <div class="crypto-input-group">
                <label>Key (will be generated)</label>
                <textarea id="desKey" rows="2" readonly></textarea>
            </div>
            <div class="crypto-input-group">
                <label>IV (will be generated)</label>
                <textarea id="desIV" rows="2" readonly></textarea>
            </div>
            <div id="cryptoResult"></div>
        `;
    }
    
    if (container) {
        container.innerHTML = toolHTML;
    }
}

// Encryption/Decryption functions
async function encryptCaesar() {
    const plaintext = document.getElementById('plaintext').value;
    const shift = parseInt(document.getElementById('shift').value);
    const result = await cryptoAPI.caesarEncrypt(plaintext, shift);
    displayResult(result);
}

async function decryptCaesar() {
    const ciphertext = document.getElementById('plaintext').value;
    const shift = parseInt(document.getElementById('shift').value);
    const result = await cryptoAPI.caesarDecrypt(ciphertext, shift);
    displayResult(result, true);
}

async function encryptVigenere() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const result = await cryptoAPI.vigenereEncrypt(plaintext, key);
    displayResult(result);
}

async function decryptVigenere() {
    const ciphertext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const result = await cryptoAPI.vigenereDecrypt(ciphertext, key);
    displayResult(result, true);
}

async function encryptPlayfair() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const result = await cryptoAPI.playfairEncrypt(plaintext, key);
    displayResult(result);
}

async function decryptPlayfair() {
    const ciphertext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const result = await cryptoAPI.playfairDecrypt(ciphertext, key);
    displayResult(result, true);
}

let rsaKeys = { publicKey: '', privateKey: '' };

async function generateRSAKeys() {
    const result = await cryptoAPI.rsaGenerateKeys();
    if (result.success) {
        rsaKeys = result.data;
        document.getElementById('publicKey').value = rsaKeys.publicKey;
        document.getElementById('privateKey').value = rsaKeys.privateKey;
    }
}

async function encryptRSA() {
    const plaintext = document.getElementById('plaintext').value;
    const publicKey = document.getElementById('publicKey').value || rsaKeys.publicKey;
    const result = await cryptoAPI.rsaEncrypt(plaintext, publicKey);
    displayResult(result);
}

async function decryptRSA() {
    const ciphertext = document.getElementById('plaintext').value;
    const privateKey = document.getElementById('privateKey').value || rsaKeys.privateKey;
    const result = await cryptoAPI.rsaDecrypt(ciphertext, privateKey);
    displayResult(result, true);
}

let aesKeys = { key: '', iv: '' };

async function encryptAES() {
    const plaintext = document.getElementById('plaintext').value;
    const result = await cryptoAPI.aesEncrypt(plaintext);
    if (result.success) {
        aesKeys = result.data;
        document.getElementById('aesKey').value = aesKeys.key;
        document.getElementById('aesIV').value = aesKeys.iv;
        displayResult(result);
    }
}

async function decryptAES() {
    const ciphertext = document.getElementById('plaintext').value;
    const key = document.getElementById('aesKey').value || aesKeys.key;
    const iv = document.getElementById('aesIV').value || aesKeys.iv;
    const result = await cryptoAPI.aesDecrypt(ciphertext, key, iv);
    displayResult(result, true);
}

let desKeys = { key: '', iv: '' };

async function encryptDES() {
    const plaintext = document.getElementById('plaintext').value;
    const result = await cryptoAPI.desEncrypt(plaintext);
    if (result.success) {
        desKeys = result.data;
        document.getElementById('desKey').value = desKeys.key;
        document.getElementById('desIV').value = desKeys.iv;
        displayResult(result);
    }
}

async function decryptDES() {
    const ciphertext = document.getElementById('plaintext').value;
    const key = document.getElementById('desKey').value || desKeys.key;
    const iv = document.getElementById('desIV').value || desKeys.iv;
    const result = await cryptoAPI.desDecrypt(ciphertext, key, iv);
    displayResult(result, true);
}

function displayResult(result, isDecrypt = false) {
    const container = document.getElementById('cryptoResult');
    if (result.success) {
        const data = result.data;
        if (isDecrypt) {
            container.innerHTML = `<div class="crypto-result"><strong>Plaintext:</strong> ${data.plaintext}</div>`;
        } else {
            container.innerHTML = `<div class="crypto-result"><strong>Ciphertext:</strong> ${data.ciphertext || data.ciphertext}<br>
                ${data.key ? '<strong>Key:</strong> ' + data.key + '<br>' : ''}
                ${data.iv ? '<strong>IV:</strong> ' + data.iv + '<br>' : ''}
                ${data.shift ? '<strong>Shift:</strong> ' + data.shift : ''}</div>`;
        }
    } else {
        container.innerHTML = `<div class="crypto-result" style="border-left-color: #e74c3c;"><strong>Error:</strong> ${result.error || result.data?.error || 'Operation failed'}</div>`;
    }
}

// Load quiz
async function loadQuiz() {
    // Reset answers when loading a new quiz
    quizAnswers = {};
    
    const result = await quizAPI.getByAlgorithm(currentAlgorithmId);
    const container = document.getElementById('quizContent');
    
    if (!result.success) {
        container.innerHTML = '<p>Failed to load quiz questions. Please try again.</p>';
        return;
    }
    
    let questions = result.data || [];
    
    // Remove duplicates based on question ID
    const uniqueQuestionsMap = new Map();
    questions.forEach(q => {
        if (q.id && !uniqueQuestionsMap.has(q.id)) {
            uniqueQuestionsMap.set(q.id, q);
        }
    });
    questions = Array.from(uniqueQuestionsMap.values());
    
    // Shuffle questions and take first 10 (or all if less than 10)
    // Only use questions from the current algorithm
    questions = shuffleArray(questions).slice(0, Math.min(10, questions.length));
    
    if (questions.length === 0) {
        container.innerHTML = '<p>No quiz questions available. Please contact an administrator to add questions.</p>';
        return;
    }
    
    // Store displayed questions for score calculation
    displayedQuizQuestions = questions;
    
    let html = '<div class="quiz-container">';
    
    if (questions.length < 10) {
        html += `<p style="color: #e74c3c; margin-bottom: 20px; padding: 15px; background: #fee; border-radius: 5px; border-left: 4px solid #e74c3c;">
            ⚠️ Only ${questions.length} question(s) available for this algorithm. A minimum of 10 questions is required for a complete quiz. Please contact an administrator to add more questions.
        </p>`;
    }
    questions.forEach((q, index) => {
        html += `
            <div class="quiz-question">
                <h3>Question ${index + 1}: ${q.question}</h3>
                <div class="quiz-option" onclick="selectAnswer(${q.id}, 'A')">
                    <input type="radio" name="q${q.id}" value="A" id="q${q.id}_A">
                    <label for="q${q.id}_A">A. ${q.optionA}</label>
                </div>
                <div class="quiz-option" onclick="selectAnswer(${q.id}, 'B')">
                    <input type="radio" name="q${q.id}" value="B" id="q${q.id}_B">
                    <label for="q${q.id}_B">B. ${q.optionB}</label>
                </div>
                <div class="quiz-option" onclick="selectAnswer(${q.id}, 'C')">
                    <input type="radio" name="q${q.id}" value="C" id="q${q.id}_C">
                    <label for="q${q.id}_C">C. ${q.optionC}</label>
                </div>
                <div class="quiz-option" onclick="selectAnswer(${q.id}, 'D')">
                    <input type="radio" name="q${q.id}" value="D" id="q${q.id}_D">
                    <label for="q${q.id}_D">D. ${q.optionD}</label>
                </div>
            </div>
        `;
    });
    html += '<button onclick="submitQuiz()" class="btn btn-primary">Submit Quiz</button></div>';
    container.innerHTML = html;
}

// Helper function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let quizAnswers = {};

function selectAnswer(questionId, answer) {
    quizAnswers[questionId] = answer;
    document.querySelectorAll(`input[name="q${questionId}"]`).forEach(radio => {
        if (radio.value === answer) radio.checked = true;
    });
    const clickedElement = event.currentTarget || event.target.closest('.quiz-option');
    if (clickedElement) {
        clickedElement.classList.add('selected');
        clickedElement.parentElement.querySelectorAll('.quiz-option').forEach(opt => {
            if (opt !== clickedElement) opt.classList.remove('selected');
        });
    }
}

async function submitQuiz() {
    const submitBtn = document.querySelector('#quizContent button.btn-primary');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
    }
    
    try {
        // Calculate score based on displayed questions
        let score = 0;
        let totalPoints = 0;
        
        displayedQuizQuestions.forEach(question => {
            totalPoints += question.points || 10;
            const userAnswer = quizAnswers[question.id];
            if (userAnswer && userAnswer.toUpperCase() === question.correctAnswer.toUpperCase()) {
                score += question.points || 10;
            }
        });
        
        const user = getCurrentUser();
        
        // Save score for the current algorithm (even if questions came from multiple algorithms)
        if (user) {
            await scoreAPI.save({
                userId: user.id,
                algorithmId: currentAlgorithmId,
                score: score,
                totalQuestions: displayedQuizQuestions.length
            }, getToken());
        }
        
        const percentage = Math.round((score / totalPoints) * 100);
        
        // Display result with animation
        const container = document.getElementById('quizContent');
        container.innerHTML = `
            <div class="quiz-result">
                <h2>Quiz Completed! 🎉</h2>
                <div class="score-display">${score}</div>
                <p>Out of ${totalPoints} points (${percentage}%)</p>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="progress-text">${percentage}%</span>
                </div>
                <button onclick="loadQuiz()" class="btn btn-primary" data-tooltip="Take the quiz again">Retake Quiz</button>
            </div>
        `;
        
        Toast.show(`Quiz completed! Your score: ${score}/${totalPoints}`, 'success');
        
        // Reset answers for next quiz
        quizAnswers = {};
    } catch (error) {
        Toast.show('An error occurred while submitting the quiz', 'error');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit Quiz';
        }
    }
}

// Load on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadAlgorithmDetail();
});

