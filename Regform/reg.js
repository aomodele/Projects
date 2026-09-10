// Elements
const regBox = document.querySelector('.reg-box');
const signBox = document.querySelector('.sign-box');

const registerBtn = document.getElementById('reg-btn');      // reg-box -> sign-box
const backToLoginBtn = document.getElementById('login-btn'); // sign-box -> reg-box (nav)
const logBtn = document.getElementById('log-btn');           // actual Login submit
const signBtn = document.getElementById('sign-btn');         // actual Register submit

const rememberBox = document.querySelector('.checkbox');
const usernameInput = document.querySelector('.userinfo input:first-child');
const loginPasswordInput = document.querySelector('.userinfo .password');

// Switch: Register -> Sign-up form
registerBtn.addEventListener('click', () => {
  regBox.style.display = 'none';
  signBox.style.display = 'inline-block';
});

// Switch: Login (nav, in sign-box) -> back to Login form
backToLoginBtn.addEventListener('click', () => {
  signBox.style.display = 'none';
  regBox.style.display = 'inline-block';
});

// On page load, prefill remembered username
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('rememberedUser');
  if (saved) {
    usernameInput.value = saved;
    rememberBox.checked = true;
  }
});

// Register submit
signBtn.addEventListener('click', () => {
  const email = document.querySelector('.sign-userinfo input:nth-child(3)').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (!email || !password) return alert('Fill in all fields');
  if (password !== confirmPassword) return alert('Passwords do not match');

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  users[email] = password;
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registered! You can now log in.');

  signBox.style.display = 'none';
  regBox.style.display = 'inline-block';
});

// Login submit (this was the missing link)
logBtn.addEventListener('click', () => {
  const email = usernameInput.value;
  const password = loginPasswordInput.value;

  if (rememberBox.checked) {
    localStorage.setItem('rememberedUser', email);
  } else {
    localStorage.removeItem('rememberedUser');
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[email] === password) {
    alert('Login successful (trial)');
  } else {
    alert('Invalid email or password');
  }
});

// Fake Google account picker
document.querySelector('.google-btn').addEventListener('click', () => {
  const fakeAccounts = ['test.user1@gmail.com', 'test.user2@gmail.com'];
  const choice = prompt(`Select account:\n1. ${fakeAccounts[0]}\n2. ${fakeAccounts[1]}\n\nType 1 or 2:`);
  const selected = fakeAccounts[choice - 1];
  if (selected) alert(`Signed in as ${selected} (trial)`);
});