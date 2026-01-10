// Mobile menu toggle functionality
let mobileToggle = document.querySelector('#mobile-toggle');
let navbar = document.querySelector('.navbar');

// Função para toggle do menu mobile
function toggleMobileMenu() {
    if (mobileToggle && navbar) {
        const isOpen = navbar.classList.contains('active');
        
        navbar.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        mobileToggle.setAttribute('aria-expanded', !isOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isOpen ? 'hidden' : '';
        
        // Focus management
        if (!isOpen) {
            // Menu is opening - focus first nav item
            const firstNavItem = navbar.querySelector('.nav-link');
            if (firstNavItem) {
                setTimeout(() => firstNavItem.focus(), 100);
            }
        }
    }
}

// Event listener for mobile toggle
if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking nav links (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbar && mobileToggle && 
        !navbar.contains(e.target) && 
        !mobileToggle.contains(e.target) && 
        navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Handle escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        mobileToggle.focus();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Link do currículo online na Vercel
document.addEventListener('DOMContentLoaded', function() {
    const curriculoBtn = document.getElementById('curriculo-btn');
    if (curriculoBtn) {
        curriculoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Abre o currículo online na Vercel
            window.open('https://curriculo-online-three.vercel.app/', '_blank');
        });
    }
});

// Handle touch gestures for mobile navigation
let touchStartX = 0;
let touchEndX = 0;

