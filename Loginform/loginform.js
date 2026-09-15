document.addEventListener("DOMContentLoaded", () => {

  // --- Sign in / Sign up toggle ---
  const login = document.querySelector('.container');
  const signInContainer = document.querySelector('.s-container');
  const signupLink = document.querySelector('.go-to-signup');    // "Sign up" link, inside .container
  const signinLink = document.querySelector('.s-form-link');   // "Sign in" link, inside .s-container

  // Clicking "Sign up" hides the login form, shows the sign-up form
  signupLink.addEventListener('click', (e) => {
    e.preventDefault(); // Stops the link from jumping to "#" at the top of the page
    login.style.display = 'none';
    signInContainer.style.display = 'flex';
    // "flex" because .s-container uses display:flex in your CSS — match whatever value it normally has
  });

  // Clicking "Sign in" does the reverse
  signinLink.addEventListener('click', (e) => {
    e.preventDefault();
    signInContainer.style.display = 'none';
    login.style.display = 'flex';
  });

  // --- Social login buttons (test only) ---
  // Select all buttons that have the "form-btn--social" class (Google, Apple, Facebook)
  const socialButtons = document.querySelectorAll(".form-btn--social");

  // Loop through each button found and attach a click listener to it
  socialButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      // Stops the button from submitting the form or reloading the page (default button behavior inside a <form>)

      // Find the <img> inside this specific button, so we know which one was clicked
      const icon = button.querySelector("img");

      // Read the icon's file name (src) to figure out which provider it is
      const iconSrc = icon.getAttribute("src").toLowerCase();

      let provider = "Unknown";

      if (iconSrc.includes("google")) {
        provider = "Google";
      } else if (iconSrc.includes("apple")) {
        provider = "Apple";
      } else if (iconSrc.includes("facebook")) {
        provider = "Facebook";
      }

      // For now, just confirm the click is working, replace later with real sign-in logic
      console.log(`${provider} button clicked`);
      alert(`Thank you for testing the ${provider} button! (This is just a test, no real login yet.) #lizdev`);
    });
  });

});