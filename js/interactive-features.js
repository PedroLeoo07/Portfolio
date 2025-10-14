// Funcionalidades Interativas Avançadas

// Criação de partículas de fundo
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Efeito de digitação
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('typing-text');
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            element.classList.remove('typing-text');
        }
    }
    typing();
}

// Animação de barras de habilidades
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillPercentages = [95, 90, 85, 88, 92, 80]; // Porcentagens das habilidades
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = skillPercentages[index] + '%';
        }, index * 200);
    });
}

// Efeito de reveal on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Cursor personalizado
function createCustomCursor() {
    if (window.innerWidth <= 768) return; // Não mostrar em dispositivos móveis
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Efeitos especiais ao hover
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-box');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.opacity = '0.3';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '0.6';
        });
    });
}

// Carregamento animado
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Botão flutuante de contato
function createFloatingContact() {
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'floating-contact';
    floatingBtn.innerHTML = '<i class="bx bx-message-dots"></i>';
    floatingBtn.onclick = () => {
        document.getElementById('contact').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };
    document.body.appendChild(floatingBtn);
}

// Parallax effect simples
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Animação de contador
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar animação quando elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Efeito ripple nos botões
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Smooth scroll para todos os links internos
function smoothScrollLinks() {
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
        });
    });
}

// Modal para projetos
function createProjectModal() {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <h3 id="modal-title"></h3>
                <img id="modal-image" alt="Project preview">
                <p id="modal-description"></p>
                
                <div class="modal-section">
                    <h4 class="section-title"><i class='bx bx-code-block'></i> Tecnologias Utilizadas</h4>
                    <div id="modal-technologies"></div>
                </div>
                
                <div class="modal-section" id="modal-features-section">
                    <h4 class="section-title"><i class='bx bx-star'></i> Principais Funcionalidades</h4>
                    <ul id="modal-features"></ul>
                </div>
                
                <div class="modal-section" id="modal-highlights-section">
                    <h4 class="section-title"><i class='bx bx-trophy'></i> Destaques do Projeto</h4>
                    <div id="modal-highlights"></div>
                </div>
                
                <div class="modal-section">
                    <h4 class="section-title"><i class='bx bx-link-alt'></i> Links do Projeto</h4>
                    <div id="modal-links"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Fechar modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => modal.classList.remove('active');
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };
    
    // ESC para fechar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    return modal;
}

// Dados detalhados dos projetos
const projectsData = {
    'TurboX': {
        features: [
            'Sistema completo de simulação de preparação de carros turbo',
            'Gerenciamento de peças e upgrades com cálculo de performance',
            'Interface responsiva e moderna com Next.js',
            'Integração com banco de dados para persistência de dados',
            'Sistema de autenticação e perfis de usuário'
        ],
        highlights: [
            { icon: 'bx-rocket', text: 'Performance otimizada com Next.js 14' },
            { icon: 'bx-palette', text: 'Design moderno e responsivo' },
            { icon: 'bx-data', text: 'Integração completa com backend Node.js' }
        ],
        github: 'https://github.com/PedroLeoo07/TurboX-FrontEnd'
    },
    'Playstation API': {
        features: [
            'API RESTful completa com operações CRUD',
            'Catálogo de jogos PlayStation com informações detalhadas',
            'Sistema de busca e filtros avançados',
            'Documentação completa da API',
            'Validação de dados e tratamento de erros'
        ],
        highlights: [
            { icon: 'bx-server', text: 'API REST escalável e eficiente' },
            { icon: 'bx-shield', text: 'Validação e segurança de dados' },
            { icon: 'bx-book', text: 'Documentação completa' }
        ],
        github: 'https://github.com/PedroLeoo07/API-Playstation'
    },
    'FunDev': {
        features: [
            'Plataforma com múltiplos jogos interativos',
            'Jogos desenvolvidos puramente com JavaScript vanilla',
            'Sistema de pontuação e ranking',
            'Interface intuitiva e animações suaves',
            'Compatível com diferentes dispositivos'
        ],
        highlights: [
            { icon: 'bx-game', text: 'Múltiplos jogos em uma plataforma' },
            { icon: 'bx-code-alt', text: 'JavaScript vanilla puro' },
            { icon: 'bx-mobile', text: 'Totalmente responsivo' }
        ],
        github: 'https://github.com/PedroLeoo07/FunDev'
    }
};

// Adicionar funcionalidade de modal aos projetos
function setupProjectModals() {
    const modal = createProjectModal();
    const projectBoxes = document.querySelectorAll('.project-box');
    
    projectBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            const title = box.querySelector('h3').textContent;
            const description = box.querySelector('p').textContent;
            const image = box.querySelector('img').src;
            const tags = Array.from(box.querySelectorAll('.project-tags span')).map(tag => tag.textContent);
            const links = box.querySelectorAll('.project-links a');
            
            // Preencher informações básicas
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = description;
            document.getElementById('modal-image').src = image;
            
            // Preencher tecnologias
            const techContainer = document.getElementById('modal-technologies');
            techContainer.innerHTML = tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
            
            // Preencher funcionalidades se existir dados
            const projectData = projectsData[title];
            if (projectData) {
                const featuresContainer = document.getElementById('modal-features');
                featuresContainer.innerHTML = projectData.features
                    .map(feature => `<li><i class='bx bx-check-circle'></i> ${feature}</li>`)
                    .join('');
                
                const highlightsContainer = document.getElementById('modal-highlights');
                highlightsContainer.innerHTML = projectData.highlights
                    .map(highlight => `
                        <div class="highlight-item">
                            <i class='bx ${highlight.icon}'></i>
                            <span>${highlight.text}</span>
                        </div>
                    `).join('');
            } else {
                document.getElementById('modal-features-section').style.display = 'none';
                document.getElementById('modal-highlights-section').style.display = 'none';
            }
            
            // Preencher links
            const linksContainer = document.getElementById('modal-links');
            linksContainer.innerHTML = '';
            links.forEach(link => {
                const clone = link.cloneNode(true);
                linksContainer.appendChild(clone);
            });
            
            modal.classList.add('active');
        });
    });
}

// Tilt effect para cartões de projeto
function addTiltEffect() {
    const cards = document.querySelectorAll('.project-box');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Inicialização de todas as funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar loading
    showLoadingAnimation();
    
    // Criar partículas (apenas em desktop)
    if (window.innerWidth > 768) {
        createParticles();
        createCustomCursor();
    }
    
    // Efeitos gerais
    createFloatingContact();
    addRippleEffect();
    smoothScrollLinks();
    addTiltEffect();
    setupProjectModals();
    parallaxEffect();
    animateCounters();
    
    // Efeito de digitação no título principal
    setTimeout(() => {
        const mainTitle = document.querySelector('.home-content h1 span');
        if (mainTitle) {
            const originalText = mainTitle.textContent;
            typeWriter(mainTitle, originalText, 150);
        }
    }, 1500);
    
    // Animação de reveal on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Animar barras de habilidade quando a seção for visível
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(skillsSection);
                }
            });
        });
        observer.observe(skillsSection);
    }
});

// Redimensionamento responsivo
window.addEventListener('resize', () => {
    // Remover partículas em mobile
    if (window.innerWidth <= 768) {
        const particles = document.querySelector('.particles-container');
        const cursor = document.querySelector('.cursor-trail');
        if (particles) particles.remove();
        if (cursor) cursor.remove();
    } else if (!document.querySelector('.particles-container')) {
        createParticles();
        createCustomCursor();
    }
});