if (navbar) {
    navbar.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
}

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
        // Navegação
        'nav-home': 'Home',
        'nav-about': 'Sobre',
        'nav-education': 'Educação',
        'nav-certifications': 'Certificações',
        'nav-skills': 'Habilidades',
        'nav-projects': 'Projetos',
        'nav-contact': 'Contato',
        
        // Home
        role: 'Desenvolvedor Full-Stack',
        intro: 'Profissional com experiência em desenvolvimento web completo, atuando tanto no front-end quanto no back-end. Utilizo tecnologias modernas como JavaScript, Node.js, React, Next.js e PostgreSQL para criar aplicações eficientes, seguras e escaláveis. Comprometido com boas práticas de código, performance e qualidade, estou sempre em busca de evolução técnica e novos desafios na área de tecnologia.',
        cv: 'Currículo',
        resume: 'Currículo',
        
        // Seções principais
        'about-heading': 'Sobre <span class="gradient-text">Mim</span>',
        'education-heading': 'Minha <span>Jornada</span>',
        'skills-heading': 'Minhas <span class="gradient-text">Habilidades</span>',
        'certifications-heading': 'Minhas <span>Certificações</span>',
        'projects-heading': 'Projetos <span class="gradient-text">Recentes</span>',
        'contact-heading': 'Entre em <span class="gradient-text">Contato!</span>',
        
        // About
        about: 'Sou um desenvolvedor full stack com foco em criar soluções completas, escaláveis e de alta performance. Atuo no desenvolvimento de aplicações web utilizando tecnologias como JavaScript, Node.js, React, Next.js e bancos de dados relacionais e não relacionais. Tenho paixão por resolver problemas com código limpo, bem estruturado e alinhado às boas práticas. Estou em constante evolução profissional, sempre buscando aprender, melhorar e contribuir com projetos desafiadores.',
        
        // Botões e ações
        'read-more': 'Leia Mais',
        'submit-btn': 'Enviar',
        
        // Estatísticas
        'stat-projects': 'Projetos Concluídos',
        'stat-experience': 'Anos de Experiência',
        'stat-clients': 'Clientes Satisfeitos',
        'stat-technologies': 'Tecnologias',
        
        // Educação
        'education-title': 'Educação',
        'extra-courses-title': 'Cursos Extras',
        'edu-games-title': 'Curso de Designer de Games',
        'edu-games-desc': 'Formação focada na criação de jogos 2D e 3D, com ênfase em programação, modelagem 3D, animações e uso de engines como Unity. Desenvolvi projetos completos, unindo criatividade e técnica para transformar ideias em experiências interativas.',
        'edu-it-title': 'Curso de Informática',
        'edu-it-desc': 'Curso voltado para o uso prático da tecnologia, com foco em informática básica, pacote Office, lógica de programação e fundamentos de design gráfico. Aprimorei habilidades em ferramentas como Excel, Word, PowerPoint, Photoshop e Illustrator, além de noções de edição de vídeo e comandos do Windows.',
        'edu-tech-title': 'Curso Técnico em Análise e Desenvolvimento de Sistemas',
        'edu-tech-desc': 'Formação técnica com foco em análise, desenvolvimento e manutenção de sistemas. Estudei lógica de programação, banco de dados, front-end, back-end e metodologias ágeis. Utilizei linguagens e ferramentas como HTML, CSS, JavaScript, Node.js, SQL e versionamento com Git, desenvolvendo projetos práticos e soluções completas para web e sistemas empresariais.',
        
        // Cursos extras
        'course-js-title': 'Curso de JavaScript',
        'course-js-desc': 'Curso focado no desenvolvimento web com JavaScript, abordando desde os fundamentos da linguagem até conceitos avançados como manipulação do DOM, funções assíncronas, APIs, orientação a objetos e integração com front-end e back-end. Realizei projetos práticos que reforçaram minha lógica de programação e habilidades em aplicações dinâmicas e interativas.',
        'course-fullstack-title': 'Curso de Desenvolvimento Full-Stack',
        'course-fullstack-desc': 'Formação completa voltada para o desenvolvimento de aplicações web, abrangendo front-end e back-end. Estudei tecnologias como HTML, CSS, JavaScript, React, Node.js, Express e bancos de dados como PostgreSQL e MongoDB. Aprendi a criar sistemas completos, responsivos e escaláveis, com foco em boas práticas, performance e integração entre as camadas da aplicação.',
        'course-nodejs-title': 'Curso de Node.js',
        'course-nodejs-desc': 'Curso focado no desenvolvimento de aplicações back-end com Node.js. Aprendi a criar APIs RESTful, trabalhar com Express, manipular dados com bancos de dados como MongoDB e PostgreSQL, e aplicar conceitos como middleware, autenticação, rotas e estruturação de projetos. O curso reforçou minha base em JavaScript no servidor e na construção de sistemas escaláveis e performáticos.',
        
        // Skills
        'frontend-skills': 'Habilidades Frontend',
        'backend-skills': 'Habilidades Backend',
        
        // Certificações
        'cert-js-title': 'Especialista JavaScript',
        'cert-js-desc': 'Certificação cobrindo fundamentos, ES6+, assíncrono, DOM e padrões modernos.',
        'cert-issued': 'Emitido por: Plataforma X',
        'cert-react-title': 'Desenvolvedor React',
        'cert-react-desc': 'Hooks, estado global, otimização, roteamento e integração com APIs.',
        'cert-issued-2': 'Emitido por: Plataforma Y',
        'cert-node-title': 'Profissional Node.js API',
        'cert-node-desc': 'APIs REST, autenticação JWT, banco de dados relacional e testes.',
        'cert-issued-3': 'Emitido por: Plataforma Z',
        
        // Projetos
        'project1-title': 'TurboX',
        'project1-desc': 'Plataforma com simulações e preparações de carros turbo.',
        'project2-title': 'EA FC API',
        'project2-desc': 'API Full-Stack completa do EA FC com gerenciamento de jogadores, times e estatísticas detalhadas.',
        'project3-title': 'FrienZone',
        'project3-desc': 'Rede social Full-Stack com sistema de posts, amizades, chat em tempo real e perfis personalizados.',
        'project4-title': 'Playstation API',
        'project4-desc': 'API da PlayStation com jogos e informações detalhadas. (CRUD)',
        'project5-title': 'FunDev',
        'project5-desc': 'Plataforma com jogos feito em HTML, CSS e JavaScript',
        'project6-title': 'ChatBoxIA',
        'project6-desc': 'Interface de chatbot moderna feita com JavaScript puro, HTML e CSS',
        'project7-title': 'Calculadora Python',
        'project7-desc': 'Calculadora com interface gráfica desenvolvida em Python',
        
        // Portfolio App
        'portfolio-app-heading': 'Portfolio <span class="gradient-text">App</span>',
        'app-experience-title': 'Experiência em App',
        'app-experience-desc': 'Explore o meu aplicativo em um formato otimizado para dispositivos móveis. Esta versão interativa do app exibe todos os meus projetos, habilidades e experiências de forma otimizada para todos os dispositivos.',
        'feature-mobile': 'Otimizado para Mobile',
        'feature-interactive': 'Design Interativo',
        'feature-fast': 'Carregamento Rápido',
        'feature-modern': 'UI/UX Moderno',
        'open-app': 'Abrir App',
        'get-in-touch': 'Entre em Contato'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-education': 'Education',
        'nav-certifications': 'Certifications',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        
        // Home
        role: 'Full-Stack Developer',
        intro: 'Professional with experience in full web development, working on both front-end and back-end. I use modern technologies such as JavaScript, Node.js, React, Next.js and PostgreSQL to build efficient, secure and scalable applications. Committed to best practices, performance and quality, always seeking technical growth and new challenges.',
        cv: 'Resume',
        resume: 'Resume',
        
        // Main sections
        'about-heading': 'About <span class="gradient-text">Me</span>',
        'education-heading': 'My <span>Journey</span>',
        'skills-heading': 'My <span class="gradient-text">Skills</span>',
        'certifications-heading': 'My <span>Certifications</span>',
        'projects-heading': 'Recent <span class="gradient-text">Projects</span>',
        'contact-heading': 'Contact <span class="gradient-text">Me!</span>',
        
        // About
        about: 'I am a full stack developer focused on building complete, scalable and high-performance solutions. I work with technologies like JavaScript, Node.js, React, Next.js and relational and non-relational databases. Passionate about solving problems with clean, well-structured code aligned with best practices. Constantly improving and contributing to challenging projects.',
        
        // Buttons and actions
        'read-more': 'Read More',
        'submit-btn': 'Submit',
        
        // Statistics
        'stat-projects': 'Projects Completed',
        'stat-experience': 'Years Experience',
        'stat-clients': 'Happy Clients',
        'stat-technologies': 'Technologies',
        
        // Education
        'education-title': 'Education',
        'extra-courses-title': 'Extra Courses',
        'edu-games-title': 'Game Design Course',
        'edu-games-desc': 'Training focused on creating 2D and 3D games, with emphasis on programming, 3D modeling, animations and using engines like Unity. I developed complete projects, combining creativity and technique to transform ideas into interactive experiences.',
        'edu-it-title': 'Information Technology Course',
        'edu-it-desc': 'Course focused on practical use of technology, with focus on basic computing, Office suite, programming logic and graphic design fundamentals. I improved skills in tools like Excel, Word, PowerPoint, Photoshop and Illustrator, plus video editing basics and Windows commands.',
        'edu-tech-title': 'Technical Course in Systems Analysis and Development',
        'edu-tech-desc': 'Technical training focused on analysis, development and maintenance of systems. I studied programming logic, databases, front-end, back-end and agile methodologies. Used languages and tools like HTML, CSS, JavaScript, Node.js, SQL and version control with Git, developing practical projects and complete solutions for web and enterprise systems.',
        
        // Extra courses
        'course-js-title': 'JavaScript Course',
        'course-js-desc': 'Course focused on web development with JavaScript, covering from language fundamentals to advanced concepts like DOM manipulation, asynchronous functions, APIs, object-oriented programming and front-end/back-end integration. I completed practical projects that reinforced my programming logic and skills in dynamic and interactive applications.',
        'course-fullstack-title': 'Full-Stack Development Course',
        'course-fullstack-desc': 'Complete training focused on web application development, covering front-end and back-end. I studied technologies like HTML, CSS, JavaScript, React, Node.js, Express and databases like PostgreSQL and MongoDB. I learned to create complete, responsive and scalable systems, with focus on best practices, performance and integration between application layers.',
        'course-nodejs-title': 'Node.js Course',
        'course-nodejs-desc': 'Course focused on back-end application development with Node.js. I learned to create RESTful APIs, work with Express, manipulate data with databases like MongoDB and PostgreSQL, and apply concepts like middleware, authentication, routing and project structuring. The course reinforced my JavaScript foundation on the server and in building scalable and performant systems.',
        
        // Skills
        'frontend-skills': 'Frontend Skills',
        'backend-skills': 'Backend Skills',
        
        // Certifications
        'cert-js-title': 'JavaScript Specialist',
        'cert-js-desc': 'Certification covering fundamentals, ES6+, asynchronous, DOM and modern patterns.',
        'cert-issued': 'Issued by: Platform X',
        'cert-react-title': 'React Developer',
        'cert-react-desc': 'Hooks, global state, optimization, routing and API integration.',
        'cert-issued-2': 'Issued by: Platform Y',
        'cert-node-title': 'Node.js API Professional',
        'cert-node-desc': 'REST APIs, JWT authentication, relational databases and testing.',
        'cert-issued-3': 'Issued by: Platform Z',
        
        // Projects
        'project1-title': 'TurboX',
        'project1-desc': 'Platform with turbo car simulations and preparations.',
        'project2-title': 'EA FC API',
        'project2-desc': 'Complete Full-Stack EA FC API with player management, teams and detailed statistics.',
        'project3-title': 'FrienZone',
        'project3-desc': 'Full-Stack social network with posts system, friendships, real-time chat and custom profiles.',
        'project4-title': 'Playstation API',
        'project4-desc': 'PlayStation API with games and detailed information. (CRUD)',
        'project5-title': 'FunDev',
        'project5-desc': 'Platform with games made in HTML, CSS and JavaScript',
        'project6-title': 'ChatBoxIA',
        'project6-desc': 'Modern chatbot interface made with pure JavaScript, HTML and CSS',
        'project7-title': 'Python Calculator',
        'project7-desc': 'Calculator with graphical interface developed in Python',
        
        // Portfolio App
        'portfolio-app-heading': 'Portfolio <span class="gradient-text">App</span>',
        'app-experience-title': 'App Experience',
        'app-experience-desc': 'Explore my application in a format optimized for mobile devices. This interactive app version displays all my projects, skills and experiences optimized for all devices.',
        'feature-mobile': 'Mobile Optimized',
        'feature-interactive': 'Interactive Design',
        'feature-fast': 'Fast Loading',
        'feature-modern': 'Modern UI/UX',
        'open-app': 'Open App',
        'get-in-touch': 'Get in Touch'
    }
};

