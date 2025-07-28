const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

hamburgerBtn.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(0)';
});
closeMenuBtn.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(100%)';
});
window.addEventListener('click', e => {
  if (e.target === mobileMenu) {
    mobileMenu.style.transform = 'translateX(100%)';
  }
});

const openFormBtn = document.getElementById('openFormBtn');
const confesionesFormModal = document.getElementById('confesionesFormModal');
const closeFormBtn = document.getElementById('closeFormBtn');

openFormBtn.addEventListener('click', () => {
  const fakeEmail = `user${Math.floor(Math.random() * 10000)}@ejemplo.com`;
  document.getElementById('email').value = fakeEmail;
  confesionesFormModal.classList.remove('hidden');
});

closeFormBtn.addEventListener('click', () => {
  confesionesFormModal.classList.add('hidden');
});

const confesionForm = document.getElementById('confesionForm');
const confesionesSection = document.getElementById('confesionesSection');
const confesionText = document.getElementById('confesionText');
const prevBtn = document.getElementById('prevConfesion');
const nextBtn = document.getElementById('nextConfesion');
const viewConfesionesBtn = document.getElementById('viewConfesionesBtn');
const viewAllBtn = document.getElementById('viewAllConfesiones');
const allConfesionesList = document.getElementById('allConfesionesList');

let confesiones = JSON.parse(localStorage.getItem('confesionesLLA')) || [];
let currentIndex = 0;

function saveConfesiones() {
  localStorage.setItem('confesionesLLA', JSON.stringify(confesiones));
}

function displayConfesion(index) {
  if (confesiones.length === 0) {
    confesionText.textContent = 'No hay confesiones aún.';
    confesionesSection.classList.add('hidden');
    return;
  }
  confesionesSection.classList.remove('hidden');
  const conf = confesiones[index];
  confesionText.textContent = conf.mensaje;
  confesionText.className = conf.background;
}

function showAllConfesiones() {
  allConfesionesList.innerHTML = '';
  if (confesiones.length === 0) {
    allConfesionesList.textContent = 'No hay confesiones para mostrar.';
  } else {
    confesiones.forEach((conf, i) => {
      const div = document.createElement('div');
      div.classList.add('confesion-item');
      div.innerHTML = `<div class="email">${conf.email}</div><div class="mensaje">${conf.mensaje}</div>`;
      allConfesionesList.appendChild(div);
    });
  }
  allConfesionesList.classList.toggle('hidden');
}

confesionForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = confesionForm.email.value.trim();
  const mensaje = confesionForm.mensaje.value.trim();
  const background = confesionForm.background.value;

  if (!email || !mensaje || !background) {
    alert('Por favor completa todos los campos.');
    return;
  }

  confesiones.push({ email, mensaje, background, created: Date.now() });
  saveConfesiones();
  confesionForm.reset();
  confesionesFormModal.classList.add('hidden');
  currentIndex = confesiones.length - 1;
  displayConfesion(currentIndex);
  alert('Confesión enviada. ¡Gracias por compartir!');
});

viewConfesionesBtn.addEventListener('click', () => {
  if (confesiones.length === 0) {
    alert('No hay confesiones para mostrar aún.');
    return;
  }
  currentIndex = 0;
  displayConfesion(currentIndex);
});

prevBtn.addEventListener('click', () => {
  if (confesiones.length === 0) return;
  currentIndex = (currentIndex - 1 + confesiones.length) % confesiones.length;
  displayConfesion(currentIndex);
});

nextBtn.addEventListener('click', () => {
  if (confesiones.length === 0) return;
  currentIndex = (currentIndex + 1) % confesiones.length;
  displayConfesion(currentIndex);
});

viewAllBtn.addEventListener('click', () => {
  showAllConfesiones();
});
