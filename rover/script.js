// ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== ACTIVE NAVIGATION ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== MISSION TABS =====
const missionTabs = document.querySelectorAll('.mission-tab');
const missionContents = document.querySelectorAll('.mission-content');

if(missionTabs.length > 0 && missionContents.length > 0) {
    missionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const missionId = tab.getAttribute('data-mission');
            
            // Remove active class from all tabs and contents
            missionTabs.forEach(t => t.classList.remove('active'));
            missionContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = document.getElementById(missionId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}


// ===== COMPONENT EXPLORER =====
const componentMenuItems = document.querySelectorAll('.component-menu-item');
const componentImages = document.querySelectorAll('.component-image-container');
const componentDetails = document.querySelectorAll('.component-detail-content');

if(componentMenuItems.length > 0) {
    componentMenuItems.forEach(menuItem => {
        menuItem.addEventListener('click', () => {
            const componentId = menuItem.getAttribute('data-component');
            
            // Remove active class from all menu items
            componentMenuItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked menu item
            menuItem.classList.add('active');
            
            // Hide all component images
            componentImages.forEach(img => img.classList.add('hidden'));
            
            // Show selected component image
            const targetImage = document.getElementById(`${componentId}-img`);
            if (targetImage) {
                targetImage.classList.remove('hidden');
            }
            
            // Hide all component details
            componentDetails.forEach(detail => detail.classList.remove('active'));
            
            // Show selected component detail
            const targetDetail = document.getElementById(`${componentId}-detail`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });
}


// ===== COMPONENT EXPLORER MOBILE =====
const componentCards = document.querySelectorAll('.component-card-mobile');

if(componentCards.length > 0) {
    componentCards.forEach(card => {
        const header = card.querySelector('.component-card-mobile-header');
        header.addEventListener('click', () => {
            // Close other cards
            componentCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            // Toggle current card
            card.classList.toggle('active');
        });
    });
}


// ===== GALLERY FILTERS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if(filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter gallery items with animation
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    }, index * 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}


// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subjectSelect = document.getElementById('subject');
        const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
        const message = document.getElementById('message').value;
        
        // Team QBOTIX email address
        const teamEmail = 'qbotix.rover@gmail.com';
        
        // Build the email subject and body
        const emailSubject = `[QBOTIX Website] ${subjectText} - from ${name}`;
        const emailBody = `Hello Team QBOTIX,

Name: ${name}
Email: ${email}
Subject: ${subjectText}

Message:
${message}

---
Sent via QBOTIX Website Contact Form`;
        
        // Create Gmail compose URL and open in new tab
        const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(teamEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(gmailURL, '_blank');
        
        // Create a success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF6B35, #E55A25);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
            z-index: 10000;
            animation: fadeInRight 0.5s ease;
        `;
        successMsg.innerHTML = `
            <strong>Thank you, ${name}!</strong><br>
            Gmail has opened in a new tab. Please send the email to complete your message.
        `;
        document.body.appendChild(successMsg);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMsg.style.animation = 'fadeInRight 0.5s ease reverse';
            setTimeout(() => successMsg.remove(), 500);
        }, 5000);
        
        // Reset form
        contactForm.reset();
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Team QBOTIX ', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cEngineering the Future of Mars Exploration', 'color: #B8B8B8; font-size: 14px;');
console.log('%cWebsite refurbished with modern design ✨', 'color: #FF6B35; font-size: 12px;');

window.addEventListener('load', () => {
    const componentDisplay = document.querySelector('.component-display');
    const componentMenu = document.querySelector('.component-menu');
    const componentMenuItems = document.querySelectorAll('.component-menu-item');

    if (componentDisplay && componentMenu && componentMenuItems.length > 0) {
        const displayHeight = componentDisplay.offsetHeight;
        const menuGap = parseFloat(getComputedStyle(componentMenu).gap);
        const totalGapHeight = (componentMenuItems.length - 1) * menuGap;
        const buttonHeight = (displayHeight - totalGapHeight) / componentMenuItems.length;

        componentMenuItems.forEach(item => {
            item.style.height = `${buttonHeight}px`;
            // also need to remove the padding to make sure the height is correct
            item.style.paddingTop = '0';
            item.style.paddingBottom = '0';
            item.style.display = 'flex';
            item.style.alignItems = 'center';

        });
    }
});

// ===== INNOVATIVE 3D HOLOGRAPHIC EXPANDABLE DOMAIN CARDS =====
document.addEventListener('DOMContentLoaded', () => {
    const domainCards = document.querySelectorAll('.domain-card-expandable');
    
    domainCards.forEach(card => {
        const cardFront = card.querySelector('.domain-card-front');
        
        // Toggle expansion on card click
        if (cardFront) {
            cardFront.addEventListener('click', (e) => {
                e.stopPropagation();
                
                const isActive = card.classList.contains('active');
                
                // Close all cards first
                domainCards.forEach(c => {
                    c.classList.remove('active');
                });
                
                // If this card wasn't active, open it
                if (!isActive) {
                    card.classList.add('active');
                    
                    // Smooth scroll to the expanded card with offset
                    setTimeout(() => {
                        const offset = 100; // Offset from top
                        const cardTop = card.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({
                            top: cardTop,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            });
        }
    });
    
    // Close expanded card when clicking outside
    document.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.domain-card-expandable');
        if (!clickedCard) {
            domainCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
    
    // Close expanded card on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            domainCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
    
    // Prevent clicks on member items from closing the panel
    domainCards.forEach(card => {
        const memberItems = card.querySelectorAll('.member-item');
        memberItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    });
});

// ===== VIDEO HOVER PLAY/PAUSE =====
document.addEventListener('DOMContentLoaded', () => {
    const sceneVideos = document.querySelectorAll('.scene-video');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    sceneVideos.forEach(video => {
        const card = video.closest('.scene-card');
        
        if (card) {
            // Desktop: hover to play
            card.addEventListener('mouseenter', () => {
                video.play().catch(err => {
                    console.log('Video play failed:', err);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reset to beginning
            });
            
            // Mobile: tap to play/pause toggle
            if (isMobile) {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (video.paused) {
                        // Pause all other videos first
                        sceneVideos.forEach(v => {
                            if (v !== video) {
                                v.pause();
                                v.currentTime = 0;
                            }
                        });
                        video.play().catch(err => {
                            console.log('Video play failed:', err);
                        });
                    } else {
                        video.pause();
                    }
                });
            }
        }
        
        // Try to autoplay on mobile when video is in viewport
        if (isMobile) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(err => {
                            // Autoplay blocked, video will show poster image
                            console.log('Autoplay blocked, showing poster:', err);
                        });
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(video);
        }
    });
});
