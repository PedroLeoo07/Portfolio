/* =====================================
   🚀 PORTFOLIO MODERNO - JAVASCRIPT
   ===================================== */

// === CONFIGURAÇÃO INICIAL ===
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupScrollReveal();
  setupNavigation();
  setupThemeToggle();
  setupMobileMenu();
  setupSkillsAnimation();
  setupStatsCounter();
  setupFloatingElements();
  setupProgressBars();
  setupSmoothScrolling();
  setupActiveNavigation();
}

// === SCROLL REVEAL ANIMATIONS ===
function setupScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger counter animation for stats
        if (entry.target.querySelector('.counter')) {
          animateCounters(entry.target);
        }
        
        // Trigger skill progress bars
        if (entry.target.classList.contains('skills-grid')) {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// === NAVEGAÇÃO MODERNA ===
function setupNavigation() {
  const header = document.getElementById('header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header backdrop blur
    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Auto-hide header on scroll down
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
}

// === TOGGLE TEMA ===
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  applyTheme(savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update CSS custom properties for theme
  const root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--color-bg', '#0a0a0a');
    root.style.setProperty('--color-bg-secondary', '#1a1a1a');
    root.style.setProperty('--color-text-primary', '#ffffff');
    root.style.setProperty('--color-text-secondary', '#b3b3b3');
    root.style.setProperty('--color-border-light', '#333333');
  } else {
    root.style.setProperty('--color-bg', '#ffffff');
    root.style.setProperty('--color-bg-secondary', '#f8fafc');
    root.style.setProperty('--color-text-primary', '#1a202c');
    root.style.setProperty('--color-text-secondary', '#718096');
    root.style.setProperty('--color-border-light', '#e2e8f0');
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('#theme-toggle i');
  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
  }
}

// === MENU MOBILE ===
function setupMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navbar = document.getElementById('navbar');
  
  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      navbar?.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// === CONTADOR DE ESTATÍSTICAS ===
function setupStatsCounter() {
  function animateCounters(container) {
    const counters = container.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }

  window.animateCounters = animateCounters;
}

// === ELEMENTOS FLUTUANTES ===
function setupFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((element, index) => {
    const speed = parseFloat(element.dataset.speed) || 0.02;
    let position = 0;
    
    function animate() {
      position += speed;
      const y = Math.sin(position) * 10;
      element.style.transform = `translateY(${y}px)`;
      requestAnimationFrame(animate);
    }
    
    setTimeout(() => animate(), index * 200);
  });
}

// === SCROLL SUAVE ===
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// === NAVEGAÇÃO ATIVA ===
function setupActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
}

console.log('🚀 Portfolio moderno carregado com sucesso!');