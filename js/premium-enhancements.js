/**
 * Premium Portfolio Enhancements
 * Interações e refinamentos para um visual mais profissional e premium
 */

// ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar cards e sections
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card, [style*="background: var(--bg-secondary"]');
  const sections = document.querySelectorAll('.section');

  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
  });

  sections.forEach((section) => {
    section.style.transition = 'opacity 0.3s ease-out';
  });
});

// ===== ENHANCED SCROLL EFFECT =====
let lastScrollY = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  // Adicionar classe quando scrollar
  if (lastScrollY > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }

  // Parallax effect suave
  const hero = document.querySelector('.hero');
  if (hero && lastScrollY < window.innerHeight) {
    hero.style.transform = `translateY(${lastScrollY * 0.5}px)`;
  }
}, { passive: true });

// ===== SMOOTH SCROLL TO SECTIONS =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();

      // Fechar menu mobile se aberto
      const mobileToggle = document.getElementById('mobile-toggle');
      const navbar = document.getElementById('navbar');
      if (mobileToggle?.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navbar?.classList.remove('active');
      }

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== COUNTER ANIMATION =====
const animateCounter = (element, target, duration = 2000) => {
  let count = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    count += increment;
    if (count >= target) {
      element.innerText = target;
      clearInterval(timer);
    } else {
      element.innerText = Math.floor(count);
    }
  }, 16);
};

// Animar contadores quando visíveis
const counterElements = document.querySelectorAll('.counter');
if (counterElements.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const target = parseInt(entry.target.getAttribute('data-target')) || 10;
        animateCounter(entry.target, target);
        entry.target.classList.add('animated');
      }
    });
  });

  counterElements.forEach((el) => counterObserver.observe(el));
}

// ===== BOTÃO FLUTUANTE DE WHATSAPP (OPCIONAL) =====
const createWhatsAppButton = () => {
  if (document.getElementById('whatsapp-button')) return;

  const button = document.createElement('a');
  button.id = 'whatsapp-button';
  button.href = 'https://wa.me/5519988727143';
  button.target = '_blank';
  button.title = 'Conversar no WhatsApp';
  button.innerHTML = '<i class="bx bxl-whatsapp"></i>';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #25D366, #20BA5A);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    cursor: pointer;
  `;

  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1) translateY(-5px)';
    button.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.6)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1) translateY(0)';
    button.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
  });

  document.body.appendChild(button);

  // Esconder em mobile se houver espaço limitado
  if (window.innerWidth < 480) {
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.width = '48px';
    button.style.height = '48px';
    button.style.fontSize = '24px';
  }
};

// Criar botão ao carregar
document.addEventListener('DOMContentLoaded', createWhatsAppButton);

// ===== TEXT REVEAL ANIMATION =====
const revealText = (text) => {
  const words = text.split(' ');
  let index = 0;

  const reveal = () => {
    if (index < words.length) {
      const span = document.createElement('span');
      span.textContent = words[index] + ' ';
      span.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
      index++;
      return span;
    }
  };

  return reveal;
};

// ===== ENHANCED NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

const updateActiveNav = () => {
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav(); // Call on page load

// ===== MOBILE MENU ENHANCEMENT =====
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.getElementById('navbar');

if (mobileToggle && navbar) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navbar.classList.toggle('active');

    // Smooth animation
    if (navbar.classList.contains('active')) {
      navbar.style.animation = 'slideDown 0.3s ease-out';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('.mobile-toggle')) {
      mobileToggle?.classList.remove('active');
      navbar?.classList.remove('active');
    }
  });
}

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`[Performance] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
      }
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });
  } catch (e) {
    // Silently fail if not supported
  }
}

// ===== PREFETCH LINKS PARA PERFORMANCE =====
if ('prefetch' in document.createElement('link')) {
  const links = document.querySelectorAll('a[href^="https://"]');
  links.forEach((link) => {
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = link.href;
    document.head.appendChild(prefetchLink);
  });
}

console.log('✨ Portfolio Premium Enhancements Loaded');
