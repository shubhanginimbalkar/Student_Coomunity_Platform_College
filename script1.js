// Handle login form submission
function login(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email, password, and role
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!password) {
        alert('Please enter your password.');
        return;
    }

    if (!role) {
        alert('Please select your role.');
        return;
    }

    // Assuming we are doing the login and role validation in the backend
    // Now, we will redirect based on the selected role
    if (role === 'student') {
       // alert('Login successful! Redirecting to Student Dashboard...');
        window.location.href = 'index.html'; // Redirect to student dashboard
    } else if (role === 'admin') {
       // alert('Login successful! Redirecting to Admin Panel...');
        window.location.href = 'rsvp_index.html'; // Redirect to admin panel
    }
}

// Update the form based on the selected role (student or admin)
function updateForm() {
    const role = document.getElementById('role').value;
    const actionsDiv = document.getElementById('actions');
    const formTitle = document.getElementById('form-title');

    if (role === 'student') {
        formTitle.innerText = 'Student Login';
        actionsDiv.innerHTML = `
            <button type="submit">Login</button>
            <div class="links">
                <a href="signup.html">Sign Up</a>
            </div>
        `;
    } else if (role === 'admin') {
        formTitle.innerText = 'Admin Login';
        actionsDiv.innerHTML = `
            <button type="submit">Login</button>
            <div class="links">
                <a href="signup.html">Sign Up</a>
                <a href="forgot-password.html">Forgot Password?</a>
            </div>
        `;
    } else {
        formTitle.innerText = 'Login';
        actionsDiv.innerHTML = `
            <button type="submit">Login</button>
            <div class="links">
                <a href="signup.html">Sign Up</a>
            </div>
        `;
    }
}
