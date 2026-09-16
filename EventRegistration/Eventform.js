document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  if (!form) return;

  const successBox = document.getElementById('success-box');

  // Show/hide password toggles
  document.querySelectorAll('.pw-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.textContent = isHidden ? 'Hide' : 'Show';
    });
  });

  const setInvalid = (fieldName, isInvalid) => {
    const field = form.querySelector(`[data-field="${fieldName}"]`);
    field.classList.toggle('invalid', isInvalid);
  };

  const validate = () => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirm = form.confirm.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameValid = name.length > 1;
    const emailValid = emailPattern.test(email);
    const passwordValid = password.length >= 8;
    const confirmValid = confirm === password && confirm.length > 0;
    const termsValid = form.terms.checked;

    setInvalid('name', !nameValid);
    setInvalid('email', !emailValid);
    setInvalid('password', !passwordValid);
    setInvalid('confirm', !confirmValid);

    return nameValid && emailValid && passwordValid && confirmValid && termsValid;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    form.style.display = 'none';
    successBox.style.display = 'block';
  });

  // Clear the red state as soon as a field becomes valid again
  ['name', 'email', 'password', 'confirm'].forEach((id) => {
    form[id].addEventListener('input', () => {
      const field = form.querySelector(`[data-field="${id}"]`);
      if (field.classList.contains('invalid')) validate();
    });
  });
});