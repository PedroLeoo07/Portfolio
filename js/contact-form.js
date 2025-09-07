// Sistema de Envio de Email - Portfolio Leonardo Oliveira

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.btnText = document.querySelector('.btn-text');
        this.btnLoader = document.querySelector('.btn-loader');
        this.formStatus = document.getElementById('form-status');
        
        // Configuração do EmailJS
        this.emailjsConfig = {
            serviceID: 'service_portfolio', // Será configurado
            templateID: 'template_contact', // Será configurado
            publicKey: 'YOUR_PUBLIC_KEY'   // Será configurado
        };
        
        this.init();
    }
    
    init() {
        // Inicializar EmailJS
        emailjs.init(this.emailjsConfig.publicKey);
        
        // Event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validação em tempo real
        this.setupRealTimeValidation();
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setLoadingState(true);
        
        try {
            // Coletar dados do formulário
            const formData = new FormData(this.form);
            const templateParams = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                phone: formData.get('phone') || 'Não informado',
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_name: 'Leonardo Oliveira',
                reply_to: formData.get('from_email')
            };
            
            // Enviar email usando EmailJS
            const response = await emailjs.send(
                this.emailjsConfig.serviceID,
                this.emailjsConfig.templateID,
                templateParams
            );
            
            console.log('Email enviado com sucesso:', response);
            this.showSuccessMessage();
            this.resetForm();
            
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            this.showErrorMessage(error);
        } finally {
            this.setLoadingState(false);
        }
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'Este campo é obrigatório');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });
        
        // Validar email
        const emailField = this.form.querySelector('[name="from_email"]');
        if (emailField.value && !this.isValidEmail(emailField.value)) {
            this.showFieldError(emailField, 'Email inválido');
            isValid = false;
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFieldError(field, message) {
        const inputField = field.closest('.input-field') || field.closest('.textarea-field');
        inputField.classList.add('error');
        
        // Remover mensagem de erro anterior
        const existingError = inputField.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Adicionar nova mensagem de erro
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        inputField.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        const inputField = field.closest('.input-field') || field.closest('.textarea-field');
        inputField.classList.remove('error');
        
        const errorMessage = inputField.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    this.showFieldError(input, 'Este campo é obrigatório');
                } else if (input.name === 'from_email' && input.value && !this.isValidEmail(input.value)) {
                    this.showFieldError(input, 'Email inválido');
                } else {
                    this.clearFieldError(input);
                }
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.clearFieldError(input);
                }
            });
        });
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.btnText.style.display = 'none';
            this.btnLoader.style.display = 'inline-block';
            this.submitBtn.classList.add('loading');
        } else {
            this.submitBtn.disabled = false;
            this.btnText.style.display = 'inline-block';
            this.btnLoader.style.display = 'none';
            this.submitBtn.classList.remove('loading');
        }
    }
    
    showSuccessMessage() {
        this.formStatus.innerHTML = `
            <div class="status-message success">
                <i class='bx bx-check-circle'></i>
                <span>Mensagem enviada com sucesso! Entrarei em contato em breve.</span>
            </div>
        `;
        
        setTimeout(() => {
            this.formStatus.innerHTML = '';
        }, 5000);
    }
    
    showErrorMessage(error) {
        let errorMessage = 'Erro ao enviar mensagem. Tente novamente.';
        
        if (error.text) {
            errorMessage = `Erro: ${error.text}`;
        }
        
        this.formStatus.innerHTML = `
            <div class="status-message error">
                <i class='bx bx-error-circle'></i>
                <span>${errorMessage}</span>
            </div>
        `;
        
        setTimeout(() => {
            this.formStatus.innerHTML = '';
        }, 7000);
    }
    
    resetForm() {
        this.form.reset();
        
        // Limpar todos os erros
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
        
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }
}

// Configuração alternativa usando Formspree (caso o EmailJS não funcione)
class FormspreeContact {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        
        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showSuccessMessage();
                this.form.reset();
            } else {
                throw new Error('Erro no envio');
            }
        } catch (error) {
            this.showErrorMessage();
        }
    }
    
    showSuccessMessage() {
        const status = document.getElementById('form-status');
        status.innerHTML = `
            <div class="status-message success">
                <i class='bx bx-check-circle'></i>
                <span>Mensagem enviada com sucesso!</span>
            </div>
        `;
    }
    
    showErrorMessage() {
        const status = document.getElementById('form-status');
        status.innerHTML = `
            <div class="status-message error">
                <i class='bx bx-error-circle'></i>
                <span>Erro ao enviar. Tente novamente.</span>
            </div>
        `;
    }
}

// Inicializar o sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Tentar usar EmailJS primeiro, depois Formspree se necessário
    if (typeof emailjs !== 'undefined') {
        new ContactForm();
    } else {
        console.log('EmailJS não disponível, usando método alternativo');
        // Implementar método alternativo ou mostrar instruções
        new FormspreeContact();
    }
});

// Instruções de configuração (apenas para desenvolvimento)
console.log(`
🔧 CONFIGURAÇÃO DO FORMULÁRIO DE CONTATO:

Para EmailJS:
1. Crie uma conta em https://emailjs.com
2. Configure um serviço de email
3. Crie um template de email
4. Substitua as configurações no código:
   - serviceID: 'seu_service_id'
   - templateID: 'seu_template_id'  
   - publicKey: 'sua_public_key'

Para Formspree (alternativa):
1. Crie uma conta em https://formspree.io
2. Crie um novo formulário
3. Substitua 'YOUR_FORM_ID' pelo ID do seu formulário

📧 Template sugerido para EmailJS:
- Nome: {{from_name}}
- Email: {{from_email}}
- Telefone: {{phone}}
- Assunto: {{subject}}
- Mensagem: {{message}}
`);
