let algorithms = [];
let questions = [];

// Load admin data
async function loadAdminData() {
    const user = getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
        window.location.href = 'home.html';
        return;
    }
    
    await loadAlgorithms();
    await loadQuestions();
    await loadAllScores();
}

// Show admin tab
function showAdminTab(tab) {
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`${tab}Tab`).classList.add('active');
    event.target.classList.add('active');
}

// Load algorithms
async function loadAlgorithms() {
    const result = await algorithmAPI.getAll();
    if (result.success) {
        algorithms = result.data;
        displayAlgorithms();
    }
}

// Display algorithms
function displayAlgorithms() {
    const container = document.getElementById('algorithmsList');
    container.innerHTML = algorithms.map(alg => `
        <div class="admin-item">
            <div>
                <h4>${alg.name}</h4>
                <p>Type: ${alg.type}</p>
            </div>
            <div class="admin-actions">
                <button onclick="editAlgorithm(${alg.id})" class="btn btn-primary">Edit</button>
                <button onclick="deleteAlgorithm(${alg.id})" class="btn btn-danger">Delete</button>
            </div>
        </div>
    `).join('');
}

// Show algorithm form
function showAlgorithmForm() {
    document.getElementById('algorithmForm').style.display = 'block';
    document.getElementById('algorithmId').value = '';
    document.getElementById('algName').value = '';
    document.getElementById('algType').value = 'SYMMETRIC';
    document.getElementById('algTheory').value = '';
    document.getElementById('algSteps').value = '';
    document.getElementById('algExample').value = '';
    document.getElementById('algFormula').value = '';
}

// Save algorithm
async function saveAlgorithm(event) {
    event.preventDefault();
    const id = document.getElementById('algorithmId').value;
    const algorithm = {
        name: document.getElementById('algName').value,
        type: document.getElementById('algType').value,
        theory: document.getElementById('algTheory').value,
        steps: document.getElementById('algSteps').value,
        example: document.getElementById('algExample').value,
        formula: document.getElementById('algFormula').value
    };
    
    const token = getToken();
    let result;
    if (id) {
        result = await algorithmAPI.update(id, algorithm, token);
    } else {
        result = await algorithmAPI.create(algorithm, token);
    }
    
    if (result.success) {
        cancelAlgorithmForm();
        loadAlgorithms();
    } else {
        alert('Error saving algorithm');
    }
}

// Edit algorithm
async function editAlgorithm(id) {
    const algorithm = algorithms.find(a => a.id === id);
    if (algorithm) {
        document.getElementById('algorithmForm').style.display = 'block';
        document.getElementById('algorithmId').value = algorithm.id;
        document.getElementById('algName').value = algorithm.name;
        document.getElementById('algType').value = algorithm.type;
        document.getElementById('algTheory').value = algorithm.theory || '';
        document.getElementById('algSteps').value = algorithm.steps || '';
        document.getElementById('algExample').value = algorithm.example || '';
        document.getElementById('algFormula').value = algorithm.formula || '';
    }
}

// Delete algorithm
async function deleteAlgorithm(id) {
    if (confirm('Are you sure you want to delete this algorithm?')) {
        const result = await algorithmAPI.delete(id, getToken());
        if (result.success) {
            loadAlgorithms();
        } else {
            alert('Error deleting algorithm');
        }
    }
}

// Cancel algorithm form
function cancelAlgorithmForm() {
    document.getElementById('algorithmForm').style.display = 'none';
}

// Load questions
async function loadQuestions() {
    const result = await quizAPI.getByAlgorithm(0); // Get all
    // Since we don't have a get all endpoint, we'll need to get questions per algorithm
    const algResult = await algorithmAPI.getAll();
    if (algResult.success) {
        const allAlgorithms = algResult.data;
        questions = [];
        for (const alg of allAlgorithms) {
            const qResult = await quizAPI.getByAlgorithm(alg.id);
            if (qResult.success) {
                questions.push(...qResult.data);
            }
        }
        displayQuestions();
        populateAlgorithmSelect();
    }
}

