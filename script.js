class WaterCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.mousePos = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mousePos = { x: e.clientX, y: e.clientY };
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
            
            if (Math.abs(this.mousePos.x - this.lastMousePos.x) > 20 ||
                Math.abs(this.mousePos.y - this.lastMousePos.y) > 20) {
                this.createDroplet(this.lastMousePos.x, this.lastMousePos.y);
                this.lastMousePos = { ...this.mousePos };
            }
        });

        document.addEventListener('click', (e) => {
            this.createSplash(e.clientX, e.clientY);
            this.createRipple(e.clientX, e.clientY);
        });

        document.addEventListener('mousedown', () => {
            this.cursor.style.width = '15px';
            this.cursor.style.height = '15px';
        });

        document.addEventListener('mouseup', () => {
            this.cursor.style.width = '20px';
            this.cursor.style.height = '20px';
        });
    }

    createSplash(x, y) {
        const splash = document.createElement('div');
        splash.className = 'splash';
        splash.style.left = `${x}px`;
        splash.style.top = `${y}px`;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-particle';

            const angle = (Math.PI * 2 * i) / 8;
            const distance = 20 + Math.random() * 20;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            splash.appendChild(particle);
        }

        document.body.appendChild(splash);
        setTimeout(() => splash.remove(), 1000);
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${x - 50}px`;
        ripple.style.top = `${y - 50}px`;

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    createDroplet(x, y) {
        const droplet = document.createElement('div');
        droplet.className = 'droplet';
        droplet.style.left = `${x}px`;
        droplet.style.top = `${y}px`;

        document.body.appendChild(droplet);
        setTimeout(() => droplet.remove(), 1000);
    }
}

window.addEventListener('load', () => {
    new WaterCursor();
});

// Responsive Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close menu when clicking a link on mobile
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! Our AI will analyze and respond shortly.');
        this.reset();
    });
}
