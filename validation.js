
const patterns = {
    name: /^[a-zA-Z\s]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]{10,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
};

export function validateField(fieldId, pattern = null, isRequired = true) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    const value = field.value.trim();
    
    if (isRequired && !value) {
        errorElement.textContent = 'This field is required';
        errorElement.style.display = 'block';
        return false;
    }
    
    if (value && pattern && !pattern.test(value)) {
        errorElement.style.display = 'block';
        return false;
    }
    
    errorElement.style.display = 'none';
    return true;
}


export function validateRegistrationForm() {
    let isValid = true;
    
    if (!validateField('name', patterns.name)) isValid = false;
    if (!validateField('dob', null)) isValid = false;
    if (!validateField('phone', patterns.phone)) isValid = false;
    if (!validateField('email', patterns.email)) isValid = false;
        if (!validateField('phone', patterns.phone)) isValid = false;
        if (!validateField('email', patterns.email)) isValid = false;
    
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (!patterns.password.test(password.value)) {
        passwordError.textContent = 'Password must be at least 8 characters with letters and numbers';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordError.style.display = 'none';
    }
    
    return isValid;
}

export function validateLoginForm() {
    let isValid = true;
    
    if (!validateField('login-email', patterns.email)) isValid = false;
    if (!validateField('login-password', null)) isValid = false;
    
    return isValid;
}

export function addRealTimeValidation() {
    const registrationForm = document.getElementById('registration-form');
    if (!registrationForm) return;
    
    const inputs = registrationForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.id === 'name') validateField('name', patterns.name);
            else if (this.id === 'email') validateField('email', patterns.email);
            else if (this.id === 'phone') validateField('phone', patterns.phone);
            else if (this.id === 'password') validateField('password', patterns.password);
            else if (this.id === 'confirm-password') {
                const password = document.getElementById('password').value;
                const confirmPassword = this.value;
                const errorElement = document.getElementById('confirm-password-error');
                
                if (password !== confirmPassword) {
                    errorElement.textContent = 'Passwords do not match';
                    errorElement.style.display = 'block';
                } else {
                    errorElement.style.display = 'none';
                }
            }
            else if (this.hasAttribute('required')) validateField(this.id);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addRealTimeValidation();
});