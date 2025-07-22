let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");
  lista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - S/. ${item.precio.toFixed(2)}
      <button onclick="eliminarProducto(${index})"> <i class="fa-solid fa-trash"></i> Eliminar</button>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = `Total: S/. ${total.toFixed(2)}`;
}

function eliminarProducto(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  mostrarCarrito();
}

// === Carrusel ===
let indiceActual = 0;

function mostrarImagen(indice) {
  const imagenes = document.querySelectorAll(".carrusel-imagen");
  imagenes.forEach((img, i) => {
    img.classList.remove("activa");
    if (i === indice) {
      img.classList.add("activa");
    }
  });
}

function moverCarrusel(direccion) {
  const imagenes = document.querySelectorAll(".carrusel-imagen");
  indiceActual += direccion;
  if (indiceActual >= imagenes.length) indiceActual = 0;
  if (indiceActual < 0) indiceActual = imagenes.length - 1;
  mostrarImagen(indiceActual);
}

// Opcional: cambio automático cada 5s
setInterval(() => moverCarrusel(1), 5000);

function comprarPorWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "Hola, deseo comprar los siguientes productos:%0A";
  carrito.forEach((item, index) => {
    mensaje += `${index + 1}. ${item.nombre} - S/. ${item.precio.toFixed(2)}%0A`;
  });
  mensaje += `%0ATotal a pagar: S/. ${total.toFixed(2)}`;

  const numero = "51901340173";
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank");
}

function enviarFormularioWhatsApp(event) {
  event.preventDefault(); // Evita que se recargue la página

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !correo || !mensaje) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const texto = `HOLA SOY ${nombre}, MI CORREO ES ${correo}, ${mensaje}.`;
  const url = `https://web.whatsapp.com/send?phone=51901340173&text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
}
