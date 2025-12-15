const API_BASE_URL = 'http://localhost:8080/api';

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', body = null, token = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Auth API
const authAPI = {
    login: (username, password) => apiCall('/auth/login', 'POST', { username, password }),
    register: (username, password, email) => apiCall('/auth/register', 'POST', { username, password, email })
};

// Algorithm API
const algorithmAPI = {
    getAll: () => apiCall('/algorithms'),
    getById: (id) => apiCall(`/algorithms/${id}`),
    create: (algorithm, token) => apiCall('/algorithms', 'POST', algorithm, token),
    update: (id, algorithm, token) => apiCall(`/algorithms/${id}`, 'PUT', algorithm, token),
    delete: (id, token) => apiCall(`/algorithms/${id}`, 'DELETE', null, token)
};

// Quiz API
const quizAPI = {
    getByAlgorithm: (algorithmId) => apiCall(`/quiz/algorithm/${algorithmId}`),
    getById: (id) => apiCall(`/quiz/${id}`),
    create: (question, token) => apiCall('/quiz', 'POST', question, token),
    update: (id, question, token) => apiCall(`/quiz/${id}`, 'PUT', question, token),
    delete: (id, token) => apiCall(`/quiz/${id}`, 'DELETE', null, token),
    submit: (algorithmId, answers) => apiCall(`/quiz/submit/${algorithmId}`, 'POST', answers)
};

// Score API
const scoreAPI = {
    save: (scoreData, token) => apiCall('/scores', 'POST', scoreData, token),
    getByUser: (userId) => apiCall(`/scores/user/${userId}`),
    getAll: () => apiCall('/scores'),
    getByAlgorithm: (algorithmId) => apiCall(`/scores/algorithm/${algorithmId}`)
};

// Crypto API
const cryptoAPI = {
    caesarEncrypt: (plaintext, shift) => apiCall('/crypto/caesar/encrypt', 'POST', { plaintext, shift }),
    caesarDecrypt: (ciphertext, shift) => apiCall('/crypto/caesar/decrypt', 'POST', { ciphertext, shift }),
    vigenereEncrypt: (plaintext, key) => apiCall('/crypto/vigenere/encrypt', 'POST', { plaintext, key }),
    vigenereDecrypt: (ciphertext, key) => apiCall('/crypto/vigenere/decrypt', 'POST', { ciphertext, key }),
    playfairEncrypt: (plaintext, key) => apiCall('/crypto/playfair/encrypt', 'POST', { plaintext, key }),
    playfairDecrypt: (ciphertext, key) => apiCall('/crypto/playfair/decrypt', 'POST', { ciphertext, key }),
    rsaGenerateKeys: () => apiCall('/crypto/rsa/generate-keys', 'POST'),
    rsaEncrypt: (plaintext, publicKey) => apiCall('/crypto/rsa/encrypt', 'POST', { plaintext, publicKey }),
    rsaDecrypt: (ciphertext, privateKey) => apiCall('/crypto/rsa/decrypt', 'POST', { ciphertext, privateKey }),
    aesEncrypt: (plaintext) => apiCall('/crypto/aes/encrypt', 'POST', { plaintext }),
    aesDecrypt: (ciphertext, key, iv) => apiCall('/crypto/aes/decrypt', 'POST', { ciphertext, key, iv }),
    desEncrypt: (plaintext) => apiCall('/crypto/des/encrypt', 'POST', { plaintext }),
    desDecrypt: (ciphertext, key, iv) => apiCall('/crypto/des/decrypt', 'POST', { ciphertext, key, iv })
};

