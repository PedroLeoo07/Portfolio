// Portfolio App Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(tabName) {
        // Remove active class from all tabs and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Tab click handlers
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            showTab(tabName);
        });
    });

    // Demo launch button
    const launchBtn = document.getElementById('launchApp');
    if (launchBtn) {
        launchBtn.addEventListener('click', function() {
            // Aqui você pode abrir seu app no Expo ou uma URL específica
            // Exemplo: window.open('https://snack.expo.dev/@seuusuario/seuapp', '_blank');
            
            // Por enquanto, vou mostrar um modal ou redirecionar
            const appUrl = 'https://expo.dev/@seuusuario/seuapp'; // Substitua pela URL real
            
            // Criar modal para mostrar opções
            showAppModal();
        });
    }

    // Expo button
    const expoBtn = document.getElementById('openExpoBtn');
    if (expoBtn) {
        expoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Substitua pela URL real do seu app no Expo
            const expoUrl = 'https://expo.dev/@seuusuario/seuapp';
            window.open(expoUrl, '_blank');
        });
    }

    // GitHub repository button
    const githubBtn = document.getElementById('githubRepoBtn');
    if (githubBtn) {
        githubBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Substitua pela URL real do seu repositório
            const githubUrl = 'https://github.com/PedroLeoo07/seu-app-react-native';
            window.open(githubUrl, '_blank');
        });
    }

    // Video play button
    const videoPlayBtn = document.getElementById('playVideoBtn');
    const videoElement = document.getElementById('appVideo');
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlayBtn && videoElement) {
        videoPlayBtn.addEventListener('click', function() {
            videoPlaceholder.style.display = 'none';
            videoElement.style.display = 'block';
            videoElement.play();
        });
    }

    // Function to show app modal with download options
    function showAppModal() {
        const modal = document.createElement('div');
        modal.className = 'app-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Ver Meu App React Native</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Escolha como você gostaria de ver o aplicativo:</p>
                    <div class="modal-options">
                        <button class="modal-option" data-option="expo">
                            <i class='bx bxl-expo'></i>
                            <span>Abrir no Expo</span>
                            <small>Para desenvolvedores</small>
                        </button>
                        <button class="modal-option" data-option="web">
                            <i class='bx bx-world'></i>
                            <span>Versão Web</span>
                            <small>Funciona no navegador</small>
                        </button>
                        <button class="modal-option" data-option="apk">
                            <i class='bx bx-download'></i>
                            <span>Download APK</span>
                            <small>Para Android</small>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Modal close functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Modal option clicks
        const options = modal.querySelectorAll('.modal-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const optionType = option.getAttribute('data-option');
                handleAppOption(optionType);
                document.body.removeChild(modal);
            });
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    function handleAppOption(option) {
        switch(option) {
            case 'expo':
                // URL do Expo Snack ou app publicado
                window.open('https://expo.dev/@seuusuario/seuapp', '_blank');
                break;
            case 'web':
                // Se você tem uma versão web do app
                window.open('https://seuapp.netlify.app', '_blank');
                break;
            case 'apk':
                // Link para download do APK
                window.open('https://github.com/PedroLeoo07/seuapp/releases/latest/download/app.apk', '_blank');
                break;
        }
    }

    // Add scroll animations for app elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe app elements for animation
    document.querySelectorAll('.phone-mockup, .screenshot-item, .video-container').forEach(el => {
        appObserver.observe(el);
    });
});