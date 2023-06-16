/**
 * ==================
 *     DOM TARGETS
 * ==================
 */

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

/**
 * ========================
 *     HELPER FUNCTIONS
 * ========================
 */

// Show input Error message
const showError = (input, message) => {
	// target parent using HTML event parentElement
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	// HTML event to change the text to the message
	small.innerText = message;
};

// Show input Success message
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
};

// Get field Name - Capitalize first letter of each input
const getFieldName = (input) => {
	return input.charAt(0).toUpperCase() + input.slice(1);
};

/**
 * ==============================
 *     FIELD VALIDITY CHECKS
 * ==============================
 */

// Check required fields
const checkRequired = (inputArray) => {
	inputArray.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input.id)} is required`);
		} else {
			showSuccess(input);
		}
	});
};

// Check if correct Length
const checkLength = (input, min, max) => {
	if (input.value.trim().length < min) {
		showError(
			input,
			`${getFieldName(input.id)} needs to be at least ${min} characters long`
		);
	} else if (input.value.trim().length > max) {
		showError(
			input,
			`${getFieldName(input.id)} cannot be more than ${max} characters long`
		);
	} else {
		showSuccess(input);
	}
};

// Check if email is valid
const checkEmail = (input) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!re.test(input.value.trim())) {
		showError(input, `Email is not a valid email`);
	} else {
		showSuccess(input);
	}
};

// Check if Passwords match
const checkPasswordsMatch = (input1, input2) => {
	input2.value.trim() !== input1.value.trim()
		? showError(input2, 'Passwords do not match')
		: showSuccess(input2);
};

/**
 * ===========================
 *     FORM EVENT LISTENER
 * ===========================
 */

form.addEventListener('submit', (e) => {
	e.preventDefault();
	// make multiple inputs into an array to avoid repeating code
	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});
