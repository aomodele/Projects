/* =====================================================
   todolist.js  -  app logic (no Firebase code in here)
   Sections:
   1. Date and greeting
   2. Typing effect on the welcome note
   3. Screen navigation
   4. Light / dark theme
   5. Tasks (saved in localStorage for now)
   6. Login / sign up overlay (open, switch, close)
   ===================================================== */


/* ---------- 1. Date and greeting ---------- */

function getDateString() {
  const options = { weekday: "long", day: "numeric", month: "long" };
  return new Date().toLocaleDateString(undefined, options);
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning,";
  if (hour < 18) return "Good afternoon,";
  return "Good evening,";
}

function setDateText(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = getDateString();
  });
}

function setGreetingText(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = getGreeting();
  });
}

setGreetingText(".greetings h1");
setDateText(".date-text");


/* ---------- 2. Typing effect on the welcome note ---------- */

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

const noteText = "Somewhere to keep your days 👌, no account needed, nothing to sync, just what you type in.";
typeText(document.querySelector(".note"), noteText, 100);


/* ---------- 3. Screen navigation ---------- */

const continueBtn = document.querySelector('.continue-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const organizeScreen = document.querySelector('.organize');
const workscreen = document.querySelector('.workscreen');
const personalscreen = document.querySelector('.personalscreen');
const errandscreen = document.querySelector('.errandscreen');
const healthscreen = document.querySelector('.healthscreen');

// Every screen except welcome, so showScreen can look one up by name
const screens = {
  organizeScreen,
  workscreen,
  personalscreen,
  errandscreen,
  healthscreen
};

// Show one screen, hide the rest, and highlight the matching nav buttons
function showScreen(screenToShow, targetName) {
  welcomeScreen.style.display = 'none';
  Object.values(screens).forEach(s => { s.style.display = 'none'; });
  screenToShow.style.display = 'grid';

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetName);
  });
}

// Continue button: welcome -> organize
continueBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showScreen(organizeScreen, 'organizeScreen');
});

// Home buttons: any screen -> welcome
document.querySelectorAll('.home-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(welcomeScreen);
  });
});

// Back arrows: any screen -> organize
document.querySelectorAll('.backarrow').forEach(arrow => {
  arrow.addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(organizeScreen, 'organizeScreen');
  });
});

// Organize boxes and footer buttons: go to the screen named in data-target
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(screens[btn.dataset.target], btn.dataset.target);
  });
});


/* ---------- 4. Light / dark theme ---------- */

const themeToggles = document.querySelectorAll('.toggle input');
const themeLabels = document.querySelectorAll('.theme-label');
const root = document.documentElement;

// Set the theme and keep every toggle and label in sync
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggles.forEach(t => { t.checked = theme === 'dark'; });
  themeLabels.forEach(label => { label.textContent = theme === 'dark' ? 'Dark' : 'Light'; });
}

applyTheme(localStorage.getItem('theme') || 'light');

themeToggles.forEach(toggle => {
  toggle.addEventListener('change', () => {
    const next = toggle.checked ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
});


/* ---------- 5. Tasks (localStorage for now) ---------- */

// Load saved tasks, or start with an empty list
/* ---------- 5. Tasks (localStorage for now) ---------- */

const addBtns = document.querySelectorAll('.add-btn');
const addModals = document.querySelectorAll('.add-task-modal');

// Load saved tasks, or start with an empty list
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Which task is being edited, or null when adding a new one
let editingId = null;

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Give tasks saved before ids existed an id, then save once
let needsSave = false;
tasks.forEach(t => {
  if (!t.id) {
    t.id = newId();
    needsSave = true;
  }
});
if (needsSave) saveTasks();

// Redraw every screen's list, one card per task
function renderTasks() {
  document.querySelectorAll('main[data-category]').forEach(main => {
    const category = main.dataset.category;
    const list = main.querySelector('.task-list');
    const categoryTasks = tasks.filter(t => t.category === category);

    list.innerHTML = '';

    categoryTasks.forEach(task => {
      const row = document.createElement('div');
      row.className = 'task-row';
      row.innerHTML = `
        <div class="task-info">
          <p class="task-name"></p>
          <p class="task-meta"></p>
        </div>
        <button type="button" class="task-arrow-btn" aria-label="Edit task">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 6 15 12 9 18"></polyline>
          </svg>
        </button>
      `;
      row.querySelector('.task-name').textContent = task.name;
      row.querySelector('.task-meta').textContent = task.date;
      row.querySelector('.task-arrow-btn').addEventListener('click', () => {
        openEdit(main, task);
      });

      list.appendChild(row);
    });
  });
}

// Open the modal empty, ready to add
function openAdd(modal) {
  editingId = null;
  modal.querySelector('.task-submit-btn').textContent = 'Add Task';
  modal.classList.add('open');
}

// Open the modal filled with an existing task
function openEdit(main, task) {
  editingId = task.id;
  const modal = main.querySelector('.add-task-modal');
  modal.querySelector('.task-name-input').value = task.name;
  modal.querySelector('.task-date-input').value = task.date;
  modal.querySelector('.task-submit-btn').textContent = 'Save changes';
  modal.classList.add('open');
}

// Close the modal and clear anything typed in it
function closeModal(modal) {
  editingId = null;
  modal.querySelector('form').reset();
  modal.classList.remove('open');
}

// Add buttons open their own modal (same position in the page)
addBtns.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openAdd(addModals[i]);
  });
});

// Cancel buttons close their own modal
document.querySelectorAll('.close-modal').forEach((closeBtn, i) => {
  closeBtn.addEventListener('click', () => {
    closeModal(addModals[i]);
  });
});

// Submit adds a new task, or saves changes to the one being edited
document.querySelectorAll('.add-task-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const modal = form.closest('.add-task-modal');
    const main = form.closest('main[data-category]');
    const name = form.querySelector('.task-name-input').value.trim();
    const date = form.querySelector('.task-date-input').value;

    if (!name) return; // ignore names that are only spaces

    if (editingId !== null) {
      const task = tasks.find(t => t.id === editingId);
      if (task) {
        task.name = name;
        task.date = date;
      }
    } else {
      tasks.push({ id: newId(), name, date, category: main.dataset.category });
    }

    saveTasks();
    renderTasks();
    closeModal(modal);
  });
});

// Show saved tasks as soon as the page loads
renderTasks();


/* ---------- 6. Login / sign up overlay ---------- */
/* Only opens, switches and closes the overlay.
   The actual sign in / sign up is handled in auth.js. */

const signLoginContainer = document.querySelector('.sign-logincontainer');
const loginBtn = document.querySelector('.login-btn');
const loginFormBox = document.querySelector('.login-cont .form-container');
const signupFormBox = document.querySelector('.sign-cont .form-container');
const goToSignup = document.querySelector('.go-to-signup');
const goToSignin = document.querySelector('#s-form-link');

// Welcome "Login" button: open the overlay on the login form
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signLoginContainer.style.display = 'flex';
  loginFormBox.style.display = 'grid';
  signupFormBox.style.display = 'none';
  document.querySelectorAll('.form-box').forEach(f => f.reset());
});

// "Sign up" link: login form -> sign up form
goToSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginFormBox.style.display = 'none';
  signupFormBox.style.display = 'grid';
});

// "Sign in" link: sign up form -> login form
goToSignin.addEventListener('click', (e) => {
  e.preventDefault();
  signupFormBox.style.display = 'none';
  loginFormBox.style.display = 'grid';
});

// Cancel icons: close the whole overlay
document.querySelectorAll('.cancel-icon').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    signLoginContainer.style.display = 'none';
  });
});