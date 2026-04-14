/**
 * Leonardo Oliveira Portfolio - Main JavaScript
 * Clean, consolidated, and optimized
 */

// ===== THEME TOGGLE =====
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
  }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navbar = document.getElementById('navbar');

  if (!mobileToggle || !navbar) return;

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileToggle.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('navbar-open');
  });

  // Close menu on link click
  const navLinks = navbar.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navbar.classList.remove('active');
      document.body.classList.remove('navbar-open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && navbar.classList.contains('active')) {
      mobileToggle.classList.remove('active');
      navbar.classList.remove('active');
      document.body.classList.remove('navbar-open');
    }
  });

  // Close menu on scroll
  window.addEventListener('scroll', () => {
    if (navbar.classList.contains('active')) {
      mobileToggle.classList.remove('active');
      navbar.classList.remove('active');
      document.body.classList.remove('navbar-open');
    }
  }, { passive: true });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== ACTIVE NAVIGATION =====
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;

  const texts = [
    'Software Engineering Student',
    'Full Stack Developer'
  ];
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[currentIndex];

    if (!isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex);
      charIndex++;

      if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      typingText.textContent = currentText.substring(0, charIndex);
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        setTimeout(type, 500);
        return;
      }
    }

    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();
}

// ===== CONTACT FORM =====
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const submitBtn = document.getElementById('submit-btn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i><span>Enviando...</span>';
    submitBtn.disabled = true;

    const templateParams = {
      from_name: contactForm.from_name.value,
      from_email: contactForm.from_email.value,
      subject: contactForm.subject.value,
      message: contactForm.message.value,
      to_email: 'leonardopedrodeoliveira07@gmail.com'
    };

    if (typeof emailjs !== 'undefined') {
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(() => {
          submitBtn.innerHTML = '<i class="bx bx-check"></i><span>Enviado!</span>';
          showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
          }, 3000);
        })
        .catch((error) => {
          console.error('Erro ao enviar email:', error);
          submitBtn.innerHTML = '<i class="bx bx-x"></i><span>Erro ao enviar</span>';
          showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');

          setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
          }, 3000);
        });
    } else {
      console.warn('EmailJS não carregado');
      showNotification('Erro de configuração. Tente usar WhatsApp.', 'error');
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
    }
  });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type) {
  // Adicionar CSS da animação se não existir
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10B981' : '#EF4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    font-weight: 500;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
    font-family: 'Inter', sans-serif;
  `;

  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-x-circle'}"></i>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// ===== WHATSAPP BUTTON =====
function initWhatsAppButton() {
  const whatsappNumber = '5519988727143';
  const whatsappMessage = 'Olá Leonardo! Gostaria de entrar em contato.';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  if (!document.querySelector('.whatsapp-button')) {
    const button = document.createElement('a');
    button.href = whatsappURL;
    button.target = '_blank';
    button.className = 'whatsapp-button';
    button.title = 'Abrir WhatsApp';
    button.innerHTML = '<i class="bx bxl-whatsapp"></i>';
    document.body.appendChild(button);
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Adicionar CSS de animação
  if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('.card, .project-card').forEach(el => {
    observer.observe(el);
  });
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initHeaderScroll();
  initTypingEffect();
  initContactForm();
  initWhatsAppButton();
  initIntersectionObserver();

  console.log('✨ Portfolio loaded successfully!');
});
