// Importaciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_et5RjNaI38faN-U0p5inlBpHsLpGsDY",
  authDomain: "confessapp-48b52.firebaseapp.com",
  databaseURL: "https://confessapp-48b52-default-rtdb.firebaseio.com",
  projectId: "confessapp-48b52",
  storageBucket: "confessapp-48b52.appspot.com",
  messagingSenderId: "961087797548",
  appId: "1:961087797548:web:ad27378e9bb44d8b025489",
  measurementId: "G-VYH6M0K0P7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const confesionesRef = ref(database, 'confesiones');

// Función para enviar una confesión
export function enviarConfesion(texto, color) {
  if (!texto.trim()) return;

  push(confesionesRef, {
    texto: texto.trim(),
    color: color || "gradient1",
    timestamp: Date.now()
  }).catch(error => {
    console.error("Error al enviar confesión:", error);
    alert("Hubo un error al enviar la confesión.");
  });
}

// Función para escuchar confesiones en tiempo real
export function escucharConfesiones(callback) {
  onValue(confesionesRef, snapshot => {
    const data = snapshot.val();
    const confesionesArray = [];

    for (let key in data) {
      confesionesArray.push(data[key]);
    }

    // Ordenar por fecha (más recientes primero)
    confesionesArray.sort((a, b) => b.timestamp - a.timestamp);

    callback(confesionesArray);
  });
}
