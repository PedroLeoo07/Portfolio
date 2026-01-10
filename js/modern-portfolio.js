/* =====================================
   🚀 MODERN PORTFOLIO JAVASCRIPT
   ===================================== */

class ModernPortfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.animateOnScroll();
    this.initSkillsFilter();
    this.initCounters();
    this.initHeaderScroll();
    this.initMobileMenu();
    this.initSmoothScroll();
    this.initSkillProgressBars();
    this.initParallaxEffects();
  }

  setupEventListeners() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('load', this.handleLoad.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleScroll() {
    this.updateActiveNavLinks();
    this.animateOnScroll();
    this.updateHeaderBackground();
  }

  handleLoad() {
    this.revealElements();
    this.startCounters();
    this.animateSkillBars();
  }

  handleResize() {
    this.closeMobileMenu();
  }

  // === HEADER FUNCTIONALITY === //
  initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  updateHeaderBackground() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  }

  // === MOBILE MENU === //
  initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navbar) return;

    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navbar.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
  }

  closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');

    if (mobileToggle && navbar) {
      mobileToggle.classList.remove('active');
      navbar.classList.remove('active');
    }
  }

  // === SMOOTH SCROLL === //
  initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // === ACTIVE NAV LINKS === //
  updateActiveNavLinks() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && 
          window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // === REVEAL ANIMATIONS === //
  animateOnScroll() {
    const reveals = document.querySelectorAll('.reveal:not(.active)');
    
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 50) {
        element.classList.add('active');
      }
    });
  }

  revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach((element, index) => {
      setTimeout(() => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
          element.classList.add('active');
        }
      }, index * 100);
    });
  }

  // === SKILLS FILTER === //
  initSkillsFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (categoryBtns.length === 0) return;

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter cards
        skillCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            card.style.display = 'block';
          } else {
            card.classList.add('hidden');
            setTimeout(() => {
              if (card.classList.contains('hidden')) {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  }

  // === SKILL PROGRESS BARS === //
  initSkillProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const animateBar = (bar) => {
      const level = bar.getAttribute('data-level');
      if (level) {
        bar.style.setProperty('--target-width', level + '%');
        setTimeout(() => {
          bar.style.width = level + '%';
        }, 100);
      }
    };

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress');
          if (progressBar) {
            animateBar(progressBar);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.skill-card').forEach(card => {
      observer.observe(card);
    });
  }

  animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
      setTimeout(() => {
        const progressBar = card.querySelector('.skill-progress');
        if (progressBar) {
          const level = progressBar.getAttribute('data-level');
          if (level) {
            progressBar.style.width = level + '%';
          }
        }
      }, index * 200);
    });
  }

  // === COUNTERS === //
  initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target + '+';
        } else {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    };

    const observerOptions = {
      threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  startCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = target / 100;
      
      const updateCounter = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + '+';
        } else {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        }
      };
      
      setTimeout(updateCounter, Math.random() * 1000);
    });
  }

  // === PARALLAX EFFECTS === //
  initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element, index) => {
        const rate = scrolled * (0.5 + index * 0.1);
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  // === THEME TOGGLE === //
  initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle?.querySelector('i');

    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.classList.add(savedTheme);
      this.updateThemeIcon(icon, savedTheme);
    }

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      const isDark = body.classList.contains('dark-theme');
      
      localStorage.setItem('theme', isDark ? 'dark-theme' : '');
      this.updateThemeIcon(icon, isDark ? 'dark-theme' : '');
    });
  }

  updateThemeIcon(icon, theme) {
    if (!icon) return;
    
    if (theme === 'dark-theme') {
      icon.className = 'bx bx-sun';
    } else {
      icon.className = 'bx bx-moon';
    }
  }

  // === FLOATING ANIMATIONS === //
  initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.02;
      let position = 0;
      
      const animate = () => {
        position += speed;
        element.style.transform = `translateY(${Math.sin(position) * 10}px)`;
        requestAnimationFrame(animate);
      };
      
      setTimeout(() => animate(), index * 500);
    });
  }

  // === PERFORMANCE OPTIMIZATIONS === //
  optimizePerformance() {
    // Debounce scroll events
    let ticking = false;
    
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.removeEventListener('scroll', this.handleScroll);
    window.addEventListener('scroll', optimizedScroll, { passive: true });
  }

  // === ACCESSIBILITY === //
  initAccessibility() {
    // Add keyboard navigation
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            element.click();
          }
        }
      });
    });

    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-link';
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--color-primary);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertAdjacentElement('afterbegin', skipLink);
  }
}

// === INITIALIZATION === //
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = new ModernPortfolio();
  
  // Initialize additional features
  portfolio.optimizePerformance();
  portfolio.initThemeToggle();
  portfolio.initFloatingAnimations();
  portfolio.initAccessibility();
});

// === PERFORMANCE MONITORING === //
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
  document.head.appendChild(script);
}

// === ERROR HANDLING === //
window.addEventListener('error', (e) => {
  console.warn('Portfolio Error:', e.error);
});

// === SERVICE WORKER (Optional) === //
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(() => {
        // Silent fail - service worker is optional
      });
  });
}