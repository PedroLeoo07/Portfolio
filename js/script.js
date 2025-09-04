let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    const isOpen = menuIcon.classList.contains('bx-x');
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    
    // Update ARIA attributes for accessibility
    menuIcon.setAttribute('aria-expanded', !isOpen);
    
    // Focus management
    if (!isOpen) {
        // Menu is opening - focus first nav item
        const firstNavItem = navbar.querySelector('a');
        if (firstNavItem) {
            setTimeout(() => firstNavItem.focus(), 100);
        }
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    }
});

// Handle touch gestures for mobile navigation
let touchStartX = 0;
let touchEndX = 0;

navbar.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

navbar.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - close menu
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    }
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Traduções
const translations = {
    pt: {
        role: 'Desenvolvedor Full-Stack',
        intro: 'Profissional com experiência em desenvolvimento web completo, atuando tanto no front-end quanto no back-end. Utilizo tecnologias modernas como JavaScript, Node.js, React, Next.js e PostgreSQL para criar aplicações eficientes, seguras e escaláveis. Comprometido com boas práticas de código, performance e qualidade, estou sempre em busca de evolução técnica e novos desafios na área de tecnologia.',
        cv: 'Currículo',
        resume: 'Resume',
        about: 'Sou um desenvolvedor full stack com foco em criar soluções completas, escaláveis e de alta performance. Atuo no desenvolvimento de aplicações web utilizando tecnologias como JavaScript, Node.js, React, Next.js e bancos de dados relacionais e não relacionais. Tenho paixão por resolver problemas com código limpo, bem estruturado e alinhado às boas práticas. Estou em constante evolução profissional, sempre buscando aprender, melhorar e contribuir com projetos desafiadores.'
    },
    en: {
        role: 'Full-Stack Developer',
        intro: 'Professional with experience in full web development, working on both front-end and back-end. I use modern technologies such as JavaScript, Node.js, React, Next.js and PostgreSQL to build efficient, secure and scalable applications. Committed to best practices, performance and quality, always seeking technical growth and new challenges.',
        cv: 'CV',
        resume: 'Resume',
        about: 'I am a full stack developer focused on building complete, scalable and high-performance solutions. I work with technologies like JavaScript, Node.js, React, Next.js and relational and non-relational databases. Passionate about solving problems with clean, well-structured code aligned with best practices. Constantly improving and contributing to challenging projects.'
    }
};

const langSelect = document.getElementById('lang-switch');
const langStorageKey = 'portfolio-lang';

function applyLanguage(lang){
    const dict = translations[lang] || translations.pt;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(dict[key]) el.textContent = dict[key];
    });
    // Atualiza nav itens básicos (fixo, poderia ter data-i18n também)
    const navMap = {
        pt: ['Home','About','Education','Certifications','Skills','Projects','Contact'],
        en: ['Home','About','Education','Certifications','Skills','Projects','Contact']
    };
    const navItems = document.querySelectorAll('header nav a');
    navItems.forEach((a,i)=>{ if(navMap[lang] && navMap[lang][i]) a.textContent = navMap[lang][i]; });
}

// Carrega idioma salvo
const savedLang = localStorage.getItem(langStorageKey) || 'pt';
if(langSelect){
    langSelect.value = savedLang;
    applyLanguage(savedLang);
    langSelect.addEventListener('change', ()=>{
        const chosen = langSelect.value;
        localStorage.setItem(langStorageKey, chosen);
        applyLanguage(chosen);
    });
}

// Tema claro/escuro
const themeToggleBtn = document.getElementById('theme-toggle');
const userPrefKey = 'portfolio-theme';

function applyTheme(theme) {
    if(theme === 'light') {
        document.body.classList.add('light');
    } else {
        document.body.classList.remove('light');
    }
}

// Detecta preferência salva ou sistema
const savedTheme = localStorage.getItem(userPrefKey);
if(savedTheme) {
    applyTheme(savedTheme);
} else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
}

if(themeToggleBtn){
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem(userPrefKey, newTheme);
    });
}

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if(activeLink) activeLink.classList.add('active');
            });

            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });
    
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu when clicking a link
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    });
});

// Handle window resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    }
});

// Prevent horizontal scroll issues
document.addEventListener('DOMContentLoaded', function() {
    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewport);
    }
    
    // Optimize images for mobile devices
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add focus trap for mobile menu
    const focusableElements = navbar.querySelectorAll('a');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    navbar.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
        
        if (e.key === 'Escape') {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            menuIcon.setAttribute('aria-expanded', 'false');
            menuIcon.focus();
        }
    });
    
    // Improve scroll performance on mobile
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Existing scroll logic
                sections.forEach(sec => {
                    let top = window.scrollY;
                    let offset = sec.offsetTop - 100;
                    let height = sec.offsetHeight;
                    let id = sec.getAttribute('id');

                    if(top >= offset && top < offset + height) {
                        navLinks.forEach(links => {
                            links.classList.remove('active');
                            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                            if(activeLink) activeLink.classList.add('active');
                        });

                        sec.classList.add('show-animate');
                    } else {
                        sec.classList.remove('show-animate');
                    }
                });
                
                let header = document.querySelector('header');
                header.classList.toggle('sticky', window.scrollY > 100);

                // Close mobile menu on scroll
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
                menuIcon.setAttribute('aria-expanded', 'false');
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Use optimized scroll handler
    window.removeEventListener('scroll', window.onscroll);
    window.addEventListener('scroll', updateOnScroll, { passive: true });
});