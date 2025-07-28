// CONFIGURA TU FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBUWXwHBW_HWUsp6Ijbq2ppjBbtSFEKTjM",
  authDomain: "confess-5111a.firebaseapp.com",
  projectId: "confess-5111a",
  storageBucket: "confess-5111a.firebasestorage.app",
  messagingSenderId: "907960766035",
  appId: "1:907960766035:web:4a890ef16b614b87e440a6",
  measurementId: "G-19TKGKLP3H"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let confesiones = [];
let pagina = 0;

document.getElementById("confesionForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const correo = document.getElementById("correo").value;
  const texto = document.getElementById("mensaje").value;
  const fondo = document.getElementById("fondo").value;

  try {
    await db.collection("confesiones").add({
      correo,
      texto,
      fondo,
      fecha: new Date()
    });

    document.getElementById("confesionForm").reset();
    alert("Confesión enviada.");
    mostrarFormulario();
    cargarConfesiones();
  } catch (error) {
    alert("Error al enviar confesión: " + error.message);
  }
});

function mostrarFormulario() {
  document.getElementById('formulario').classList.remove('oculto');
  document.getElementById('confesiones').classList.add('oculto');
}

function verConfesiones() {
  document.getElementById('formulario').classList.add('oculto');
  document.getElementById('confesiones').classList.remove('oculto');
  mostrarConfesiones();
}

async function cargarConfesiones() {
  const snapshot = await db.collection("confesiones").orderBy("fecha", "desc").get();
  confesiones = snapshot.docs.map(doc => doc.data());
  mostrarConfesiones();
}

function mostrarConfesiones() {
  const lista = document.getElementById('listaConfesiones');
  lista.innerHTML = "";

  if (confesiones.length === 0) {
    lista.innerHTML = "<p>No hay confesiones aún.</p>";
    return;
  }

  const conf = confesiones[pagina];
  const div = document.createElement("div");
  div.className = `confesion-box ${conf.fondo}`;
  div.innerText = conf.texto;
  lista.appendChild(div);
}

function siguiente() {
  if (pagina < confesiones.length - 1) {
    pagina++;
    mostrarConfesiones();
  }
}

function anterior() {
  if (pagina > 0) {
    pagina--;
    mostrarConfesiones();
  }
}

function verTodas() {
  const lista = document.getElementById('listaConfesiones');
  lista.innerHTML = "";
  confesiones.forEach(conf => {
    const div = document.createElement("div");
    div.className = `confesion-box ${conf.fondo}`;
    div.innerText = conf.texto;
    lista.appendChild(div);
  });
}

cargarConfesiones();