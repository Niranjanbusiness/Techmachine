/* ============================================
   TechMachines - JavaScript Interactions
   Menu Toggle, Filters, and Effects
   ============================================ */

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const filterBtns = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('.article-card[data-category]');
const newsletterForm = document.getElementById('newsletterForm');

// ============ MOBILE MENU TOGGLE ============
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ============ ARTICLE FILTER FUNCTIONALITY ============
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter articles
            articleCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ============ NEWSLETTER FORM SUBMISSION ============
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]');
        
        if (email.value) {
            // Show success message
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '✓ Subscribed!';
            button.style.backgroundColor = '#27ae60';
            
            // Clear input
            email.value = '';
            
            // Reset after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 3000);
        }
    });
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============ ACTIVE NAV LINK HIGHLIGHTING ============
function updateActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || (href === 'index.html' && currentPath.endsWith('/'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
updateActiveNav();

// ============ SCROLL ANIMATION FOR ELEMENTS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe article cards
document.querySelectorAll('.article-card, .category-card, .post-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// ============ COPY TO CLIPBOARD FUNCTIONALITY ============
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

// ============ PREVENT FORM SUBMISSION ERRORS ============
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
            }
        });
    });
});

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navLinks) {
        navLinks.classList.remove('active');
    }
});

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============ EXTERNAL LINK HANDLING ============
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ============ LAZY LOADING IMAGE PLACEHOLDERS ============
const imagePlaceholders = document.querySelectorAll('.image-placeholder, .image-placeholder-large');
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease';
            }
        });
    });

    imagePlaceholders.forEach(img => imgObserver.observe(img));
}

// ============ PRINT FRIENDLY STYLES ============
if (window.matchMedia) {
    const printQuery = window.matchMedia('print');
    printQuery.addListener((mq) => {
        if (mq.matches) {
            document.body.style.background = '#fff';
        }
    });
}

// ============ UTILITY FUNCTION: GET PARAMETER FROM URL ============
function getURLParameter(param) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

// ============ TRACK AFFILIATE CLICKS (Optional - for analytics) ============
document.querySelectorAll('.affiliate-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // You can add analytics tracking here
        // Example: analytics.track('affiliate_click', { product: button.textContent })
        const productName = button.closest('.product-section')?.querySelector('h2')?.textContent || 'Unknown';
        console.log('Affiliate button clicked:', productName);
    });
});

// ============ DYNAMIC YEAR IN FOOTER ============
document.querySelectorAll('.footer-bottom').forEach(footer => {
    const textContent = footer.textContent;
    if (textContent.includes('2024')) {
        footer.innerHTML = footer.innerHTML.replace('2024', new Date().getFullYear());
    }
});

// ============ BACK TO TOP BUTTON ============
const backToTopBtn = document.createElement('button');
backToTopBtn.setAttribute('id', 'backToTop');
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopBtn.addEventListener('mouseover', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseout', () => {
    backToTopBtn.style.transform = 'scale(1)';
});

// ============ DEBOUNCE FUNCTION FOR RESIZE ============
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Add any resize handling logic here
}, 250);

window.addEventListener('resize', handleResize);

// ============ CONSOLE LOG - SITE INFO ============
console.log('%cTechMachines - Budget Tech Reviews', 'color: #0d7377; font-size: 20px; font-weight: bold;');
console.log('Your trusted source for tech gadget reviews and recommendations for students.');
console.log('Questions? Visit our About page: /about.html');
