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
const workbtn = document.querySelector('.work-box');
const workscreen = document.querySelector('.workscreen');
const personalbtn = document.querySelector('.personal-box');
const personalscreen = document.querySelector('.personalscreen');
const errandbtn =document.querySelector('.errands-box');
const errandscreen = document.querySelector('.errandscreen');
const healthbtn = document.querySelector ('.health-box');
const healthscreen =document.querySelector ('.healthscreen');

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
 //footer navigating buttons
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(screens[btn.dataset.target]);
  });
});


//navigate to organize view
continueBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showScreen(organizeScreen);
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
    showScreen(organizeScreen);
  });
});
//navigate to work view
workbtn.addEventListener('click', (e) => {
  e.preventDefault();
  showScreen(workscreen);
});
//navigate to personal view
personalbtn.addEventListener('click', (e) => {
  e.preventDefault();
  showScreen(personalscreen)
});
//navigate to errand view
errandbtn.addEventListener('click', (e) => {
  e.preventDefault();
  showScreen(errandscreen)
});
//navigate to health view
healthbtn.addEventListener('click', (e) => {
  e.preventDefault();
  showScreen(healthscreen)
});
