// Navigation
function navigateTo(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    if (section === 'skills') {
        animateSkills();
    }
    
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    body.classList.toggle('dark');
    body.classList.toggle('light');
    icon.textContent = body.classList.contains('dark') ? '🌙' : '☀️';
}

// Typing Effect - DEBATER REMOVED HERE
const texts = [
    'Aspiring Ai and data science',
    'Mern Stack Developer 💻',
    'Problem Solver 🧩',
    'Creative Thinker 💡'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    const typedElement = document.getElementById('typed-text');
    
    if (isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(type, typingSpeed);
}

// Particles
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        container.appendChild(particle);
    }
}

// Skills Animation
function animateSkills() {
    const fills = document.querySelectorAll('.progress-fill');
    fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
            fill.style.width = width + '%';
        }, 200);
    });
}

// Form Submit
function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
}

// Projects Logic
const projectData = [
    { github: 'https://github.com/MeerabKhan123/book-shop', live: 'https://bookshop100.netlify.app/' },
    { github: 'https://github.com/MeerabKhan123/finance-tracker-', live: 'https://finance-tracker-three-chi.vercel.app/' },
    { github: 'https://github.com/MeerabKhan123/creative_portfolio', live: 'https://portfoliocreativity.netlify.app/' },
    { github: 'https://github.com/MeerabKhan123/airpord', live: 'https://airpord1.netlify.app/' },
    { github: 'https://github.com/MeerabKhan123/Todo-app', live: 'https://todo-app1react.netlify.app/' },
    { github: 'https://github.com/MeerabKhan123/mind-wellness', live: 'https://mind-wellness-two.vercel.app/' }
];

function loadProjectImage(index, input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const card = document.querySelector(`[data-project="${index}"]`);
            const img = card.querySelector('img');
            const placeholder = card.querySelector('.project-placeholder');
            const overlay = card.querySelector('.upload-overlay');
            
            img.src = e.target.result;
            img.style.display = 'block';
            placeholder.style.display = 'none';
            overlay.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function openProjectModal(index) {
    const project = projectData[index];
    const card = document.querySelectorAll('.project-card')[index];
    const title = card.querySelector('.project-title').textContent;
    const tech = card.querySelector('.project-tech').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <p class="modal-tech">${tech}</p>
            </div>
            <div class="modal-description">
                <p>This is a comprehensive project showcasing modern web development practices.</p>
            </div>
            <div class="modal-links">
                <a href="${project.github}" target="_blank" class="modal-link github">
                    <span style="font-size: 1.5rem;">📁</span>
                    <span>View on GitHub</span>
                </a>
                <a href="${project.live}" target="_blank" class="modal-link live">
                    <span style="font-size: 1.5rem;">🚀</span>
                    <span>Live Demo</span>
                </a>
            </div>
        </div>
    `;
    
    modal.onclick = function(e) {
        if (e.target === modal) modal.remove();
    };
    
    document.body.appendChild(modal);
}

// Initialize
window.addEventListener('load', () => {
    createParticles();
    type();
});