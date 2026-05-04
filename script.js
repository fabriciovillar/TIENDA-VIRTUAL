let carrito = [];

function agregar(nombre, precio, imagen) {
    const index = carrito.findIndex(i => i.nombre === nombre);
    if (index !== -1) {
        carrito[index].cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }
    actualizarCarrito();
    document.getElementById('carrito-overlay').classList.add('active');
}

function sumar(index) {
    carrito[index].cantidad++;
    actualizarCarrito();
}

function restar(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function toggleCarrito() {
    document.getElementById('carrito-overlay').classList.toggle('active');
}

function cerrarCarrito() {
    document.getElementById('carrito-overlay').classList.remove('active');
}

function cerrarFuera(event) {
    if (event.target.classList.contains('carrito-overlay')) {
        cerrarCarrito();
    }
}

function calcularTotal() {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);
}

function checkout() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    alert('¡Gracias por tu compra! Total: S/ ' + calcularTotal());
    carrito = [];
    actualizarCarrito();
    cerrarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    if (carrito.length === 0) {
        lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    } else {
        lista.innerHTML = '';
        carrito.forEach((item, index) => {
            lista.innerHTML += `
                <div class="carrito-item">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="carrito-item-info">
                        <p>${item.nombre}</p>
                        <small>${item.cantidad} x S/ ${item.precio.toFixed(2)}</small>
                        <div class="btns">
                            <button onclick="sumar(${index})">+</button>
                            <button onclick="restar(${index})">-</button>
                            <button onclick="eliminar(${index})">✕</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('contador').textContent = totalCantidad;
    document.getElementById('total').textContent = calcularTotal();
    document.getElementById('cantidad').textContent = totalCantidad;
}

document.addEventListener('DOMContentLoaded', function() {
    const buscar = document.getElementById('buscar');
    if (buscar) {
        buscar.addEventListener('input', function() {
            const texto = this.value.toLowerCase();
            document.querySelectorAll('.card').forEach(card => {
                const nombre = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = nombre.includes(texto) ? '' : 'none';
            });
        });
    }
});