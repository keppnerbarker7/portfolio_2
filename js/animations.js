/*
 * Keppner Barker Portfolio - Animations
 * Scroll-triggered animations and micro-interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallaxEffects();
    initCounters();
    initTypewriterEffect();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('in-view');

                // Add specific animation classes if they exist
                if (element.classList.contains('fade-in-up')) {
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
                if (element.classList.contains('fade-in-left')) {
                    element.style.animation = 'fadeInLeft 0.8s ease-out forwards';
                }
                if (element.classList.contains('fade-in-right')) {
                    element.style.animation = 'fadeInRight 0.8s ease-out forwards';
                }
                if (element.classList.contains('scale-in')) {
                    element.style.animation = 'scaleIn 0.8s ease-out forwards';
                }
                if (element.classList.contains('slide-in-up')) {
                    element.style.animation = 'slideInUp 0.8s ease-out forwards';
                }

                // Handle staggered animations
                const staggerClasses = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6'];
                staggerClasses.forEach((staggerClass, index) => {
                    if (element.classList.contains(staggerClass)) {
                        element.style.animationDelay = `${(index + 1) * 0.1}s`;
                    }
                });

                // Unobserve after animation starts
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Parallax effects for enhanced visual appeal
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (!parallaxElements.length) return;

    const updateParallax = PortfolioUtils.throttle(() => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16); // ~60fps

    window.addEventListener('scroll', updateParallax);
}

/**
 * Animated counters for statistics
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    if (!counters.length) return;

    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Typewriter effect for dynamic text
 */
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');

    if (!typewriterElements.length) return;

    const typeWriter = (element) => {
        const text = element.dataset.typewriter;
        const speed = parseInt(element.dataset.speed) || 50;
        let i = 0;

        element.textContent = '';

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    };

    // Intersection Observer for typewriter
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                setTimeout(() => typeWriter(element), 500);
                typewriterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.8 });

    typewriterElements.forEach(element => {
        typewriterObserver.observe(element);
    });
}

/**
 * Smooth reveal animations for project cards
 */
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;

        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Button ripple effect
 */
function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Magnetic button effect
 */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);

            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.2;
                const moveY = y * strength * 0.2;

                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Text reveal animation
 */
function initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal]');

    textElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');

        element.innerHTML = words.map(word =>
            `<span class="word">${word.split('').map(char =>
                `<span class="char">${char}</span>`
            ).join('')}</span>`
        ).join(' ');

        const chars = element.querySelectorAll('.char');

        // Intersection Observer for text reveal
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chars.forEach((char, index) => {
                        char.style.animationDelay = `${index * 0.03}s`;
                        char.classList.add('reveal');
                    });
                    textObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        textObserver.observe(element);
    });
}

/**
 * Smooth page transitions
 */
function initPageTransitions() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's an external link
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                return;
            }

            e.preventDefault();

            // Add fade-out effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

/**
 * Initialize all animation enhancements
 */
function initAnimationEnhancements() {
    initProjectCardAnimations();
    initButtonRipples();
    initMagneticButtons();
    initTextReveal();
    initPageTransitions();
}

// Initialize enhancements after DOM is ready
document.addEventListener('DOMContentLoaded', initAnimationEnhancements);

/**
 * Reduced motion support
 */
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable complex animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-base', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
}

// Check for reduced motion preference
handleReducedMotion();

// Listen for changes in motion preference
if (window.matchMedia) {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', handleReducedMotion);
}

/**
 * Performance optimization for animations
 */
function optimizeAnimationPerformance() {
    // Use will-change property for elements about to animate
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    animateElements.forEach(element => {
        element.style.willChange = 'transform, opacity';

        // Remove will-change after animation completes
        element.addEventListener('animationend', () => {
            element.style.willChange = 'auto';
        });
    });

    // Use transform instead of changing layout properties
    const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale');

    hoverElements.forEach(element => {
        element.style.willChange = 'transform';
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeAnimationPerformance);