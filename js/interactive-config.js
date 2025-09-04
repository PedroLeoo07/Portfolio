// Configurações Avançadas de Interatividade

const InteractiveConfig = {
    // Configurações gerais
    enabled: true,
    
    // Configurações de performance
    performance: {
        maxParticles: 50,
        animationSpeed: 60, // FPS
        enableOnMobile: false
    },
    
    // Configurações de efeitos
    effects: {
        matrixRain: true,
        soundVisualizer: true,
        mouseTrail: true,
        shootingStars: true,
        floatingElements: true,
        dnaHelix: true,
        radar: true,
        terminal: true
    },
    
    // Easter eggs
    easterEggs: {
        konamiCode: true,
        secretCommands: true,
        hiddenFeatures: true
    },
    
    // Configurações do terminal
    terminal: {
        commands: {
            'hack': 'Iniciando sequência de hack...\n[████████████████████] 100%\nACESSO NEGADO! 😄 Apenas brincando!',
            'matrix': 'Ativando modo Matrix...',
            'secret': 'Você encontrou um comando secreto! 🎉',
            'dev': 'Leonardo Oliveira - Desenvolvedor Full-Stack\nEspecialidades: React, Node.js, TypeScript',
            'coffee': '☕ Carregando café... Desenvolvedor recarregado!',
            'joke': 'Por que programadores preferem modo escuro?\nPorque a luz atrai bugs! 🐛😄',
            'time': () => `Hora atual: ${new Date().toLocaleTimeString()}`,
            'random': () => `Número aleatório: ${Math.floor(Math.random() * 100)}`,
            'ip': () => 'IP: 127.0.0.1 (localhost)',
            'status': 'Sistema: ✅ Online\nPortfolio: ✅ Funcionando\nCriatividade: ✅ Máxima',
            'github': 'Redirecionando para GitHub...',
            'linkedin': 'Conectando com LinkedIn...'
        }
    },
    
    // Configurações do radar
    radar: {
        scanInterval: 2000,
        dotLifetime: 2000,
        sweepSpeed: 2
    },
    
    // Configurações de partículas
    particles: {
        types: ['code', 'symbols', 'characters'],
        codeElements: [
            'function()', '{ }', '< />', 'console.log()', 'return', 'const', 'let', 'var',
            'if()', 'for()', 'while()', 'class', 'import', 'export', 'async', 'await'
        ],
        symbols: ['⚡', '🚀', '💻', '🎯', '⭐', '🔥', '💡', '⚙️', '🌟', '✨', '💫', '🎨'],
        characters: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    },
    
    // Configurações de som (para futuras implementações)
    audio: {
        enabled: false,
        volume: 0.3,
        effects: ['click', 'hover', 'transition']
    },
    
    // Configurações de cores
    colors: {
        primary: '#f00000',
        secondary: '#ff6b6b',
        accent: '#feca57',
        neon: '#0ff',
        matrix: '#0f0'
    },
    
    // Configurações de timing
    timing: {
        typewriterSpeed: 150,
        fadeInDuration: 800,
        hoverDelay: 100,
        clickEffectDuration: 600
    }
};

// Classe para gerenciar configurações
class InteractiveManager {
    constructor(config = InteractiveConfig) {
        this.config = config;
        this.isEnabled = config.enabled;
        this.isMobile = window.innerWidth <= 768;
    }
    
    shouldEnableEffect(effectName) {
        if (!this.isEnabled) return false;
        if (this.isMobile && !this.config.performance.enableOnMobile) return false;
        return this.config.effects[effectName] !== false;
    }
    
    getCommand(commandName) {
        const command = this.config.terminal.commands[commandName];
        return typeof command === 'function' ? command() : command;
    }
    
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    
    toggleEffect(effectName) {
        this.config.effects[effectName] = !this.config.effects[effectName];
        console.log(`${effectName}: ${this.config.effects[effectName] ? 'Ativado' : 'Desativado'}`);
    }
    
    getRandomParticle(type = 'code') {
        const particles = this.config.particles[type];
        if (Array.isArray(particles)) {
            return particles[Math.floor(Math.random() * particles.length)];
        }
        return particles[Math.floor(Math.random() * particles.length)];
    }
}

// Inicializar gerenciador global
window.InteractiveManager = new InteractiveManager();

// Adicionar comandos de depuração global
window.debugInteractive = {
    config: InteractiveConfig,
    manager: window.InteractiveManager,
    toggleEffect: (name) => window.InteractiveManager.toggleEffect(name),
    getConfig: () => window.InteractiveManager.config,
    enableAll: () => {
        Object.keys(InteractiveConfig.effects).forEach(effect => {
            InteractiveConfig.effects[effect] = true;
        });
        console.log('Todos os efeitos ativados!');
    },
    disableAll: () => {
        Object.keys(InteractiveConfig.effects).forEach(effect => {
            InteractiveConfig.effects[effect] = false;
        });
        console.log('Todos os efeitos desativados!');
    }
};

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InteractiveConfig, InteractiveManager };
}

console.log('🎮 Interactive Configuration Loaded!');
console.log('Try: debugInteractive.toggleEffect("matrixRain")');
console.log('Available effects:', Object.keys(InteractiveConfig.effects));
