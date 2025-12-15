// Load algorithms on home page
async function loadAlgorithms() {
    const container = document.getElementById('algorithmsList');
    if (!container) return;
    
    // Show loading skeleton
    showSkeleton(container, 6);
    
    try {
        const result = await algorithmAPI.getAll();
        
        if (result.success) {
            const algorithms = result.data;
            
            if (algorithms.length === 0) {
                container.innerHTML = '<div class="no-results">No algorithms available yet.</div>';
                return;
            }
            
            container.innerHTML = algorithms.map((alg, index) => `
                <div class="algorithm-card reveal" data-tooltip="Click to learn ${alg.name}" style="animation-delay: ${index * 0.1}s" onclick="viewAlgorithm(${alg.id})">
                    <h3>${alg.name}</h3>
                    <p>Type: ${alg.type}</p>
                    <span class="type-badge">${alg.type}</span>
                </div>
            `).join('');
            
            // Trigger reveal animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        } else {
            Toast.show('Failed to load algorithms', 'error');
            container.innerHTML = '<div class="no-results">Failed to load algorithms. Please try again.</div>';
        }
    } catch (error) {
        Toast.show('An error occurred while loading algorithms', 'error');
        container.innerHTML = '<div class="no-results">An error occurred. Please refresh the page.</div>';
    }
}

// View algorithm details
function viewAlgorithm(id) {
    window.location.href = `algorithm-detail.html?id=${id}`;
}

// Load on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadAlgorithms();
});

