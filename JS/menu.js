const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

hamburgerBtn.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(0)';
});

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(100%)';
});

window.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.style.transform = 'translateX(100%)';
  }
});
