/**
 * Target DOM Elements
 */
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

/**
 *  Helper Functions
 */

// show error status
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
};

// show success status
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
};

// get field name
const getFieldName = (input) => {
	return input.charAt(0).toUpperCase() + input.slice(1);
};

/**
 *  Field Checks for Validity
 */

// check if input fields are populated

const checkRequired = (inputArr) => {
	inputArr.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input.id)} is required.`);
		} else {
			showSuccess(input);
		}
	});
};

// check if field is correct length
const checkLength = (input, min, max) => {
	if (input.value.trim().length < min) {
		showError(
			input,
			`${getFieldName(input.id)} needs to be at least ${min} characters`
		);
	} else if (input.value.trim().length > max) {
		showError(
			input,
			`${getFieldName(input.id)} has a limit of ${max} characters`
		);
	} else {
		showSuccess(input);
	}
};

// check if email is valid
const checkEmail = (input) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!re.test(input.value.trim())) {
		showError(input, 'Please enter a valid email');
	} else {
		showSuccess(input);
	}
};

// check if both password fields match
const checkPasswordMatch = (input1, input2) => {
	if (input2.value.trim() !== input1.value.trim()) {
		showError(input2, 'Passwords need to match');
	} else {
		showSuccess(input2);
	}
};
/**
 *   Event listener on the form
 */

form.addEventListener('submit', (e) => {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 8, 25);
	checkEmail(email);
	checkPasswordMatch(password, password2);
});
