// =============================================
// OLUK-D Website JavaScript
// =============================================

// =============================================
// MOBILE MENU
// =============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
    });
});

// =============================================
// HEADER SCROLL EFFECT
// =============================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            header.style.padding = '12px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.padding = '16px 0';
        }
    }
});

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// TESTIMONIAL SLIDER
// =============================================
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    testimonials.forEach((t, i) => {
        t.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });
    
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

if (testimonials.length > 0) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 5000);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        // Reset interval on manual click
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// =============================================
// GALLERY LIGHTBOX
// =============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <img src="${img.src}" alt="${img.alt || ''}">
            <span class="lightbox-close">&times;</span>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
        });
        
        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// =============================================
// CONTACT FORM - VIBER REDIRECT
// =============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('#name');
        const phoneInput = this.querySelector('#phone');
        const emailInput = this.querySelector('#email');
        const messageInput = this.querySelector('#message');
        
        const name = nameInput ? nameInput.value : '';
        const phone = phoneInput ? phoneInput.value : '';
        const email = emailInput ? emailInput.value : '';
        const message = messageInput ? messageInput.value : '';
        
        // Viber number for OLUK-D
        const viberNumber = '%2B381637520304';
        
        // Create message
        const viberMessage = encodeURIComponent(
            `Poruka sa sajta OLUK-D:\n\nIme: ${name}\nTelefon: ${phone}${email ? '\nEmail: ' + email : ''}\n\nPoruka:\n${message}`
        );
        
        // Open Viber
        window.open(`viber://chat?number=${viberNumber}&text=${viberMessage}`, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message
        setTimeout(() => {
            alert('Hvala na poruci! Ako se Viber nije otvorio, pozovite nas direktno na 063/752-0304');
        }, 500);
    });
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
}

// =============================================
// CURRENT YEAR IN FOOTER
// =============================================
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// =============================================
// ACTIVE NAV LINK
// =============================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// =============================================
// LAZY LOAD IMAGES
// =============================================
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// =============================================
// SERVICE CARDS ANIMATION
// =============================================
const serviceCards = document.querySelectorAll('.service-card, .why-item, .value-item');
if (serviceCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        cardObserver.observe(card);
    });
}
