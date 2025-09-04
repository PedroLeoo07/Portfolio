// Easter Eggs e Funcionalidades Secretas

class SecretFeatures {
    constructor() {
        this.secretsUnlocked = [];
        this.init();
    }

    init() {
        this.initSecretCommands();
        this.initHiddenGestures();
        this.initSecretCombinations();
        this.initTimeBasedFeatures();
        this.initDeveloperTools();
    }

    // Comandos secretos
    initSecretCommands() {
        let sequence = '';
        
        document.addEventListener('keydown', (e) => {
            sequence += e.key.toLowerCase();
            
            // Manter apenas os últimos 20 caracteres
            if (sequence.length > 20) {
                sequence = sequence.slice(-20);
            }
            
            this.checkSecretCodes(sequence);
        });
    }

    checkSecretCodes(sequence) {
        const secrets = {
            'leonardo': () => this.activateNameEasterEgg(),
            'portfolio': () => this.activatePortfolioMode(),
            'developer': () => this.activateDeveloperMode(),
            'matrix': () => this.activateMatrixMode(),
            'neon': () => this.activateNeonMode(),
            'party': () => this.activatePartyMode(),
            'coffee': () => this.showCoffeeMessage(),
            'code': () => this.showCodeMessage(),
            'secret': () => this.showAllSecrets(),
            'rainbow': () => this.activateRainbowMode(),
            'hacker': () => this.activateHackerMode()
        };

        Object.keys(secrets).forEach(code => {
            if (sequence.includes(code)) {
                secrets[code]();
                sequence = ''; // Reset sequence after match
            }
        });
    }

