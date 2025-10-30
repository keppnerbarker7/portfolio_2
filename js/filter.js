/*
 * Keppner Barker Portfolio - Project Filtering
 * Interactive filtering for project gallery
 */

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
});

/**
 * Initialize project filtering functionality
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.getElementById('projects-grid');

    if (!filterButtons.length || !projectCards.length) return;

    // Add click handlers to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            filterProjects(filter, projectCards);
        });
    });

    // Initialize with fade-in animation
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Filter projects based on category
 */
function filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
            // Show card with staggered animation
            card.style.display = 'flex';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            // Hide card
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    // Update grid layout after filtering
    setTimeout(updateGridLayout, 400);
}

/**
 * Update grid layout after filtering
 */
function updateGridLayout() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    // Force reflow to ensure proper grid layout
    projectsGrid.style.display = 'none';
    projectsGrid.offsetHeight; // Trigger reflow
    projectsGrid.style.display = 'grid';
}

/**
 * Search functionality (if search input exists)
 */
function initProjectSearch() {
    const searchInput = document.getElementById('project-search');
    if (!searchInput) return;

    const projectCards = document.querySelectorAll('.project-card');

    searchInput.addEventListener('input', PortfolioUtils.debounce((e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        projectCards.forEach(card => {
            const title = card.querySelector('.project-card__title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.project-card__description')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const matchesSearch = searchTerm === '' ||
                title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tags.some(tag => tag.includes(searchTerm));

            if (matchesSearch) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });

        setTimeout(updateGridLayout, 400);
    }, 300));
}

/**
 * Sort functionality
 */
function initProjectSorting() {
    const sortSelect = document.getElementById('project-sort');
    if (!sortSelect) return;

    const projectsGrid = document.getElementById('projects-grid');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));

    sortSelect.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        const sortedCards = sortProjectCards(projectCards, sortBy);

        // Clear grid and re-append sorted cards
        projectsGrid.innerHTML = '';
        sortedCards.forEach(card => {
            projectsGrid.appendChild(card);
        });

        // Re-animate cards
        sortedCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    });
}

/**
 * Sort project cards by specified criteria
 */
function sortProjectCards(cards, sortBy) {
    return cards.sort((a, b) => {
        switch (sortBy) {
            case 'title':
                const titleA = a.querySelector('.project-card__title').textContent;
                const titleB = b.querySelector('.project-card__title').textContent;
                return titleA.localeCompare(titleB);

            case 'category':
                const categoryA = a.dataset.category || '';
                const categoryB = b.dataset.category || '';
                return categoryA.localeCompare(categoryB);

            case 'newest':
                // Assuming data-date attribute exists
                const dateA = new Date(a.dataset.date || '2024-01-01');
                const dateB = new Date(b.dataset.date || '2024-01-01');
                return dateB - dateA;

            case 'oldest':
                const dateC = new Date(a.dataset.date || '2024-01-01');
                const dateD = new Date(b.dataset.date || '2024-01-01');
                return dateC - dateD;

            default:
                return 0;
        }
    });
}

/**
 * Project card hover enhancements
 */
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-card__overlay');
        const image = card.querySelector('.project-card__media img');

        if (!overlay || !image) return;

        // Add magnetic effect to cards
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (y / rect.height) * 10;
            const rotateY = (x / rect.width) * -10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });

        // Add subtle parallax to overlay content
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveX = (x / rect.width - 0.5) * 20;
            const moveY = (y / rect.height - 0.5) * 20;

            if (overlay) {
                overlay.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (overlay) {
                overlay.style.transform = 'translate(0, 0)';
            }
        });
    });
}

// Initialize search and sorting if elements exist
document.addEventListener('DOMContentLoaded', () => {
    initProjectSearch();
    initProjectSorting();
    enhanceProjectCards();
});

// Export functions for external use
window.ProjectFilters = {
    filterProjects,
    sortProjectCards,
    updateGridLayout
};