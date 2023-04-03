import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const key = 'feedback-form-state';

form.addEventListener('input', throttle(event => {
  const feedbackFormState = JSON.parse(localStorage.getItem(key)) || {};
  feedbackFormState.email = emailInput.value;
  feedbackFormState.message = messageInput.value;
  localStorage.setItem(key, JSON.stringify(feedbackFormState));
}, 500));

window.addEventListener('DOMContentLoaded', () => {
  const feedbackFormState = JSON.parse(localStorage.getItem(key)) || {};
  emailInput.value = feedbackFormState.email || '';
  messageInput.value = feedbackFormState.message || '';
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const feedbackFormState = JSON.parse(localStorage.getItem(key)) || {};
  if (feedbackFormState.email && feedbackFormState.message) {
    console.log({ email: feedbackFormState.email, message: feedbackFormState.message });
    localStorage.removeItem(key);
    emailInput.value = '';
    messageInput.value = '';
  } else {
    alert('Заполните оба поля!');
  }
});