    // Gestos secretos do mouse
    initHiddenGestures() {
        let mousePattern = [];
        let lastMouseMove = 0;

        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMouseMove > 100) {
                const direction = this.getMouseDirection(e);
                mousePattern.push(direction);
                
                if (mousePattern.length > 10) {
                    mousePattern.shift();
                }
                
                this.checkMousePatterns(mousePattern);
                lastMouseMove = now;
            }
        });
    }

    getMouseDirection(e) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        if (e.clientX > centerX && Math.abs(e.clientX - centerX) > Math.abs(e.clientY - centerY)) return 'right';
        if (e.clientX < centerX && Math.abs(e.clientX - centerX) > Math.abs(e.clientY - centerY)) return 'left';
        if (e.clientY > centerY) return 'down';
        return 'up';
    }

    checkMousePatterns(pattern) {
        const patternStr = pattern.join('');
        
        if (patternStr.includes('rightleftrightleft')) {
            this.activateMouseSecretMode();
        }
        
        if (patternStr.includes('updownupdown')) {
            this.createFloatingMessage('🎮 Mouse Pattern Detected!');
        }
    }

    // Combinações secretas de teclas
    initSecretCombinations() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + Shift + D = Developer Easter Egg
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                this.showDeveloperCredits();
            }
            
            // Alt + Ctrl + S = Secret Stats
            if (e.altKey && e.ctrlKey && e.key === 's') {
                this.showSecretStats();
            }
            
            // Ctrl + Shift + R = Rainbow Mode
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                this.activateRainbowMode();
            }
        });
    }

    // Funcionalidades baseadas no tempo
    initTimeBasedFeatures() {
        const hour = new Date().getHours();
        
        // Modo noturno automático
        if (hour >= 22 || hour <= 6) {
            this.activateNightMode();
        }
        
        // Mensagem especial por horário
        if (hour >= 6 && hour < 12) {
            console.log('🌅 Bom dia! Que tal um café?');
        } else if (hour >= 12 && hour < 18) {
            console.log('☀️ Boa tarde! Desenvolvendo algo incrível?');
        } else {
            console.log('🌙 Boa noite! Coding até tarde?');
        }
        
        // Easter egg de data especial
        const today = new Date();
        if (today.getMonth() === 3 && today.getDate() === 1) { // 1º de abril
            this.aprilFoolsMode();
        }
    }

    // Ferramentas de desenvolvedor
    initDeveloperTools() {
        // Console personalizado
        const originalLog = console.log;
        console.log = (...args) => {
            originalLog(...args);
            this.logToCustomConsole(args.join(' '));
        };
        
        // Informações de debug
        window.portfolioDebug = {
            secrets: this.secretsUnlocked,
            unlock: (secret) => this.unlockSecret(secret),
            showAll: () => this.showAllSecrets(),
            reset: () => this.resetSecrets(),
            stats: () => this.getPortfolioStats()
        };
    }

    // Implementação dos Easter Eggs
    activateNameEasterEgg() {
        this.createFloatingMessage('🎉 Leonardo Oliveira - Master Developer!');
        this.unlockSecret('name');
        this.createNameAnimation();
    }

    activatePortfolioMode() {
        document.body.classList.add('portfolio-enhanced');
        this.createFloatingMessage('💼 Portfolio Mode Activated!');
        this.unlockSecret('portfolio');
    }

    activateDeveloperMode() {
        document.body.classList.add('developer-mode');
        this.showCodeEditor();
        this.unlockSecret('developer');
    }

    activateMatrixMode() {
        document.body.style.background = '#000';
        document.body.style.color = '#0f0';
        this.createMatrixText();
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.color = '';
        }, 10000);
        this.unlockSecret('matrix');
    }

    activateNeonMode() {
        document.body.classList.add('neon-mode');
        const style = document.createElement('style');
        style.textContent = `
            .neon-mode * {
                text-shadow: 0 0 10px var(--main-color) !important;
                box-shadow: 0 0 20px var(--main-color) !important;
            }
        `;
        document.head.appendChild(style);
        setTimeout(() => {
            document.body.classList.remove('neon-mode');
            style.remove();
        }, 5000);
        this.unlockSecret('neon');
    }

    activatePartyMode() {
        this.createConfetti();
        this.playPartyLights();
        this.createFloatingMessage('🎉 PARTY MODE! 🎉');
        this.unlockSecret('party');
    }

    activateRainbowMode() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            body { animation: rainbow 2s linear infinite; }
        `;
        document.head.appendChild(style);
        setTimeout(() => style.remove(), 10000);
        this.unlockSecret('rainbow');
    }

    activateHackerMode() {
        this.createHackerInterface();
        this.unlockSecret('hacker');
    }

    // Utilitários
    createFloatingMessage(text) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: var(--main-color);
            padding: 2rem;
            border-radius: 10px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10000;
            border: 2px solid var(--main-color);
            animation: float-in 0.5s ease;
        `;
        message.textContent = text;
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 3000);
    }

    createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: hsl(${Math.random() * 360}, 100%, 50%);
                top: -10px;
                left: ${Math.random() * 100}%;
                animation: confetti-fall ${Math.random() * 3 + 2}s linear;
                z-index: 10000;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                }
            }
        `;
        document.head.appendChild(style);
        setTimeout(() => style.remove(), 5000);
    }

    createHackerInterface() {
        const hacker = document.createElement('div');
        hacker.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            color: #0f0;
            font-family: 'Courier New', monospace;
            z-index: 10000;
            padding: 2rem;
            overflow: hidden;
        `;
        
        const messages = [
            'INITIATING HACK SEQUENCE...',
            'BYPASSING FIREWALL...',
            'ACCESSING MAINFRAME...',
            'DOWNLOADING DATA...',
            'HACK COMPLETE!',
            'Just kidding! 😄'
        ];
        
        let index = 0;
        const interval = setInterval(() => {
            hacker.innerHTML += '<div>' + messages[index] + '</div>';
            index++;
            if (index >= messages.length) {
                clearInterval(interval);
                setTimeout(() => hacker.remove(), 2000);
            }
        }, 1000);
        
        document.body.appendChild(hacker);
    }

    unlockSecret(secretName) {
        if (!this.secretsUnlocked.includes(secretName)) {
            this.secretsUnlocked.push(secretName);
            localStorage.setItem('portfolioSecrets', JSON.stringify(this.secretsUnlocked));
            console.log(`🔓 Secret unlocked: ${secretName}`);
        }
    }

    showAllSecrets() {
        const secrets = [
            '🔑 Available Secrets:',
            '- Type "leonardo" for name easter egg',
            '- Type "matrix" for Matrix mode',
            '- Type "party" for party mode',
            '- Type "rainbow" for rainbow mode',
            '- Type "neon" for neon mode',
            '- Ctrl+Shift+D for developer credits',
            '- Ctrl+` for terminal',
            '- Mouse gestures: right-left-right-left',
            '- Konami Code: ↑↑↓↓←→←→BA'
        ];
        
        console.log(secrets.join('\n'));
        this.createFloatingMessage('🎮 Check console for all secrets!');
    }

    getPortfolioStats() {
        return {
            secretsUnlocked: this.secretsUnlocked.length,
            totalSecrets: 10,
            timeOnSite: Date.now() - (window.portfolioStartTime || Date.now()),
            userAgent: navigator.userAgent,
            screen: `${screen.width}x${screen.height}`,
            language: navigator.language
        };
    }
}

// Inicializar funcionalidades secretas
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioStartTime = Date.now();
    window.SecretFeatures = new SecretFeatures();
    
    console.log('🕵️ Secret Features Loaded!');
    console.log('Try typing secret words or use portfolioDebug.showAll()');
});

// Adicionar CSS para animações
const secretStyles = document.createElement('style');
secretStyles.textContent = `
    @keyframes float-in {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .portfolio-enhanced {
        filter: saturate(1.5) brightness(1.1);
    }
    
    .developer-mode {
        font-family: 'Courier New', monospace !important;
    }
`;
document.head.appendChild(secretStyles);
