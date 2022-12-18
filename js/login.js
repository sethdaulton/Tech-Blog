const loginFormHandler = async (event) => {
  // TODO: Add a comment describing the functionality of this statement
  // Prevents default action
  event.preventDefault();

  // TODO: Add a comment describing the functionality of these expressions
  // Stores the entered password and login info. Grabbing values from inside inputs
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // TODO: Add a comment describing the functionality of this expression
    // Fetches the login information and stores it. Sending inputs on log in routes
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
      // Goes back to the homepage
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
