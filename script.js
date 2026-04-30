let carrito = [];

function agregar(nombre, precio) {
  let producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({nombre, precio, cantidad: 1});
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio * item.cantidad;
    lista.innerHTML += `
      <div>
        ${item.nombre} - $${item.precio} x ${item.cantidad}
        <button onclick="sumar(${index})">+</button>
        <button onclick="restar(${index})">-</button>
        <button onclick="eliminar(${index})">Eliminar</button>
      </div>
    `;
  });

  document.getElementById("contador").textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("total").textContent = total.toFixed(2);
}

function sumar(indice) {
  carrito[indice].cantidad++;
  actualizarCarrito();
}

function restar(indice) {
  if (carrito[indice].cantidad > 1) {
    carrito[indice].cantidad--;
  } else {
    carrito.splice(indice, 1);
  }
  actualizarCarrito();
}

function eliminar(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
}

function toggleCarrito() {
  let carritoDiv = document.getElementById("carrito");
  carritoDiv.style.display = carritoDiv.style.display === "none" ? "block" : "none";
}

function checkout() {
  alert("Gracias por tu compra. Aquí iría la integración con un formulario de pago.");
}
