// Efeito de digitação aprimorado (Enhanced Typing Effect)
document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.querySelector('.typing-text');
  const cursorElement = document.querySelector('.typing-cursor');
  
  if (!typingElement) return;
  
  const texts = [
    'Software Engineering Student',
    'Full Stack Developer'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function getRandomSpeed(base, variance) {
    return base + Math.random() * variance;
  }
  
  function type() {
    const currentText = texts[textIndex];
    let typingSpeed;
    
    if (isDeleting) {
      // Apagando - mais rápido
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = getRandomSpeed(30, 20);
      
      // Adiciona classe para efeito visual
      typingElement.classList.add('deleting');
    } else {
      // Digitando - velocidade variável para parecer mais natural
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = getRandomSpeed(80, 60);
      
      // Remove classe de deleção
      typingElement.classList.remove('deleting');
      
      // Pausa extra em espaços e vírgulas
      if (currentText[charIndex - 1] === ' ') {
        typingSpeed += 50;
      }
    }
    
    // Se terminou de digitar
    if (!isDeleting && charIndex === currentText.length) {
      // Pausa longa antes de começar a apagar
      typingSpeed = 2500;
      isDeleting = true;
      
      // Adiciona efeito de conclusão
      typingElement.classList.add('complete');
      if (cursorElement) {
        cursorElement.classList.add('pause');
      }
    } 
    // Se terminou de apagar
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 800;
      
      // Remove efeitos
      typingElement.classList.remove('complete', 'deleting');
      if (cursorElement) {
        cursorElement.classList.remove('pause');
      }
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Inicia o efeito após um delay
  setTimeout(type, 1200);
});
