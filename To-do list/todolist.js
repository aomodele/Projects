function getDateString(){
  const options = {weekday: "long", day: "numeric", month: "long"};
  return new Date().toLocaleDateString(undefined, options);
}

function getGreeting(){
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning,";
  if (hour < 18) return "Good afternoon,";
  return "Good evening,";
}

function setDateText(selector){
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = getDateString();
  });
}

function setGreetingText(selector){
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = getGreeting();
  });
}

setGreetingText(".greetings h1");
setDateText(".date-text");

function typeText(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
const noteText = "Somewhere to keep your days 👌, no account needed, nothing to sync, just what you type in."
typeText(document.querySelector(".note"), noteText, 100);

const continueBtn = document.querySelector('footer button');
const welcomeScreen = document.getElementById('welcome-screen');
const organizeScreen = document.querySelector('.organize');
const workscreen = document.querySelector('.workscreen');
const personalscreen = document.querySelector('.personalscreen');
const errandscreen = document.querySelector('.errandscreen');
const healthscreen = document.querySelector('.healthscreen');

const screens = {
  organizeScreen,
  workscreen,
  personalscreen,
  errandscreen,
  healthscreen
};

function showScreen(screenToShow, targetName) {
  welcomeScreen.style.display = 'none';
  Object.values(screens).forEach(s => { s.style.display = 'none'; });
  screenToShow.style.display = 'grid';
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetName);
  });
}

//navigate to organize view
continueBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showScreen(organizeScreen, 'organizeScreen');
});

//navigate to home/welcome view
document.querySelectorAll('.home-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(welcomeScreen);
  });
});

//navigate to organize view
document.querySelectorAll('.backarrow').forEach(arrow => {
  arrow.addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(organizeScreen, 'organizeScreen');
  });
});

//navigate to work/personal/errand/health views (organize-screen boxes + every footer button)
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(screens[btn.dataset.target], btn.dataset.target);
  });
});

const themeToggles = document.querySelectorAll('.toggle input');
const themeLabels = document.querySelectorAll('.theme-label');
const root = document.documentElement;

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  themeToggles.forEach(t => { t.checked = theme === 'dark'; });
  themeLabels.forEach(label => { label.textContent = theme === 'dark' ? 'Dark' : 'Light'; });
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggles.forEach(toggle => {
  toggle.addEventListener('change', () => {
    const next = toggle.checked ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
});

// Load saved tasks from localStorage, or start with an empty array if none exist yet
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save the current tasks array to localStorage (converted to a string, since localStorage only stores strings)
function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Display tasks in their correct screen's list, rebuilding one row per task
function renderTasks(){
  document.querySelectorAll('main[data-category]').forEach(main => {
    const category = main.dataset.category;
    const list = main.querySelector('.task-list');
    const categoryTasks = tasks.filter(t => t.category === category);

    list.innerHTML = ''; // clear old content before redrawing

    categoryTasks.forEach(task => {
      const row = document.createElement('div');
      row.className = 'task-row';
      row.textContent = `${task.name} — ${task.date}`;
      list.appendChild(row);
    });
  });
}

const addBtns = document.querySelectorAll('.add-btn');       // all 4 add buttons
const addModals = document.querySelectorAll('.add-task-modal'); // all 4 modals, in matching order

// Clicking an add button opens its matching modal (same position in the page)
addBtns.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    addModals[i].classList.add('open');
  });
});

// Clicking a modal's "Cancel" button closes that same modal
document.querySelectorAll('.close-modal').forEach((closeBtn, i) => {
  closeBtn.addEventListener('click', () => {
    addModals[i].classList.remove('open');
  });
});

// Handle submitting any of the 4 forms
document.querySelectorAll('.add-task-form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the page from reloading on submit

    const main = form.closest('main[data-category]'); // find which screen this form belongs to
    const category = main.dataset.category;
    const name = form.querySelector('.task-name-input').value;
    const date = form.querySelector('.task-date-input').value;

    tasks.push({ name, date, category }); // add the new task to the shared array
    saveTasks();   // persist it to localStorage
    renderTasks(); // update what's shown on screen immediately

    form.closest('.add-task-modal').classList.remove('open'); // close the modal
    form.reset(); // clear the form fields for next time
  });
});

// Show any previously saved tasks as soon as the page loads
renderTasks();

const cancelclick =document.querySelector('.cancel-icon');
const signLoginContainer = document.querySelector('.sign-logincontainer');
const loginBtn = document.querySelector('.login-btn');
const loginFormBox = document.querySelector('.login-cont .form-container');
const signupFormBox = document.querySelector('.sign-cont .form-container');
const goToSignup = document.querySelector('.go-to-signup');
const goToSignin = document.querySelector('#s-form-link');

// Open the login/signup screen when "Login" is clicked on the welcome screen
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signLoginContainer.style.display = 'flex';
  loginFormBox.style.display = 'grid';
  signupFormBox.style.display = 'none';
});

// Switch from login form to signup form
goToSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginFormBox.style.display = 'none';
  signupFormBox.style.display = 'grid';
});

// Switch from signup form back to login form
goToSignin.addEventListener('click', (e) => {
  e.preventDefault();
  signupFormBox.style.display = 'none';
  loginFormBox.style.display = 'grid';
});

document.querySelectorAll('.cancel-icon').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    signLoginContainer.style.display = 'none';
  });
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



// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
//   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// // Sign in (login-view)
// const loginForm = document.querySelector('.login-view .form-box');
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const email = loginForm.querySelector('input[type="email"]').value;
//   const password = loginForm.querySelector('input[type="password"]').value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then(() => {
//       console.log('Logged in!');
//       // next: navigate to the to-do app's welcome/organize screen
//     })
//     .catch(err => {
//       alert(err.message); // swap for a styled error message later
//     });
// });

// // Sign up (signin-view)
// const signupForm = document.querySelector('.signin-view .form-box');
// signupForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const email = signupForm.querySelector('input[type="email"]').value;
//   const password = signupForm.querySelector('input[type="password"]').value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(() => {
//       console.log('Account created!');
//       // next: navigate to the to-do app's welcome/organize screen
//     })
//     .catch(err => {
//       alert(err.message);
//     });
// });