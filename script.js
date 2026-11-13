// ==========================================================================
// MOHAMMED MUNAVER V P - HIGH-PERFORMANCE SCRIPTS (60-120 FPS OPTIMIZED)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. High Performance Passive Scroll Listener ---
    const progressBar = document.getElementById('scrollProgressBar');
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    let isScrollScheduled = false;

    function handleScrollUpdate() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }

        // Navbar appearance
        if (navbar) {
            if (scrollTop > 40) {
                navbar.style.background = 'rgba(11, 17, 32, 0.95)';
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.35)';
            } else {
                navbar.style.background = 'rgba(11, 17, 32, 0.82)';
                navbar.style.boxShadow = 'none';
            }
        }

        // Back to top button
        if (backToTopBtn) {
            if (scrollTop > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        isScrollScheduled = false;
    }

    window.addEventListener('scroll', () => {
        if (!isScrollScheduled) {
            window.requestAnimationFrame(handleScrollUpdate);
            isScrollScheduled = true;
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 2. Mobile Hamburger Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // --- 3. Zero-Reflow Active Nav Link with IntersectionObserver ---
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(section => navObserver.observe(section));

    // --- 4. Dynamic Role Typing Animation ---
    const typedTextElement = document.getElementById('typedText');
    const phrases = [
        "Cross-Platform Mobile Apps.",
        "Flutter & Dart Experiences.",
        "Django RESTful Backends.",
        "Clean & Scalable Architecture."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
        if (!typedTextElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // --- 5. Interactive Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // --- 6. Scroll Entrance Animation (IntersectionObserver) ---
    const entranceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left');
    animatedElements.forEach(el => entranceObserver.observe(el));

    // --- 7. Toast Notification Utility ---
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // --- 8. Copy to Clipboard for Contact Info ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard && textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied to clipboard: ${textToCopy}`);
                }).catch(() => {
                    showToast(`Copied: ${textToCopy}`);
                });
            } else if (textToCopy) {
                const tempInput = document.createElement('input');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`Copied: ${textToCopy}`);
            }
        });
    });

    // --- 9. Direct Contact Form Submission Handler ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('senderName').value;
            const email = document.getElementById('senderEmail').value;
            const subject = document.getElementById('messageSubject').value;
            const body = document.getElementById('messageBody').value;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending Message...</span>';
            }

            setTimeout(() => {
                showToast(`Thank you, ${name}! Your message has been prepared.`);
                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span><i class="fas fa-check"></i> Message Sent!</span>';
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span><i class="fas fa-paper-plane"></i> Send Message</span>';
                    }, 3500);
                }

                window.location.href = `mailto:munavervpofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + body)}`;
            }, 600);
        });
    }

    // --- 10. Certificate Lightbox Modal Logic ---
    const openCertModal = document.getElementById('openCertModal');
    const viewCertBtn = document.getElementById('viewCertBtn');
    const certModal = document.getElementById('certModal');
    const certModalClose = document.querySelector('.cert-modal-close');
    const certModalBackdrop = document.querySelector('.cert-modal-backdrop');

    function showCertModal() {
        if (certModal) {
            certModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function hideCertModal() {
        if (certModal) {
            certModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (openCertModal) openCertModal.addEventListener('click', showCertModal);
    if (viewCertBtn) viewCertBtn.addEventListener('click', showCertModal);
    if (certModalClose) certModalClose.addEventListener('click', hideCertModal);
    if (certModalBackdrop) certModalBackdrop.addEventListener('click', hideCertModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
            hideCertModal();
        }
    });

    // --- 11. Hardware-Accelerated Custom Cursor (Zero Idle Overhead) ---
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        let mouseX = -100, mouseY = -100;
        let followerX = -100, followerY = -100;
        let isMoving = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Direct GPU transform update for instant precision
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

            // Start follower loop only when moving
            if (!isMoving) {
                isMoving = true;
                window.requestAnimationFrame(updateFollower);
            }
        }, { passive: true });

        function updateFollower() {
            followerX += (mouseX - followerX) * 0.22;
            followerY += (mouseY - followerY) * 0.22;

            cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

            // Automatically pause animation loop when follower catches up (zero idle CPU waste!)
            if (Math.abs(mouseX - followerX) > 0.4 || Math.abs(mouseY - followerY) > 0.4) {
                window.requestAnimationFrame(updateFollower);
            } else {
                isMoving = false;
            }
        }

        const interactiveElements = document.querySelectorAll('a, button, .btn, .hamburger, .social-btn, .cert-img-wrapper, .filter-btn, .copy-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            }, { passive: true });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            }, { passive: true });
        });
    }

});
