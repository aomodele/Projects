/* =====================================================
   auth.js  -  everything that talks to Firebase
   Sections:
   1. Imports and setup
   2. Helpers (friendly errors, tooltip)
   3. Show who is signed in
   4. Google sign in
   5. Email sign up
   6. Email log in
   ===================================================== */


/* ---------- 1. Imports and setup ---------- */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4FrCGa0APXs0MEtURNyA2tioay518WD8",
  authDomain: "planning-with-ai-d3fcc.firebaseapp.com",
  projectId: "planning-with-ai-d3fcc",
  storageBucket: "planning-with-ai-d3fcc.firebasestorage.app",
  messagingSenderId: "246269463666",
  appId: "1:246269463666:web:e4c7b22df870d6722e46eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handy for testing in the browser console (F12)
window.auth = auth;
window.db = db;

const DEFAULT_AVATAR = 'Icons/Personicon.png';
const overlay = document.querySelector('.sign-logincontainer');


/* ---------- 2. Helpers ---------- */

// Turn a Firebase error into a message people can understand
function friendlyError(err) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered. Try signing in instead.',
    'auth/invalid-credential': 'Wrong email or password.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/popup-closed-by-user': 'The sign in window was closed before finishing.',
    'auth/unauthorized-domain': 'This address is not authorized in Firebase yet.'
  };
 return messages[err.code] || `Something went wrong (${err.code}).`;
}

// Fill the hover tooltip with three styled lines: method, name, email
function setTip(tip, method, name, email) {
  tip.innerHTML = '';
  [
    ['tip-method', method],
    ['tip-name', name],
    ['tip-email', email]
  ].forEach(([cls, text]) => {
    const line = document.createElement('span');
    line.className = cls;
    line.textContent = text;
    tip.appendChild(line);
  });
}


/* ---------- 3. Show who is signed in ---------- */
/* Runs on page load and every time someone signs in or out */

onAuthStateChanged(auth, (user) => {
  document.querySelectorAll('.login-user').forEach(box => {
    const img = box.querySelector('.user-image');
    const name = box.querySelector('.username');
    const tip = box.querySelector('.user-tooltip');

    if (user) {
      const isGoogle = user.providerData.some(p => p.providerId === 'google.com');
      const method = isGoogle ? 'Google Account' : 'Email Account';

      name.textContent = user.displayName || user.email;
      setTip(tip, method, user.displayName || 'No name set', user.email);
      img.referrerPolicy = 'no-referrer';
      img.src = user.photoURL || DEFAULT_AVATAR;
      img.onerror = () => { img.src = DEFAULT_AVATAR; };
    } else {
      name.textContent = 'Sign in/Login';
      tip.textContent = 'Not signed in';
      img.src = DEFAULT_AVATAR;
    }
  });

  // Close the login overlay after any successful sign in
  if (user) overlay.style.display = 'none';
});


/* ---------- 4. Google sign in ---------- */
/* The first social button in each form is the Google one */

document.querySelectorAll('.form-btn--social:first-child').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    signInWithPopup(auth, new GoogleAuthProvider())
      .catch(err => alert(friendlyError(err)));
  });
});


/* ---------- 5. Email sign up ---------- */

document.querySelector('.sign-cont .form-box').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const fullname = form.querySelector('#fullname').value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: fullname });
  } catch (err) {
    alert(friendlyError(err));
  }
});


/* ---------- 6. Email log in ---------- */

document.querySelector('.login-cont .form-box').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(friendlyError(err));
  }
});