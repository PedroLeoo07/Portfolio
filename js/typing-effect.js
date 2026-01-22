// Efeito de digitação (Typing Effect)
document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.querySelector('.typing-text');
  
  if (!typingElement) return;
  
  const texts = [
    'Software Engineering Student',
    'Full Stack Developer'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // Apagando
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Digitando
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    // Se terminou de digitar
    if (!isDeleting && charIndex === currentText.length) {
      // Pausa antes de começar a apagar
      typingSpeed = 2000;
      isDeleting = true;
    } 
    // Se terminou de apagar
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Inicia o efeito após um pequeno delay
  setTimeout(type, 1000);
});