// Display questions
function displayQuestions() {
    const container = document.getElementById('questionsList');
    container.innerHTML = questions.map(q => `
        <div class="admin-item">
            <div>
                <h4>${q.question}</h4>
                <p>Algorithm: ${q.algorithm.name} | Points: ${q.points}</p>
            </div>
            <div class="admin-actions">
                <button onclick="editQuestion(${q.id})" class="btn btn-primary">Edit</button>
                <button onclick="deleteQuestion(${q.id})" class="btn btn-danger">Delete</button>
            </div>
        </div>
    `).join('');
}

// Populate algorithm select
async function populateAlgorithmSelect() {
    const select = document.getElementById('questionAlgorithm');
    const result = await algorithmAPI.getAll();
    if (result.success) {
        select.innerHTML = result.data.map(alg => 
            `<option value="${alg.id}">${alg.name}</option>`
        ).join('');
    }
}

// Show question form
function showQuestionForm() {
    document.getElementById('questionForm').style.display = 'block';
    document.getElementById('questionId').value = '';
    document.getElementById('questionText').value = '';
    document.getElementById('optionA').value = '';
    document.getElementById('optionB').value = '';
    document.getElementById('optionC').value = '';
    document.getElementById('optionD').value = '';
    document.getElementById('correctAnswer').value = 'A';
    document.getElementById('questionPoints').value = '10';
    populateAlgorithmSelect();
}

// Save question
async function saveQuestion(event) {
    event.preventDefault();
    const id = document.getElementById('questionId').value;
    const algId = document.getElementById('questionAlgorithm').value;
    const algorithm = algorithms.find(a => a.id == algId);
    
    if (!algorithm) {
        alert('Please select an algorithm');
        return;
    }
    
    const question = {
        algorithm: { id: algId },
        question: document.getElementById('questionText').value,
        optionA: document.getElementById('optionA').value,
        optionB: document.getElementById('optionB').value,
        optionC: document.getElementById('optionC').value,
        optionD: document.getElementById('optionD').value,
        correctAnswer: document.getElementById('correctAnswer').value,
        points: parseInt(document.getElementById('questionPoints').value)
    };
    
    const token = getToken();
    let result;
    if (id) {
        result = await quizAPI.update(id, question, token);
    } else {
        result = await quizAPI.create(question, token);
    }
    
    if (result.success) {
        cancelQuestionForm();
        loadQuestions();
    } else {
        alert('Error saving question');
    }
}

// Edit question
function editQuestion(id) {
    const question = questions.find(q => q.id === id);
    if (question) {
        document.getElementById('questionForm').style.display = 'block';
        document.getElementById('questionId').value = question.id;
        document.getElementById('questionAlgorithm').value = question.algorithm.id;
        document.getElementById('questionText').value = question.question;
        document.getElementById('optionA').value = question.optionA;
        document.getElementById('optionB').value = question.optionB;
        document.getElementById('optionC').value = question.optionC;
        document.getElementById('optionD').value = question.optionD;
        document.getElementById('correctAnswer').value = question.correctAnswer;
        document.getElementById('questionPoints').value = question.points;
        populateAlgorithmSelect();
    }
}

// Delete question
async function deleteQuestion(id) {
    if (confirm('Are you sure you want to delete this question?')) {
        const result = await quizAPI.delete(id, getToken());
        if (result.success) {
            loadQuestions();
        } else {
            alert('Error deleting question');
        }
    }
}

// Cancel question form
function cancelQuestionForm() {
    document.getElementById('questionForm').style.display = 'none';
}

// Load all scores
async function loadAllScores() {
    const result = await scoreAPI.getAll();
    if (result.success) {
        displayAllScores(result.data);
    }
}

// Display all scores
async function displayAllScores(scores) {
    const container = document.getElementById('allScoresList');
    
    if (scores.length === 0) {
        container.innerHTML = '<p>No scores available.</p>';
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
    scores.forEach(score => {
        const algorithmName = algorithmMap[score.algorithm.id] || 'Unknown Algorithm';
        const percentage = Math.round((score.score / (score.totalQuestions * 10)) * 100);
        const date = new Date(score.completedAt).toLocaleDateString();
        
        html += `
            <div class="score-item">
                <div class="score-info">
                    <h4>${score.user.username} - ${algorithmName}</h4>
                    <p>Completed on: ${date}</p>
                </div>
                <div class="score-value">
                    ${score.score}/${score.totalQuestions * 10} (${percentage}%)
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadAdminData();
});

