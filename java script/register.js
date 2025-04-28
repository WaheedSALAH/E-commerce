// Get the form and input fields

const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Get error message elements
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Function to validate username
function validateUsername() {
    if (username.value.trim() === '') {
        usernameError.textContent = 'Username is required';
        username.style.border = "solid red";
        return false;
    } else {
        usernameError.textContent = '';
        username.style.border = "solid green";
        return true;
    }
}

// Function to validate email
function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        email.style.border = "solid red";
        return false;
    } else {
        emailError.textContent = '';
        email.style.border = "solid green";
        return true;
    }
}

// Function to validate password
function validatePassword() {
     if (password.value.length < 8 && password.value.length != 0) {
       passwordError.textContent = 'Password must be at least 8 characters';
       password.style.border = "solid red";
       return false;

      } 
      
      else if (password.value == ""){
        password.style.border = "solid red";
        
    }



    else {
        passwordError.textContent = '';
        password.style.border = "solid green";
        return true;
    }
}

// Function to validate confirm password
function validateConfirmPassword() {
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPassword.style.border = "solid red";
        return false;
        
    } 
    else if (confirmPassword.value == ""){
        confirmPassword.style.border = "solid red";
        
    }
    else {
        confirmPasswordError.textContent = '';
        confirmPassword.style.border = "solid green";
        return true;
    }
}

// Add blur event listeners for real-time validation
username.addEventListener('blur', validateUsername);
email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);
confirmPassword.addEventListener('blur', validateConfirmPassword);

// Validate the form on submit
// Submit event for form
form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        const userData = {
            username: username.value,
            email: email.value,
            password: password.value,
            banned: false,
            role: "customer"
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                form.reset();
                location.href = '../html/login.html';
            } else {
                if (result.error === 'Email already registered. Please use another email.') {
                    emailError.textContent = result.error;
                    email.style.border = "solid red";
                } else {
                    alert(result.error);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while registering.');
        }
    }
});



