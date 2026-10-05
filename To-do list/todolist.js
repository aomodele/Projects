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
// const themeToggle= document.querySelector('.toggle input');
// const root = document.documentElement;
// const savedtheme= localStorage.getItem('theme') || 'light';

// root.setAttribute('data-theme', savedtheme);
// themeToggle.addEventListener('click', () => {
//   const current = root.getAttribute ('data-theme');
//   const next = current === 'dark' ? 'light' : 'dark';
//   root.setAttribute('data-theme', next);
//   localStorage.setItem('theme', next);
// });

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

const addBtns = document.querySelectorAll('.add-btn');
const addModals = document.querySelectorAll('.add-task-modal');

addBtns.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    addModals[i].classList.add('open');
  });
});

document.querySelectorAll('.close-modal').forEach((closeBtn, i) => {
  closeBtn.addEventListener('click', () => {
    addModals[i].classList.remove('open');
  });
});

document.querySelectorAll('.add-task-form').forEach((form, i) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = form.querySelector('.task-name-input').value;
    const taskDate = form.querySelector('.task-date-input').value;
    console.log('New task:', taskName, taskDate);
    addModals[i].classList.remove('open');
    form.reset();
  });
});