// function getDateString(){
//   const options= {weekday: "long", day: "numeric", month: "long"};
//   return new Date().toLocaleDateString(undefined, options);
// }
// function getGreeting() {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good morning,";
//   if (hour < 18) return "Good afternoon,";
//   else return "Good evening,";
// }
// document.querySelector(".date-text ").textContent= getDateString() 
// document.querySelector(".greetings h1").textContent=  getGreeting()
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
  const el = document.querySelector(selector);
  if (el) el.textContent = getDateString();
}

function setGreetingText(selector){
  const el = document.querySelector(selector);
  if (el) el.textContent = getGreeting();
}

// Use on any screen that has these elements:
setGreetingText(".greetings h1");
setDateText(".date-text");

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


function typeText(element, text, speed = 50) {
  let i = 0;
  element.textContent ="";
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
const homeBtn = document.querySelector('.home-icon');

continueBtn.addEventListener('click', (e) => {
  e.preventDefault();
  welcomeScreen.style.display = 'none';
  organizeScreen.style.display = 'grid';
});

homeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  organizeScreen.style.display = 'none';
  welcomeScreen.style.display = 'grid';
});