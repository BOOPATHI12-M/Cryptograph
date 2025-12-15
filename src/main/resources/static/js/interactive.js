// Interactive Utilities and Features

// Toast Notification System
class Toast {
    static show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${this.getIcon(type)}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    static getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }
}

// Tooltip System
class Tooltip {
    static init() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', this.show);
            element.addEventListener('mouseleave', this.hide);
        });
    }
    
    static show(event) {
        const text = event.target.getAttribute('data-tooltip');
        if (!text) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => tooltip.classList.add('show'), 10);
        
        event.target._tooltip = tooltip;
    }
    
    static hide(event) {
        if (event.target._tooltip) {
            event.target._tooltip.classList.remove('show');
            setTimeout(() => event.target._tooltip.remove(), 200);
        }
    }
}

// Modal System
class Modal {
    static show(title, content, buttons = []) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="Modal.close(this)">×</button>
                </div>
                <div class="modal-body">${content}</div>
                <div class="modal-footer">
                    ${buttons.map(btn => 
                        `<button class="btn ${btn.class || 'btn-primary'}" onclick="${btn.onclick || 'Modal.close(this)'}">${btn.text}</button>`
                    ).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) Modal.close(modal.querySelector('.modal-close'));
        });
        
        return modal;
    }
    
    static close(button) {
        const modal = button.closest('.modal-overlay');
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
    
    static confirm(message, onConfirm, onCancel) {
        return this.show('Confirm', message, [
            {
                text: 'Cancel',
                class: 'btn-secondary',
                onclick: `Modal.close(this); ${onCancel ? onCancel.toString() + '()' : ''}`
            },
            {
                text: 'Confirm',
                class: 'btn-primary',
                onclick: `Modal.close(this); ${onConfirm ? onConfirm.toString() + '()' : ''}`
            }
        ]);
    }
}

// Search/Filter System
class SearchFilter {
    static init(containerSelector, cardSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        // Use static ID for features-grid, dynamic for others
        const searchId = containerSelector === '.features-grid' 
            ? 'searchInput' 
            : `searchInput-${containerSelector.replace(/[^a-zA-Z0-9]/g, '-')}`;
        
        // Create search input
        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'search-wrapper';
        searchWrapper.innerHTML = `
            <input type="text" class="search-input" placeholder="Search..." id="${searchId}" />
            <span class="search-icon">🔍</span>
        `;
        
        container.insertBefore(searchWrapper, container.firstChild);
        
        const searchInput = document.getElementById(searchId);
        const cards = container.querySelectorAll(cardSelector);
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            let visibleCount = 0;
            
            cards.forEach((card, index) => {
                const text = card.textContent.toLowerCase();
                const matches = text.includes(query);
                
                if (matches) {
                    card.style.display = '';
                    card.style.animationDelay = `${visibleCount * 0.05}s`;
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show no results message
            const noResults = document.querySelector('.no-results');
            if (visibleCount === 0 && query) {
                if (!noResults) {
                    const msg = document.createElement('div');
                    msg.className = 'no-results';
                    msg.textContent = 'No results found';
                    container.appendChild(msg);
                }
            } else if (noResults) {
                noResults.remove();
            }
        });
    }
}

// Progress Bar
class ProgressBar {
    static create(container, value = 0, max = 100) {
        const progress = document.createElement('div');
        progress.className = 'progress-container';
        progress.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(value/max)*100}%"></div>
            </div>
            <span class="progress-text">${value}%</span>
        `;
        container.appendChild(progress);
        return progress;
    }
    
    static update(progressElement, value, max = 100) {
        const fill = progressElement.querySelector('.progress-fill');
        const text = progressElement.querySelector('.progress-text');
        fill.style.width = `${(value/max)*100}%`;
        text.textContent = `${Math.round((value/max)*100)}%`;
    }
}

// Interactive Card Flip
function initCardFlip() {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// Live Form Validation
class FormValidator {
    static init(formSelector) {
        const form = document.querySelector(formSelector);
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validate(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validate(input);
                }
            });
        });
        
        form.addEventListener('submit', (e) => {
            let isValid = true;
            inputs.forEach(input => {
                if (!this.validate(input)) isValid = false;
            });
            if (!isValid) e.preventDefault();
        });
    }
    
    static validate(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        let message = '';
        
        // Required validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email';
            }
        }
        
        // Password validation
        if (type === 'password' && value) {
            if (value.length < 6) {
                isValid = false;
                message = 'Password must be at least 6 characters';
            }
        }
        
        // Show/hide error
        this.showError(input, isValid, message);
        return isValid;
    }
    
    static showError(input, isValid, message) {
        const errorDiv = input.parentElement.querySelector('.field-error') || 
                        document.createElement('div');
        errorDiv.className = 'field-error';
        
        if (!isValid) {
            input.classList.add('error');
            errorDiv.textContent = message;
            if (!input.parentElement.querySelector('.field-error')) {
                input.parentElement.appendChild(errorDiv);
            }
        } else {
            input.classList.remove('error');
            errorDiv.remove();
        }
    }
}

// Typing Effect
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Interactive Cursor Effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .algorithm-card, .feature-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// Loading Skeleton
function showSkeleton(container, count = 3) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
        `;
        container.appendChild(skeleton);
    }
}

// Scroll Progress Indicator
function initScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    Tooltip.init();
    FormValidator.init('form');
    initCardFlip();
    initParallax();
    initScrollIndicator();
    // initCursorEffect(); // Uncomment if you want custom cursor
    
    // Add interactive attributes to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.hasAttribute('data-tooltip') && btn.textContent.trim()) {
            btn.setAttribute('data-tooltip', btn.textContent.trim());
        }
    });
    
    // Add reveal animations to elements on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    // Add interactive hover effects to cards
    document.querySelectorAll('.algorithm-card, .feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect to buttons
    document.querySelectorAll('.btn, .algorithm-card, .feature-card').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});
