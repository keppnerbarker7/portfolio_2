/*
 * Keppner Barker Portfolio - Contact Form
 * Contact form handling and validation
 */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFormValidation();
    initFormEnhancements();
});

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');

    // Validate form before submission
    if (!validateForm(form)) {
        showFormError('Please fix the errors above before submitting.');
        return;
    }

    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Convert FormData to object
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // For now, we'll use a simple email link since this is a static site
        // In production, you'd want to use a service like Netlify Forms, Formspree, or EmailJS
        const emailSubject = `Portfolio Contact: ${formObject['project-type'] || 'General Inquiry'}`;
        const emailBody = `
Name: ${formObject.name}
Email: ${formObject.email}
Project Type: ${formObject['project-type'] || 'Not specified'}
Budget: ${formObject.budget || 'Not specified'}
Timeline: ${formObject.timeline || 'Not specified'}

Message:
${formObject.message}
        `.trim();

        // Create mailto link
        const mailtoLink = `mailto:hello@keppnerbarker.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showFormSuccess();

        // Reset form
        form.reset();

        // Track form submission
        trackFormSubmission(formObject);

    } catch (error) {
        console.error('Form submission error:', error);
        showFormError('There was an error sending your message. Please try again or email me directly.');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    // Additional validations
    const email = form.querySelector('#email');
    if (email && !isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address.');
        isValid = false;
    }

    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }

    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address.');
        return false;
    }

    // Message length validation
    if (field.id === 'message' && value && value.length < 10) {
        showFieldError(field, 'Please provide more details about your project.');
        return false;
    }

    clearFieldError(field);
    return true;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    // Remove existing error
    clearFieldError(field);

    // Add error styling
    field.style.borderColor = 'var(--color-accent-warm)';

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: var(--color-accent-warm);
        font-size: var(--text-sm);
        margin-top: var(--space-xs);
        font-weight: 500;
    `;
    errorDiv.textContent = message;

    // Insert error message
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    field.style.borderColor = 'var(--color-border)';

    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Show form success message
 */
function showFormSuccess() {
    const successDiv = document.getElementById('form-success');
    if (successDiv) {
        successDiv.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

/**
 * Show form error message
 */
function showFormError(message) {
    // Create or update error message at top of form
    const form = document.getElementById('contact-form');
    const existingError = form.querySelector('.form-error');

    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            background: rgba(193, 102, 107, 0.1);
            border: 1px solid var(--color-accent-warm);
            color: var(--color-accent-warm);
            padding: var(--space-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--space-lg);
            font-weight: 500;
        `;
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
        const errorElement = form.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }, 5000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Initialize form validation enhancements
 */
function initFormValidation() {
    // Add focus styles
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--color-accent)';
            input.style.outline = 'none';
            input.style.boxShadow = '0 0 0 3px rgba(0, 119, 182, 0.1)';
        });

        input.addEventListener('blur', () => {
            if (!input.classList.contains('error')) {
                input.style.borderColor = 'var(--color-border)';
                input.style.boxShadow = 'none';
            }
        });
    });
}

/**
 * Initialize form enhancements
 */
function initFormEnhancements() {
    // Auto-resize textarea
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    }

    // Add character counter for message field
    addCharacterCounter();

    // Add smart field suggestions
    addSmartSuggestions();

    // Add form progress indicator
    addFormProgress();
}

/**
 * Add character counter to message field
 */
function addCharacterCounter() {
    const messageField = document.getElementById('message');
    if (!messageField) return;

    const counter = document.createElement('div');
    counter.style.cssText = `
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        text-align: right;
        margin-top: var(--space-xs);
    `;

    messageField.parentNode.appendChild(counter);

    const updateCounter = () => {
        const length = messageField.value.length;
        const minLength = 10;
        const recommendedLength = 150;

        if (length < minLength) {
            counter.textContent = `${length} characters (minimum ${minLength})`;
            counter.style.color = 'var(--color-accent-warm)';
        } else if (length < recommendedLength) {
            counter.textContent = `${length} characters (recommended ${recommendedLength}+)`;
            counter.style.color = 'var(--color-text-muted)';
        } else {
            counter.textContent = `${length} characters ✓`;
            counter.style.color = 'var(--color-success)';
        }
    };

    messageField.addEventListener('input', updateCounter);
    updateCounter(); // Initial call
}

/**
 * Add smart field suggestions
 */
function addSmartSuggestions() {
    const projectTypeSelect = document.getElementById('project-type');
    const budgetSelect = document.getElementById('budget');

    if (projectTypeSelect && budgetSelect) {
        projectTypeSelect.addEventListener('change', () => {
            const projectType = projectTypeSelect.value;

            // Auto-suggest budget ranges based on project type
            if (projectType === 'product-strategy' || projectType === 'ux-design') {
                if (!budgetSelect.value) {
                    budgetSelect.value = '15k-30k';
                }
            } else if (projectType === 'photography' || projectType === 'consulting') {
                if (!budgetSelect.value) {
                    budgetSelect.value = '5k-15k';
                }
            }
        });
    }
}

/**
 * Add form progress indicator
 */
function addFormProgress() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 100%;
        height: 4px;
        background: var(--color-border);
        border-radius: 2px;
        margin-bottom: var(--space-lg);
        overflow: hidden;
    `;

    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, var(--color-accent), var(--color-success));
        width: 0%;
        transition: width var(--transition-base);
        border-radius: 2px;
    `;

    progressBar.appendChild(progressFill);
    form.insertBefore(progressBar, form.firstChild);

    const updateProgress = () => {
        let filledFields = 0;
        requiredFields.forEach(field => {
            if (field.value.trim()) {
                filledFields++;
            }
        });

        const progress = (filledFields / requiredFields.length) * 100;
        progressFill.style.width = progress + '%';
    };

    requiredFields.forEach(field => {
        field.addEventListener('input', updateProgress);
    });

    updateProgress(); // Initial call
}

/**
 * Track form submission for analytics
 */
function trackFormSubmission(formData) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: formData['project-type'] || 'General',
            value: 1
        });
    }

    // Custom analytics
    console.log('Contact form submitted:', {
        projectType: formData['project-type'],
        budget: formData.budget,
        timeline: formData.timeline
    });
}

/**
 * Keyboard navigation enhancements
 */
document.addEventListener('keydown', (e) => {
    // Submit form with Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('contact-form');
        if (form && document.activeElement && form.contains(document.activeElement)) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Export functions for external use
window.ContactForm = {
    validateForm,
    showFormSuccess,
    showFormError
};