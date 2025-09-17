// Animação de contador para as porcentagens das habilidades
function animateSkillCounters() {
    const skillsSection = document.querySelector('#skills');
    
    // Observer para detectar quando a seção entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                startCounterAnimations();
            }
        });
    }, {
        threshold: 0.3, // Ativa quando 30% da seção está visível
        rootMargin: '0px 0px -50px 0px'
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function startCounterAnimations() {
    // Mapeamento das habilidades e suas porcentagens
    const skillPercentages = {
        'React': 95,
        'Next.js': 90,
        'TypeScript': 85,
        'JavaScript': 88,
        'Node.js': 92,
        'PostgreSQL': 80,
        'Express': 94,
        'NPM': 100,
        'React Native': 90,
        'Expo': 88,
        'Native APIs': 78,
        'App Store Deploy': 85
    };

    // Animar cada contador
    document.querySelectorAll('.progress h3 span').forEach(span => {
        const skillName = span.parentElement.textContent.replace(/\s*\d+%$/, '').trim();
        const targetPercent = skillPercentages[skillName];
        
        if (targetPercent) {
            animateCounter(span, targetPercent);
        }
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100; // Dividir por 100 frames
    const duration = 2000; // 2 segundos
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.round(current) + '%';
    }, stepTime);
}

// Adicionar efeito de pulso nas barras quando completam
function addPulseEffect() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes skillPulse {
            0% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.6); }
            100% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.3); }
        }
        
        .skills.reveal.active .progress .bar span {
            animation-fill-mode: forwards;
        }
        
        .skills.reveal.active .progress .bar span.completed {
            animation: skillPulse 1s ease-in-out;
            animation-delay: 2.5s;
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar classe 'completed' após a animação
    setTimeout(() => {
        document.querySelectorAll('.skills.active .progress .bar span').forEach(bar => {
            bar.classList.add('completed');
        });
    }, 2500);
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    animateSkillCounters();
    addPulseEffect();
    
    // Adicionar efeito hover personalizado
    document.querySelectorAll('.progress').forEach(progress => {
        progress.addEventListener('mouseenter', function() {
            const bar = this.querySelector('.bar span');
            if (bar) {
                bar.style.transform = 'scaleY(1.1)';
                bar.style.transition = 'transform 0.3s ease';
            }
        });
        
        progress.addEventListener('mouseleave', function() {
            const bar = this.querySelector('.bar span');
            if (bar) {
                bar.style.transform = 'scaleY(1)';
            }
        });
    });
});