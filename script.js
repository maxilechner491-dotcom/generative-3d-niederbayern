const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
const header = document.querySelector('.site-header');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 16));

const choices = ['colorChoice', 'diameterChoice', 'heightChoice'].map(id => document.getElementById(id));
const summary = document.getElementById('configSummary');
function updateSummary() {
  summary.textContent = choices.map(choice => choice.value).join(' · ');
}
choices.forEach(choice => choice.addEventListener('change', updateSummary));

document.getElementById('requestForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`${form.get('subject')} von ${form.get('name')}`);
  const body = encodeURIComponent(`Name: ${form.get('name')}\nE-Mail: ${form.get('email')}\n\n${form.get('message')}`);
  document.getElementById('formStatus').textContent = 'Dein E-Mail-Programm wird geöffnet …';
  window.location.href = `mailto:maxi@lachner.de?subject=${subject}&body=${body}`;
});
