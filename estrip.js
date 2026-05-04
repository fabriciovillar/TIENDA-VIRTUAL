let cantidad = 0;
let tallaSeleccionada = null;

function seleccionarTalla(boton, talla) {
    document.querySelectorAll('.btn-talla').forEach(b => b.classList.remove('talla-activa'));
    boton.classList.add('talla-activa');
    tallaSeleccionada = talla;
    document.getElementById("talla-texto").textContent = talla;
}

function cambiarCantidad(valor) {
    cantidad += valor;
    if (cantidad < 0) cantidad = 0;
    document.getElementById("cantidad").textContent = cantidad;
}

let carrito = [];
let total = 0;

function agregarProducto() {
    if (!tallaSeleccionada) {
        alert("Por favor selecciona una talla");
        return;
    }
    if (cantidad <= 0) {
        alert("Selecciona al menos 1 unidad");
        return;
    }
    agregar('CONJUNTO DEPORTIVO NEGRO', 50, 'img/polo3.jpg', tallaSeleccionada, cantidad);
    cantidad = 0;
    document.getElementById("cantidad").textContent = cantidad;
}

function agregar(nombre, precio, imagen, talla, cant = 1) {
    let key = nombre + '-' + talla;
    let producto = carrito.find(p => p.key === key);
    if (producto) {
        producto.cantidad += cant;
    } else {
        carrito.push({ key, nombre, precio, imagen, talla, cantidad: cant });
    }
    actualizarCarrito();
    document.getElementById("popupCarrito").style.display = "block";
}

function actualizarCarrito() {
    let contador = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    document.getElementById("contador").textContent = contador;

    let lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";
    total = 0;

    carrito.forEach(p => {
        total += p.precio * p.cantidad;
        lista.innerHTML += `
            <div class="item-carrito">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="item-info">
                    <strong style="color:#111">${p.nombre}</strong>
                    <small style="color:#555">S/ ${p.precio.toFixed(2)}</small>
                    <small style="color:#555">Talla: ${p.talla}</small>
                    <div style="display:flex; align-items:center; gap:6px; margin-top:6px;">
                        <button onclick="restar('${p.key}')" style="width:28px;height:28px;background:#f0f0f0;color:#111;border:1px solid #ccc;border-radius:4px;cursor:pointer;font-size:16px;">-</button>
                        <span style="color:#111; font-weight:bold;">${p.cantidad}</span>
                        <button onclick="sumar('${p.key}')" style="width:28px;height:28px;background:#f0f0f0;color:#111;border:1px solid #ccc;border-radius:4px;cursor:pointer;font-size:16px;">+</button>
                        <button onclick="eliminar('${p.key}')" style="width:28px;height:28px;background:#fff;color:#999;border:1px solid #ddd;border-radius:4px;cursor:pointer;font-size:14px;">🗑</button>
                    </div>
                </div>
                <strong style="color:#111; font-size:14px;">S/ ${(p.precio * p.cantidad).toFixed(2)}</strong>
            </div>
        `;
    });

    document.getElementById("totalCarrito").textContent = total.toFixed(2);
}

function mostrarCarrito() {
    let popup = document.getElementById("popupCarrito");
    popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";
}

function sumar(key) {
    let producto = carrito.find(p => p.key === key);
    producto.cantidad++;
    actualizarCarrito();
}
function restar(key) {
    let producto = carrito.find(p => p.key === key);
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        eliminar(key);
    }
    actualizarCarrito();
}
function eliminar(key) {
    carrito = carrito.filter(p => p.key !== key);
    actualizarCarrito();
}
function verCarrito() {
    alert("Aquí iría la página de carrito completo");
}
function checkout() {
    alert("Finalizar compra: Total S/" + total.toFixed(2));
}