const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Check if email is valid
const isValidEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email.value).toLowerCase());
};

// Show input Error message
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	// change the text to the message
	small.innerText = message;
};

// Show input Success message
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
};

// Form event listener
form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (username.value === '') {
		showError(username, 'Username is required');
	} else {
		showSuccess(username);
	}
	if (email.value === '') {
		showError(email, 'Email is required');
	} else if (!isValidEmail(email)) {
		showError(email, 'Please enter a valid email address');
	} else {
		showSuccess(email);
	}
	if (password.value === '') {
		showError(password, 'Password is required');
	} else {
		showSuccess(password);
	}
	if (password2.value === '') {
		showError(password2, 'Please confirm password');
	} else if (password2.value !== password.value) {
		showError(password2, 'Passwords must match');
	} else {
		showSuccess(password2);
	}
});
