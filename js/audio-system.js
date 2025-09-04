// Sistema de Sons Interativos

class AudioManager {
    constructor() {
        this.context = null;
        this.enabled = false;
        this.volume = 0.3;
        this.sounds = {};
        this.init();
    }

    async init() {
        try {
            // Criar contexto de áudio apenas após interação do usuário
            document.addEventListener('click', this.initAudioContext.bind(this), { once: true });
            this.createSyntheticSounds();
        } catch (error) {
            console.log('Audio não suportado:', error);
        }
    }

    async initAudioContext() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.enabled = true;
            console.log('🔊 Audio System Activated!');
        } catch (error) {
            console.log('Falha ao iniciar contexto de áudio:', error);
        }
    }

    createSyntheticSounds() {
        // Sons sintéticos usando Web Audio API
        this.sounds = {
            click: () => this.playTone(800, 0.1, 'sine'),
            hover: () => this.playTone(600, 0.05, 'sine'),
            success: () => this.playChord([523, 659, 784], 0.3),
            error: () => this.playTone(200, 0.2, 'sawtooth'),
            notification: () => this.playSequence([523, 659, 784, 1047], 0.1),
            typing: () => this.playTone(1200, 0.02, 'square'),
            whoosh: () => this.playNoise(0.1),
            beep: () => this.playTone(1000, 0.1, 'square'),
            matrix: () => this.playMatrixSound(),
            terminal: () => this.playTone(400, 0.05, 'sine'),
            scan: () => this.playSweep(200, 800, 0.5)
        };
    }

    playTone(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.context) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0, this.context.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume, this.context.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    playChord(frequencies, duration) {
        frequencies.forEach(freq => {
            setTimeout(() => this.playTone(freq, duration), Math.random() * 50);
        });
    }

    playSequence(frequencies, noteDuration) {
        frequencies.forEach((freq, index) => {
            setTimeout(() => this.playTone(freq, noteDuration), index * noteDuration * 1000);
        });
    }

    playNoise(duration) {
        if (!this.enabled || !this.context) return;

        const bufferSize = this.context.sampleRate * duration;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.context.createBufferSource();
        const gainNode = this.context.createGain();

        noise.buffer = buffer;
        noise.connect(gainNode);
        gainNode.connect(this.context.destination);

        gainNode.gain.setValueAtTime(this.volume * 0.1, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

        noise.start(this.context.currentTime);
    }

    playMatrixSound() {
        // Som estilo Matrix
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.playTone(Math.random() * 500 + 200, 0.1, 'square');
            }, i * 50);
        }
    }

    playSweep(startFreq, endFreq, duration) {
        if (!this.enabled || !this.context) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.frequency.setValueAtTime(startFreq, this.context.currentTime);
        oscillator.frequency.linearRampToValueAtTime(endFreq, this.context.currentTime + duration);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(this.volume * 0.3, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    toggle() {
        this.enabled = !this.enabled;
        console.log(`🔊 Audio: ${this.enabled ? 'Ativado' : 'Desativado'}`);
        return this.enabled;
    }
}

// Sistema de Feedback Sonoro
class SoundFeedback {
    constructor(audioManager) {
        this.audio = audioManager;
        this.init();
    }

    init() {
        this.addClickSounds();
        this.addHoverSounds();
        this.addTypingSounds();
        this.addSpecialEffects();
    }

    addClickSounds() {
        // Sons para cliques em botões
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, button, .project-box')) {
                this.audio.play('click');
            }
        });
    }

    addHoverSounds() {
        // Sons para hover em elementos interativos
        const interactiveElements = document.querySelectorAll('.btn, .home-sci a, .navbar a');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.audio.play('hover');
            });
        });
    }

    addTypingSounds() {
        // Sons para digitação no terminal
        document.addEventListener('keypress', (e) => {
            if (e.target.matches('.terminal-input')) {
                this.audio.play('typing');
            }
        });
    }

    addSpecialEffects() {
        // Sons para efeitos especiais
        document.addEventListener('konami-activated', () => {
            this.audio.play('success');
        });

        document.addEventListener('terminal-open', () => {
            this.audio.play('whoosh');
        });

        document.addEventListener('skill-animate', () => {
            this.audio.play('beep');
        });
    }
}

// Visualizador de Áudio Melhorado
class AudioVisualizer {
    constructor(audioManager) {
        this.audio = audioManager;
        this.analyzer = null;
        this.dataArray = null;
        this.init();
    }

    init() {
        if (this.audio.context) {
            this.analyzer = this.audio.context.createAnalyser();
            this.analyzer.fftSize = 256;
            this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
            this.createVisualizer();
        }
    }

    createVisualizer() {
        const visualizer = document.querySelector('.sound-visualizer');
        if (!visualizer) return;

        const bars = visualizer.querySelectorAll('.visualizer-bar');
        
        const animate = () => {
            if (this.analyzer) {
                this.analyzer.getByteFrequencyData(this.dataArray);
                
                bars.forEach((bar, index) => {
                    const value = this.dataArray[index * 2] || 0;
                    const height = (value / 255) * 100;
                    bar.style.height = Math.max(5, height) + 'px';
                });
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Inicialização do sistema de áudio
document.addEventListener('DOMContentLoaded', () => {
    const audioManager = new AudioManager();
    const soundFeedback = new SoundFeedback(audioManager);
    const audioVisualizer = new AudioVisualizer(audioManager);

    // Disponibilizar globalmente
    window.AudioSystem = {
        manager: audioManager,
        feedback: soundFeedback,
        visualizer: audioVisualizer,
        play: (sound) => audioManager.play(sound),
        toggle: () => audioManager.toggle(),
        setVolume: (vol) => audioManager.setVolume(vol)
    };

    console.log('🎵 Advanced Audio System Loaded!');
    console.log('Try: AudioSystem.play("success"), AudioSystem.toggle()');
});

// Adicionar controle de áudio na interface
function createAudioControls() {
    const controls = document.createElement('div');
    controls.style.cssText = `
        position: fixed;
        top: 100px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid var(--main-color);
        z-index: 10000;
        display: none;
        font-size: 12px;
        color: white;
    `;
    
    controls.innerHTML = `
        <div>🔊 Audio Controls</div>
        <button onclick="AudioSystem.toggle()" style="margin: 5px;">Toggle Audio</button>
        <input type="range" min="0" max="1" step="0.1" value="0.3" 
               onchange="AudioSystem.setVolume(this.value)" style="width: 100%;">
        <div style="margin-top: 10px;">
            <button onclick="AudioSystem.play('click')" style="margin: 2px;">Click</button>
            <button onclick="AudioSystem.play('success')" style="margin: 2px;">Success</button>
            <button onclick="AudioSystem.play('matrix')" style="margin: 2px;">Matrix</button>
        </div>
        <button onclick="this.parentElement.style.display='none'" style="margin-top: 10px;">Close</button>
    `;
    
    document.body.appendChild(controls);
    
    // Mostrar controles com Ctrl+M
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
        }
    });
}
