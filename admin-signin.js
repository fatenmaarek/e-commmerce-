

const currentAdmin = getCurrentAdmin();

if (currentAdmin) {
    window.location.href = 'admin-dashboard.html';
}

function handleRegistration() {
    const emailInput = document.getElementById('registrationEmail');
    const passwordInput = document.getElementById('registrationPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    clearErrors();

    if (!emailInput.value) {
        displayError(emailInput, 'Please enter your email');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        displayError(emailInput, 'Invalid email format');
        return;
    }

    if (!passwordInput.value) {
        displayError(passwordInput, 'Please enter a password');
        return;
    }

    if (!confirmPasswordInput.value) {
        displayError(confirmPasswordInput, 'Please confirm your password');
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        displayError(confirmPasswordInput, 'Passwords do not match');
        return;
    }

    const admin = {
        email: emailInput.value,
        password: passwordInput.value
    };

    addAdminToStorage(admin);


    clearForm([emailInput, passwordInput, confirmPasswordInput]);
}

document.getElementById('signupButton').addEventListener('click', handleRegistration);

function handleLogin() {
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');

    clearErrors();

    if (!loginEmailInput.value) {
        displayError(loginEmailInput, 'Please enter your email');
        return;
    }

    if (!loginPasswordInput.value) {
        displayError(loginPasswordInput, 'Please enter your password');
        return;
    }

    const matchedAdmin = authenticateAdmin(loginEmailInput.value, loginPasswordInput.value);


    if (matchedAdmin) {
        setCurrentAdmin(matchedAdmin);

        window.location.href = 'admin-dashboard.html';
    } else {
        displayError(loginEmailInput, 'Invalid email or password');
    }
}

document.getElementById('loginButton').addEventListener('click', handleLogin);

 function authenticateAdmin(email, password) {
    const admins = getAdminsFromStorage();

    return admins.find(admin => admin.email === email && admin.password === password);
}

function getCurrentAdmin() {
    const storedAdmin = sessionStorage.getItem('currentAdmin');
    return storedAdmin ? JSON.parse(storedAdmin) : null;
}

function setCurrentAdmin(admin) {
    sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
}

function getAdminsFromStorage() {
    const storedAdmins = localStorage.getItem('admins');
    return storedAdmins ? JSON.parse(storedAdmins) : [];
}

function addAdminToStorage(admin) {
    const admins = getAdminsFromStorage();
    const emailInput = document.getElementById('registrationEmail');

    const emailExists = admins.some(existingAdmin => existingAdmin.email === admin.email);

    if (!emailExists) {
        admins.push(admin);

        localStorage.setItem('admins', JSON.stringify(admins));
        alert('Registration successful! You can now log in.');
    } else {
        displayError(emailInput, 'Email already in use');
    }
}

function displayError(input, message) {
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error';
    errorSpan.textContent = message;
    errorSpan.style.color = 'red';

    input.parentNode.insertBefore(errorSpan, input.nextSibling);
}

function clearErrors() {
    const errorSpans = document.querySelectorAll('.error');
    errorSpans.forEach(span => span.remove());
}

function clearForm(inputs) {
    inputs.forEach(input => (input.value = ''));
}

