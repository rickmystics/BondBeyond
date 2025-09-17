document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // In a real application, you would send a request to a backend API
        // to authenticate the user's credentials.

        const username = document.getElementById('alumni-username').value;
        const password = document.getElementById('alumni-password').value;

        // For this frontend-only example, we'll simulate a successful login.
        // In a real scenario, you'd check a response from the server.
        if (username && password) {
            // Redirect to the alumni list page upon successful login
            window.location.href = 'alumni_list.html';
        } else {
            // Handle login failure (e.g., show an error message)
            alert('Please enter your username and password.');
        }
    });
});