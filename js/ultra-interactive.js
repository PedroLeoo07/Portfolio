// Ultra Interactive Features - Funcionalidades Avançadas

class UltraInteractive {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.konamiIndex = 0;
        this.mouseTrails = [];
        this.init();
    }

    init() {
        this.createMatrixRain();
        this.createSoundVisualizer();
        this.createFloatingTerminal();
        this.createDNAHelix();
        this.createRadarScan();
        this.initKonamiCode();
        this.initMouseTrail();
        this.createShootingStars();
        this.createFloatingElements();
        this.initGlitchEffect();
        this.initInteractiveBackground();
        this.createLoadingSimulation();
    }

    // Matrix Rain Effect
    createMatrixRain() {
        if (window.innerWidth <= 768) return;

        const container = document.createElement('div');
        container.className = 'matrix-rain';
        document.body.appendChild(container);

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        setInterval(() => {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            char.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(char);
            
            setTimeout(() => {
                char.remove();
            }, 5000);
        }, 100);
    }

    // Sound Visualizer
    createSoundVisualizer() {
        const container = document.createElement('div');
        container.className = 'sound-visualizer';
        
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.style.animationDelay = Math.random() * 0.5 + 's';
            bar.style.animationDuration = (Math.random() * 0.5 + 0.3) + 's';
            container.appendChild(bar);
        }
        
        document.body.appendChild(container);
    }

    // Floating Terminal
    createFloatingTerminal() {
        if (window.innerWidth <= 768) return;

        const terminal = document.createElement('div');
        terminal.className = 'floating-terminal';
        terminal.innerHTML = `
            <div class="terminal-header">
                <span>leonardo@portfolio:~$</span>
                <button class="terminal-close">&times;</button>
            </div>
            <div class="terminal-content" id="terminal-output">
                <div>Welcome to Leonardo's Portfolio Terminal</div>
                <div>Type 'help' for available commands</div>
                <div class="terminal-line">
                    <span class="terminal-prompt">$ </span>
                    <input type="text" class="terminal-input" id="terminal-input" placeholder="Enter command...">
                </div>
            </div>
        `;

        document.body.appendChild(terminal);

        const commands = {
            help: 'Available commands: about, skills, projects, contact, clear, matrix, hack',
            about: 'Leonardo Oliveira - Full-Stack Developer',
            skills: 'React, Node.js, JavaScript, TypeScript, PostgreSQL, Next.js',
            projects: 'Portfolio Website, API Node.js, React App',
            contact: 'Email: leonardo@example.com | LinkedIn: /in/leonardo-oliveira',
            clear: 'CLEAR',
            matrix: 'MATRIX_MODE_ACTIVATED',
            hack: 'ACCESS_GRANTED... Just kidding! 😄'
        };

        const input = terminal.querySelector('#terminal-input');
        const output = terminal.querySelector('#terminal-output');
        const closeBtn = terminal.querySelector('.terminal-close');

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim().toLowerCase();
                const response = commands[command] || `Command not found: ${command}`;
                
                if (response === 'CLEAR') {
                    output.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$ </span><input type="text" class="terminal-input" id="terminal-input" placeholder="Enter command..."></div>';
                } else if (response === 'MATRIX_MODE_ACTIVATED') {
                    this.activateMatrixMode();
                } else {
                    const line = document.createElement('div');
                    line.innerHTML = `<span class="terminal-prompt">$ ${command}</span><br>${response}`;
                    output.insertBefore(line, output.lastElementChild);
                }
                
                input.value = '';
                output.scrollTop = output.scrollHeight;
            }
        });

        closeBtn.addEventListener('click', () => {
            terminal.classList.remove('active');
        });

        // Toggle terminal with Ctrl+`
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.code === 'Backquote') {
                e.preventDefault();
                terminal.classList.toggle('active');
                if (terminal.classList.contains('active')) {
                    input.focus();
                }
            }
        });
    }

    // DNA Helix
    createDNAHelix() {
        if (window.innerWidth <= 768) return;

        const helix = document.createElement('div');
        helix.className = 'dna-helix';
        helix.innerHTML = `
            <div class="dna-strand"></div>
            <div class="dna-strand"></div>
        `;

        helix.addEventListener('click', () => {
            helix.style.animation = 'none';
            setTimeout(() => {
                helix.style.animation = '';
            }, 100);
            this.createFloatingElements();
        });

        document.body.appendChild(helix);
    }

    // Radar Scan
    createRadarScan() {
        if (window.innerWidth <= 768) return;

        const radar = document.createElement('div');
        radar.className = 'radar-container';
        radar.innerHTML = `
            <div class="radar-sweep"></div>
        `;

        // Add random dots
        setInterval(() => {
            const dot = document.createElement('div');
            dot.className = 'radar-dot';
            dot.style.left = Math.random() * 90 + '%';
            dot.style.top = Math.random() * 90 + '%';
            radar.appendChild(dot);

            setTimeout(() => {
                dot.remove();
            }, 2000);
        }, 1000);

        radar.addEventListener('click', () => {
            this.scanForElements();
        });

        document.body.appendChild(radar);
    }

    // Konami Code Easter Egg
    initKonamiCode() {
        document.addEventListener('keydown', (e) => {
            if (e.code === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateKonamiEffect();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    activateKonamiEffect() {
        const effect = document.createElement('div');
        effect.className = 'konami-effect';
        effect.style.display = 'block';
        document.body.appendChild(effect);

        const message = document.createElement('div');
        message.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            color: white;
            text-align: center;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        `;
        message.textContent = '🎉 KONAMI CODE ACTIVATED! 🎉';
        effect.appendChild(message);

        setTimeout(() => {
            effect.remove();
        }, 3000);
    }

    // Mouse Trail Effect
    initMouseTrail() {
        if (window.innerWidth <= 768) return;

        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            document.body.appendChild(trail);
            this.mouseTrails.push({
                element: trail,
                x: 0,
                y: 0,
                delay: i * 50
            });
        }

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const updateTrails = () => {
            this.mouseTrails.forEach((trail, index) => {
                trail.x += (mouseX - trail.x) * (0.3 - index * 0.02);
                trail.y += (mouseY - trail.y) * (0.3 - index * 0.02);
                
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
                trail.element.style.opacity = 1 - index * 0.1;
                trail.element.style.transform = `scale(${1 - index * 0.1})`;
            });
            
            requestAnimationFrame(updateTrails);
        };

        updateTrails();
    }

    // Shooting Stars
    createShootingStars() {
        setInterval(() => {
            if (Math.random() < 0.3) {
                const star = document.createElement('div');
                star.className = 'shooting-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 50 + '%';
                document.body.appendChild(star);

                setTimeout(() => {
                    star.classList.add('active');
                }, 100);

                setTimeout(() => {
                    star.remove();
                }, 3000);
            }
        }, 2000);
    }

    // Floating Code Elements
    createFloatingElements() {
        const elements = [
            '{ }', '< />', 'console.log()', 'function()', 'return', 'const', 'let', 'var',
            '⚡', '🚀', '💻', '🎯', '⭐', '🔥', '💡', '⚙️'
        ];

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const element = document.createElement('div');
                element.className = `floating-element ${Math.random() > 0.5 ? 'code' : 'icon'}`;
                element.textContent = elements[Math.floor(Math.random() * elements.length)];
                element.style.left = Math.random() * 100 + '%';
                element.style.animationDuration = (Math.random() * 10 + 15) + 's';
                element.style.animationDelay = Math.random() * 5 + 's';
                document.body.appendChild(element);

                setTimeout(() => {
                    element.remove();
                }, 25000);
            }, i * 1000);
        }
    }

    // Glitch Effect
    initGlitchEffect() {
        const glitchElements = document.querySelectorAll('.gradient-text');
        
        glitchElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('glitch');
                el.setAttribute('data-text', el.textContent);
                
                setTimeout(() => {
                    el.classList.remove('glitch');
                }, 500);
            });
        });
    }

    // Interactive Background
    initInteractiveBackground() {
        document.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });
    }

    createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid var(--main-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: click-ripple 0.6s ease-out forwards;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes click-ripple {
                to {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(effect);

        setTimeout(() => {
            effect.remove();
            style.remove();
        }, 600);
    }

    // Loading Simulation
    createLoadingSimulation() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-simulation';
        loadingDiv.innerHTML = `
            <div>System Status:</div>
            <div>Initializing Portfolio... <span id="loading-1">0%</span></div>
            <div class="loading-bar"><div class="loading-progress" id="progress-1"></div></div>
            <div>Loading Skills... <span id="loading-2">0%</span></div>
            <div class="loading-bar"><div class="loading-progress" id="progress-2"></div></div>
            <div>Connecting to GitHub... <span id="loading-3">0%</span></div>
            <div class="loading-bar"><div class="loading-progress" id="progress-3"></div></div>
            <button onclick="this.parentElement.style.display='none'">Close</button>
        `;
        document.body.appendChild(loadingDiv);

        // Show loading on Ctrl+L
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.runLoadingSimulation(loadingDiv);
            }
        });
    }

    runLoadingSimulation(container) {
        container.style.display = 'block';
        
        const animations = [
            { progress: 'progress-1', text: 'loading-1' },
            { progress: 'progress-2', text: 'loading-2' },
            { progress: 'progress-3', text: 'loading-3' }
        ];

        animations.forEach((anim, index) => {
            setTimeout(() => {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 10;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                    }
                    
                    document.getElementById(anim.progress).style.width = progress + '%';
                    document.getElementById(anim.text).textContent = Math.floor(progress) + '%';
                }, 100);
            }, index * 2000);
        });
    }

    activateMatrixMode() {
        document.body.style.background = '#000';
        document.body.style.color = '#0f0';
        
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.color = '';
        }, 5000);
    }

    scanForElements() {
        const allElements = document.querySelectorAll('*');
        console.log(`Radar Scan Complete: ${allElements.length} elements detected`);
        
        // Highlight random elements briefly
        for (let i = 0; i < 5; i++) {
            const randomEl = allElements[Math.floor(Math.random() * allElements.length)];
            randomEl.style.outline = '2px solid var(--main-color)';
            
            setTimeout(() => {
                randomEl.style.outline = '';
            }, 1000);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        new UltraInteractive();
    } else {
        // Mobile version with limited features
        const mobileInteractive = new UltraInteractive();
        // Only some features for mobile
    }
});

// Add some global interactive functions
window.addEventListener('load', () => {
    // Secret developer tools
    window.devTools = {
        activate: () => new UltraInteractive(),
        matrix: () => document.querySelector('.ultra-interactive').activateMatrixMode(),
        konami: () => document.querySelector('.ultra-interactive').activateKonamiEffect()
    };
    
    console.log('%c🚀 Leonardo\'s Portfolio Dev Tools Loaded!', 'color: #f00; font-size: 16px; font-weight: bold;');
    console.log('%cTry: devTools.activate(), devTools.matrix(), devTools.konami()', 'color: #0f0; font-size: 12px;');
    console.log('%cKonami Code: ↑↑↓↓←→←→BA', 'color: #00f; font-size: 12px;');
    console.log('%cTerminal: Ctrl + `', 'color: #ff0; font-size: 12px;');
});
