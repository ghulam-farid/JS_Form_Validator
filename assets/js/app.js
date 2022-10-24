const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const form = document.querySelector("#form");

function showError(input, message) {
  const form_control = input.parentElement;
  form_control.className = "form-control error";
  form_control.querySelector("small").textContent = message;
}

function showSuccess(input) {
  input.parentElement.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}
function checkPasswordsMatch(password1, password2) {
  if (password1.value != password2.value) {
    showError(password2, "Passwords do not match");
  } else if (password1.value.length == 0 && password2.value.length == 0) {
    showError(password2, "Password is required");
  } else {
    showSuccess(password2);
  }
}
function checkRequired(input_arr) {
  input_arr.forEach(function (input) {
    if (input.value.trim() == "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
  return input.previousElementSibling.textContent;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkEmail(email);
  checkLength(password, 6, 25);
  checkPasswordsMatch(password, password2);
});
