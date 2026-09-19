function getDateString(){
  const options= {weekday: "long", day: "numeric", month: "long"};
  return new Date().toLocaleDateString(undefined, options);
}
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning,";
  if (hour < 18) return "Good afternoon,";
  else return "Good evening,";
}
document.querySelector(".date-text ").textContent= getDateString() 
document.querySelector(".greetings h1").textContent=  getGreeting()

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