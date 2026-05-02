document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ All Features + Perfect Navbar Loaded! 🚀');

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('preloader-active');
        }, 2500);
    }

    const menuToggle = document.querySelector('.menu-toggle') || document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    setActiveNavLink();

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const target = document.querySelector('#' + targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    function initStatsCounter() {
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('[data-target]');
                    counters.forEach(counter => {
                        const target = +counter.dataset.target;
                        let current = 0;
                        const increment = target / 50;
                        
                        const updateCounter = () => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = target;
                            } else {
                                counter.textContent = Math.floor(current);
                                requestAnimationFrame(updateCounter);
                            }
                        };
                        updateCounter();
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsGrid);
    }
    initStatsCounter();

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.stat-item, .link-card, .hero-content *, .floating-card').forEach(el => {
        scrollObserver.observe(el);
    });

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 20;
        mouseY = (e.clientY / window.innerHeight) * 20;
        
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            const speed = (index + 1) * 0.4;
            card.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });

    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    function handleResize() {
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    }
    window.addEventListener('resize', handleResize);
    
    console.log('✅ COMPLETE SYSTEM READY - Navbar Perfect on ALL Pages! 💯');
});

function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPageName = getPageName(currentPath);
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        const linkPageName = getPageName(href);
        

        if (linkPageName === currentPageName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function getPageName(path) {
    const pageMap = {
        'index.html': 'index', 'index': 'index',
        'about.html': 'about', 'about': 'about',
        'features.html': 'features', 'features': 'features',
        'facility.html': 'facility', 'facility': 'facility',
        'learning.html': 'learning', 'learning': 'learning',
        'contact.html': 'contact', 'contact': 'contact'
    };
    return pageMap[path.replace('.html', '')] || path.replace('.html', '');
}