const langSelect = document.getElementById('lang-switch');
const langStorageKey = 'portfolio-lang';

function applyLanguage(lang){
    const dict = translations[lang] || translations.pt;
    
    // Aplica traduções para elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(dict[key]) {
            // Se contém HTML tags, usa innerHTML, senão usa textContent
            if(dict[key].includes('<') && dict[key].includes('>')) {
                el.innerHTML = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });
    
    // Atualiza placeholders do formulário
    const placeholders = {
        pt: {
            'input[name="from_name"]': 'Seu Nome',
            'input[name="from_email"]': 'Seu Email',
            'input[name="phone"]': 'Seu Telefone',
            'input[name="subject"]': 'Assunto do Email',
            'textarea[name="message"]': 'Sua Mensagem'
        },
        en: {
            'input[name="from_name"]': 'Your Name',
            'input[name="from_email"]': 'Email Address',
            'input[name="phone"]': 'Mobile Number',
            'input[name="subject"]': 'Email Subject',
            'textarea[name="message"]': 'Your Message'
        }
    };
    
    if(placeholders[lang]) {
        Object.entries(placeholders[lang]).forEach(([selector, placeholder]) => {
            const element = document.querySelector(selector);
            if(element) element.placeholder = placeholder;
        });
    }
    

    
    // Atualiza footer
    const footerText = document.querySelector('.footer-text p');
    if(footerText) {
        footerText.innerHTML = lang === 'pt' ? 
            'Copyright &copy; 2025 por Leonardo Oliveira | Todos os Direitos Reservados' :
            'Copyright &copy; 2025 by Leonardo Oliveira | All Rights Reserved';
    }
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
            
            // Ativar animações das barras de habilidades quando a seção skills aparecer
            if(id === 'skills') {
                sec.classList.add('active');
            }
        } else {
            sec.classList.remove('show-animate');
            
            // Remover animações quando sair da seção
            if(id === 'skills') {
                sec.classList.remove('active');
            }
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

// Animação de texto alternado com efeito de digitação
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    const texts = ['Desenvolvedor Full-Stack', 'Desenvolvedor Mobile'];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeText() {
        const currentText = texts[currentTextIndex];
        
        if (isWaiting) {
            setTimeout(typeText, 2000); // Pausa para ler o texto completo (mais longa)
            isWaiting = false;
            isDeleting = true;
            return;
        }
        
        if (!isDeleting) {
            // Digitando
            typingText.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                isWaiting = true;
            }
            
            setTimeout(typeText, 150); // Velocidade de digitação mais devagar
        } else {
            // Apagando
            typingText.textContent = currentText.substring(0, currentCharIndex);
            currentCharIndex--;
            
            if (currentCharIndex < 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                currentCharIndex = 0;
                setTimeout(typeText, 500); // Pausa antes de começar o próximo texto (mais longa)
            } else {
                setTimeout(typeText, 80); // Velocidade de apagar (um pouco mais devagar)
            }
        }
    }
    
    // Inicia a animação
    typeText();
});