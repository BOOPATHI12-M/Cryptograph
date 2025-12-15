// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
        if (window.location.pathname !== '/index.html' && 
            !window.location.pathname.endsWith('/')) {
            window.location.href = 'index.html';
            return false;
        }
        return false;
    }
    
    try {
        const userObj = JSON.parse(user);
        if (userObj.role === 'ADMIN') {
            const adminLink = document.getElementById('adminLink');
            if (adminLink) adminLink.style.display = 'inline';
        }
    } catch (e) {
        console.error('Error parsing user data:', e);
    }
    
    return true;
}

// Show login form
function showLogin() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Smooth transition
    signupForm.style.opacity = '0';
    signupForm.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        loginForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            loginForm.style.opacity = '1';
            loginForm.style.transform = 'translateX(0)';
        }, 10);
    }, 200);
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Show signup form
function showSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Smooth transition
    loginForm.style.opacity = '0';
    loginForm.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        signupForm.style.opacity = '0';
        signupForm.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            signupForm.style.opacity = '1';
            signupForm.style.transform = 'translateX(0)';
        }, 10);
    }, 200);
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    errorDiv.classList.remove('show');
    
    // Add loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Logging in...';
    submitBtn.style.opacity = '0.7';
    
    try {
        const result = await authAPI.login(username, password);
        
        if (result.success && result.data.success) {
            // Success animation
            submitBtn.innerHTML = '✓ Success!';
            submitBtn.style.background = '#27ae60';
            Toast.show('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('user', JSON.stringify(result.data.user));
                window.location.href = 'home.html';
            }, 500);
        } else {
            errorDiv.textContent = result.data?.message || 'Login failed';
            errorDiv.classList.add('show');
            Toast.show(result.data?.message || 'Login failed', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
        }
    } catch (error) {
        errorDiv.textContent = 'An error occurred. Please try again.';
        errorDiv.classList.add('show');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
    }
}

// Handle signup
async function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const errorDiv = document.getElementById('signupError');
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    errorDiv.classList.remove('show');
    
    // Add loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Creating account...';
    submitBtn.style.opacity = '0.7';
    
    try {
        const result = await authAPI.register(username, password, email);
        
        if (result.success && result.data.success) {
            // Success animation
            submitBtn.innerHTML = '✓ Account created!';
            submitBtn.style.background = '#27ae60';
            Toast.show('Account created successfully! Redirecting...', 'success');
            
            setTimeout(() => {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('user', JSON.stringify(result.data.user));
                window.location.href = 'home.html';
            }, 500);
        } else {
            errorDiv.textContent = result.data?.message || 'Registration failed';
            errorDiv.classList.add('show');
            Toast.show(result.data?.message || 'Registration failed', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
        }
    } catch (error) {
        errorDiv.textContent = 'An error occurred. Please try again.';
        errorDiv.classList.add('show');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Get token
function getToken() {
    return localStorage.getItem('token');
}

// Check auth on page load (except login page)
if (!window.location.pathname.includes('index.html')) {
    window.addEventListener('DOMContentLoaded', checkAuth);
}

