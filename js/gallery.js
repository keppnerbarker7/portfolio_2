/*
 * Keppner Barker Portfolio - Gallery & Lightbox
 * Interactive photo gallery with lightbox functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initLightbox();
    initGalleryFilters();
});

let currentImageIndex = 0;
let galleryImages = [];

/**
 * Initialize gallery functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt,
            caption: img.dataset.caption || img.alt,
            element: item
        };
    });

    // Add click handlers to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });

        // Add keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });

        // Add loading states for images
        const img = item.querySelector('img');
        img.addEventListener('load', () => {
            item.classList.add('loaded');
        });

        img.addEventListener('error', () => {
            item.classList.add('error');
            console.error('Failed to load image:', img.src);
        });
    });

    // Preload nearby images for better performance
    preloadNearbyImages();
}

/**
 * Initialize lightbox functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!lightbox || !lightboxImage) return;

    // Close lightbox handlers
    closeBtn?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation handlers
    prevBtn?.addEventListener('click', () => showPreviousImage());
    nextBtn?.addEventListener('click', () => showNextImage());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Touch/swipe support for mobile
    initTouchSupport(lightbox);
}

/**
 * Initialize gallery filters
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter gallery items
            filterGalleryItems(filter, galleryItems);
        });
    });
}

/**
 * Filter gallery items by category
 */
function filterGalleryItems(filter, galleryItems) {
    let visibleItems = [];

    galleryItems.forEach((item, index) => {
        const categories = item.dataset.category ? item.dataset.category.split(' ') : [];
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
            item.style.display = 'block';
            visibleItems.push(item);

            // Animate in with stagger
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, visibleItems.length * 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';

            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });

    // Update galleryImages array to only include visible items
    galleryImages = visibleItems.map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt,
            caption: img.dataset.caption || img.alt,
            element: item
        };
    });
}

/**
 * Open lightbox with specific image
 */
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (!lightbox || !lightboxImage || index >= galleryImages.length) return;

    currentImageIndex = index;
    const imageData = galleryImages[index];

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Set image and caption
    lightboxImage.src = imageData.src;
    lightboxImage.alt = imageData.alt;

    if (lightboxCaption) {
        lightboxCaption.textContent = imageData.caption;
    }

    // Show lightbox
    lightbox.classList.add('active');

    // Update navigation button visibility
    updateNavigationButtons();

    // Preload adjacent images
    preloadAdjacentImages(index);

    // Analytics tracking
    trackGalleryInteraction('lightbox_open', imageData.caption);
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');

    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';

    // Analytics tracking
    trackGalleryInteraction('lightbox_close');
}

/**
 * Show previous image in lightbox
 */
function showPreviousImage() {
    if (currentImageIndex > 0) {
        openLightbox(currentImageIndex - 1);
    }
}

/**
 * Show next image in lightbox
 */
function showNextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        openLightbox(currentImageIndex + 1);
    }
}

/**
 * Update navigation button visibility
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (prevBtn) {
        prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
    }

    if (nextBtn) {
        nextBtn.style.display = currentImageIndex < galleryImages.length - 1 ? 'block' : 'none';
    }
}

/**
 * Preload images for better performance
 */
function preloadNearbyImages() {
    const currentImages = document.querySelectorAll('.gallery-item img');

    currentImages.forEach(img => {
        if (img.loading !== 'lazy') {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
}

/**
 * Preload adjacent images in lightbox
 */
function preloadAdjacentImages(index) {
    // Preload previous image
    if (index > 0) {
        const prevImg = new Image();
        prevImg.src = galleryImages[index - 1].src;
    }

    // Preload next image
    if (index < galleryImages.length - 1) {
        const nextImg = new Image();
        nextImg.src = galleryImages[index + 1].src;
    }
}

/**
 * Touch/swipe support for mobile lightbox
 */
function initTouchSupport(lightbox) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    lightbox.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;

        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        // Horizontal swipe (left/right navigation)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                showPreviousImage(); // Swipe right = previous
            } else {
                showNextImage(); // Swipe left = next
            }
        }
        // Vertical swipe down (close lightbox)
        else if (deltaY > minSwipeDistance && Math.abs(deltaX) < minSwipeDistance) {
            closeLightbox();
        }
    });
}

/**
 * Lazy loading with Intersection Observer
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const galleryItem = img.closest('.gallery-item');

                    // Add loading class
                    if (galleryItem) {
                        galleryItem.classList.add('loading');
                    }

                    img.onload = () => {
                        if (galleryItem) {
                            galleryItem.classList.remove('loading');
                            galleryItem.classList.add('loaded');
                        }
                    };

                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Gallery search functionality
 */
function initGallerySearch() {
    const searchInput = document.getElementById('gallery-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', PortfolioUtils.debounce((e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            const caption = img.dataset.caption || img.alt || '';
            const category = item.dataset.category || '';

            const matchesSearch = searchTerm === '' ||
                caption.toLowerCase().includes(searchTerm) ||
                category.toLowerCase().includes(searchTerm);

            if (matchesSearch) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    if (item.style.opacity === '0') {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    }, 300));
}

/**
 * Analytics tracking for gallery interactions
 */
function trackGalleryInteraction(action, label = '') {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Gallery',
            event_label: label
        });
    }

    // Custom analytics
    console.log(`Gallery ${action}:`, label);
}

/**
 * Keyboard accessibility improvements
 */
function enhanceAccessibility() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        // Add ARIA labels
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Open image ${index + 1} in lightbox`);

        // Focus styles
        item.addEventListener('focus', () => {
            item.style.outline = '2px solid var(--color-accent)';
        });

        item.addEventListener('blur', () => {
            item.style.outline = 'none';
        });
    });

    // Screen reader support for lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image viewer');
    }
}

/**
 * Performance optimization
 */
function optimizeGalleryPerformance() {
    // Use will-change for elements about to animate
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.willChange = 'transform';
        });

        item.addEventListener('mouseleave', () => {
            item.style.willChange = 'auto';
        });
    });

    // Virtualization for large galleries (if needed)
    if (galleryItems.length > 50) {
        console.log('Large gallery detected, consider implementing virtualization');
    }
}

// Initialize all gallery enhancements
document.addEventListener('DOMContentLoaded', () => {
    initLazyLoading();
    initGallerySearch();
    enhanceAccessibility();
    optimizeGalleryPerformance();
});

// Export functions for external use
window.Gallery = {
    openLightbox,
    closeLightbox,
    showNextImage,
    showPreviousImage,
    filterGalleryItems
};