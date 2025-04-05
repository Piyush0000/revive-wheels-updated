// ✅ Add Firebase CDN scripts to your HTML <head> (if not done yet)
/*
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>
*/

document.addEventListener("DOMContentLoaded", function () {
  // ✅ Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyDWiynfwK5dGp_UXV8WCRFt8fKqA84apEs",
    authDomain: "revive-wheels-df9dd.firebaseapp.com",
    projectId: "revive-wheels-df9dd",
    storageBucket: "revive-wheels-df9dd.appspot.com",
    messagingSenderId: "300055579774",
    appId: "1:300055579774:web:c3758ca9f2e09ebbe31c2f",
    measurementId: "G-Z1WWMP6WQY",
  };

  // ✅ Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // 🔥 Sign up function
  async function signUp(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  // 👇 Your existing code
  const form = document.getElementById("signupForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const successMessage = document.getElementById("successMessage");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  const submitButton = document.getElementById("submitButton");

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    password.type = password.type === "password" ? "text" : "password";
    togglePassword.textContent = password.type === "password" ? "Show" : "Hide";
  });

  toggleConfirmPassword.addEventListener("click", function () {
    confirmPassword.type =
      confirmPassword.type === "password" ? "text" : "password";
    toggleConfirmPassword.textContent =
      confirmPassword.type === "password" ? "Show" : "Hide";
  });

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";
    successMessage.style.display = "none";
    successMessage.style.color = "";

    // Validate name
    if (fullName.value.trim() === "") {
      nameError.style.display = "block";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailError.style.display = "block";
      isValid = false;
    }

    // Validate password
    if (password.value.length < 8) {
      passwordError.style.display = "block";
      isValid = false;
    }

    // Validate confirm password
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      try {
        submitButton.disabled = true;
        submitButton.textContent = "Creating Account...";

        const userCredential = await signUp(email.value.trim(), password.value);

        successMessage.textContent = `Welcome to Revive Wheels, ${fullName.value.trim()}!`;
        successMessage.style.display = "block";
        form.reset();

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 3000);
      } catch (error) {
        console.error("Signup error:", error);

        if (error.code === "auth/email-already-in-use") {
          emailError.textContent = "This email is already registered";
          emailError.style.display = "block";
        } else if (error.code === "auth/weak-password") {
          passwordError.textContent =
            "Password should be at least 6 characters";
          passwordError.style.display = "block";
        } else {
          successMessage.textContent = `Error: ${error.message}`;
          successMessage.style.color = "#ff4444";
          successMessage.style.display = "block";
        }
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Create Account";
      }
    }
  });

  // Real-time validation
  fullName.addEventListener("input", () => {
    if (fullName.value.trim() !== "") nameError.style.display = "none";
  });

  email.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())) emailError.style.display = "none";
  });

  password.addEventListener("input", () => {
    if (password.value.length >= 8) passwordError.style.display = "none";
    if (
      password.value === confirmPassword.value &&
      confirmPassword.value !== ""
    )
      confirmPasswordError.style.display = "none";
  });

  confirmPassword.addEventListener("input", () => {
    if (password.value === confirmPassword.value)
      confirmPasswordError.style.display = "none";
  });
});
