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
      // Apagando - rápido e suave
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = getRandomSpeed(40, 30);
      
      // Adiciona classe para efeito visual
      typingElement.classList.add('deleting');
    } else {
      // Digitando - velocidade natural e variável
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = getRandomSpeed(100, 80);
      
      // Remove classe de deleção
      typingElement.classList.remove('deleting');
      
      // Pausas naturais em espaços
      if (currentText[charIndex - 1] === ' ') {
        typingSpeed += 100;
      }
      
      // Pequena pausa adicional em letras maiúsculas
      if (currentText[charIndex - 1] === currentText[charIndex - 1].toUpperCase() && 
          currentText[charIndex - 1] !== ' ') {
        typingSpeed += 20;
      }
    }
    
    // Se terminou de digitar
    if (!isDeleting && charIndex === currentText.length) {
      // Pausa antes de apagar
      typingSpeed = 3000;
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
      typingSpeed = 1000;
      
      // Remove efeitos
      typingElement.classList.remove('complete', 'deleting');
      if (cursorElement) {
        cursorElement.classList.remove('pause');
      }
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Inicia o efeito após um delay suave
  setTimeout(type, 1000);
});
