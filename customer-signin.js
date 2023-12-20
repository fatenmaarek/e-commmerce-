

const currentCustomer = getCurrentCustomer();

if (currentCustomer) {
    window.location.href = 'customer-dashboard.html';
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

    const customer = {
        email: emailInput.value,
        password: passwordInput.value
    };

    addCustomerToStorage(customer);

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

    const matchedCustomer = authenticateCustomer(loginEmailInput.value, loginPasswordInput.value);


    if (matchedCustomer) {
        setCurrentCustomer(matchedCustomer);

        window.location.href = 'customer-dashboard.html';
    } else {
        displayError(loginEmailInput, 'Invalid email or password');
    }
}

document.getElementById('loginButton').addEventListener('click', handleLogin);

 function authenticateCustomer(email, password) {
    const customers = getCustomersFromStorage();

    return customers.find(customer => customer.email === email && customer.password === password);
}

function getCurrentCustomer() {
    const storedCustomer = sessionStorage.getItem('currentCustomer');
    return storedCustomer ? JSON.parse(storedCustomer) : null;
}

function setCurrentCustomer(customer) {
    sessionStorage.setItem('currentCustomer', JSON.stringify(customer));
}

function getCustomersFromStorage() {
    const storedCustomers = localStorage.getItem('customers');
    return storedCustomers ? JSON.parse(storedCustomers) : [];
}

function addCustomerToStorage(customer) {
    const customers = getCustomersFromStorage();
    const emailInput = document.getElementById('registrationEmail');

    const emailExists = customers.some(existingCustomer => existingCustomer.email === customer.email);

    if (!emailExists) {
        customers.push(customer);

        localStorage.setItem('customers', JSON.stringify(customers));
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

