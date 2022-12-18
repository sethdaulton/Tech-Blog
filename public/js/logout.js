const logout = async () => {
  // TODO: Add a comment describing the functionality of this expression
  // Fetches the logout status on the page. Making call to server to log out
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // TODO: Add a comment describing the functionality of this statement
    // Replaces something with login status. Back to the login page
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

// Adding the listener
document.querySelector('#logout').addEventListener('click', logout);
