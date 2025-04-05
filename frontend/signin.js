document.addEventListener("DOMContentLoaded", function () {
  const signinForm = document.getElementById("signinForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");
  const emailField = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const successMessage = document.getElementById("successMessage");

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    this.textContent = type === "password" ? "Show" : "Hide";
  });

  // Form validation
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Email validation
    if (!emailField.value || !emailField.value.includes("@")) {
      emailError.style.display = "block";
      isValid = false;
    } else {
      emailError.style.display = "none";
    }

    // Password validation
    if (!passwordField.value) {
      passwordError.style.display = "block";
      isValid = false;
    } else {
      passwordError.style.display = "none";
    }

    // If valid, show success message
    if (isValid) {
      successMessage.style.display = "block";
      signinForm.reset();

      // Simulate redirection after 2 seconds
      setTimeout(function () {
        successMessage.style.display = "none";
        alert("Redirecting to dashboard...");
      }, 2000);
    }
  });
});
