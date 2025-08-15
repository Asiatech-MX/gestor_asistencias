/*document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM cargado - Validación login activa");

    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');

    // Mostrar error
    const showError = (input, message) => {
        const group = input.parentElement;
        const errorSpan = group.querySelector('.error-message');
        input.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    };

    // Limpiar error
    const clearError = (input) => {
        const group = input.parentElement;
        const errorSpan = group.querySelector('.error-message');
        input.classList.remove('error');
        errorSpan.textContent = '';
        errorSpan.style.display = 'none';
    };

    // Validación en tiempo real
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                clearError(input);
            }
        });
    });

    // Toggle contraseña
    togglePassword.addEventListener('click', function () {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Validación al enviar formulario
    form.addEventListener('submit', function (e) {
        let isValid = true;

        if (!emailInput.value.trim()) {
            showError(emailInput, 'El correo es obligatorio');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            showError(emailInput, 'Correo no válido');
            isValid = false;
        }

        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'La contraseña es obligatoria');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });
});*/
