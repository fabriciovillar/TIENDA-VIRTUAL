/* =========================
   CARRITO GLOBAL
========================= */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarCarrito();

/* =========================
   GUARDAR CARRITO
========================= */

function guardarCarrito(){

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}

/* =========================
   AGREGAR PRODUCTOS
========================= */

function agregar(nombre, precio, imagen){

    let producto = carrito.find(
        item => item.nombre === nombre
    );

    if(producto){

        producto.cantidad++;

    }else{

        carrito.push({

            nombre,
            precio,
            imagen,
            cantidad:1
        });
    }

    guardarCarrito();

    actualizarCarrito();

    document
    .getElementById("carrito-overlay")
    .classList.add("active");
}

/* =========================
   SUMAR PRODUCTO
========================= */

function sumar(index){

    carrito[index].cantidad++;

    guardarCarrito();

    actualizarCarrito();
}

/* =========================
   RESTAR PRODUCTO
========================= */

function restar(index){

    if(carrito[index].cantidad > 1){

        carrito[index].cantidad--;

    }else{

        carrito.splice(index,1);
    }

    guardarCarrito();

    actualizarCarrito();
}

/* =========================
   ELIMINAR PRODUCTO
========================= */

function eliminar(index){

    carrito.splice(index,1);

    guardarCarrito();

    actualizarCarrito();
}

/* =========================
   ABRIR / CERRAR CARRITO
========================= */

function toggleCarrito(){

    document
    .getElementById("carrito-overlay")
    .classList.toggle("active");
}

function cerrarCarrito(){

    document
    .getElementById("carrito-overlay")
    .classList.remove("active");
}

function cerrarFuera(event){

    if(
        event.target.classList.contains(
            "carrito-overlay"
        )
    ){
        cerrarCarrito();
    }
}

/* =========================
   CALCULAR TOTAL
========================= */

function calcularTotal(){

    return carrito.reduce(

        (acc,item) =>

        acc + item.precio * item.cantidad,

        0

    ).toFixed(2);
}

/* =========================
   CHECKOUT
========================= */

function checkout(){

    if(carrito.length === 0){

        alert("Tu carrito está vacío.");

        return;
    }

    document.getElementById(
        "checkoutModal"
    ).style.display = "flex";
}
/* =========================
   ACTUALIZAR CARRITO
========================= */

function actualizarCarrito(){

    const lista =
    document.getElementById("lista-carrito");

    if(carrito.length === 0){

        lista.innerHTML = `

        <p class="carrito-vacio">
            Tu carrito está vacío
        </p>

        `;
    }

    else{

        lista.innerHTML = "";

        carrito.forEach((item,index) => {

            lista.innerHTML += `

            <div class="carrito-item">

                <img
                    src="${item.imagen}"
                    alt="${item.nombre}"
                >

                <div class="carrito-item-info">

                    <p>${item.nombre}</p>

                    <small>

                        ${item.cantidad}
                        x
                        S/ ${item.precio.toFixed(2)}

                    </small>

                    <div class="btns">

                        <button
                            onclick="sumar(${index})"
                        >
                            +
                        </button>

                        <button
                            onclick="restar(${index})"
                        >
                            -
                        </button>

                        <button
                            onclick="eliminar(${index})"
                        >
                            ✕
                        </button>

                    </div>

                </div>

            </div>

            `;
        });
    }

    const totalCantidad = carrito.reduce(

        (acc,item) =>

        acc + item.cantidad,

        0
    );

    document.getElementById("contador")
    .textContent = totalCantidad;

    document.getElementById("cantidad")
    .textContent = totalCantidad;

    document.getElementById("total")
    .textContent = calcularTotal();
}

/* =========================
   BUSCADOR
========================= */

document.addEventListener(
    "DOMContentLoaded",

    function(){

        actualizarCarrito();

        const buscar =
        document.getElementById("buscar");

        if(buscar){

            buscar.addEventListener(

                "input",

                function(){

                    const texto =
                    this.value.toLowerCase();

                    document
                    .querySelectorAll(".card")

                    .forEach(card => {

                        const nombre =

                        card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();

                        card.style.display =

                        nombre.includes(texto)

                        ? ""

                        : "none";
                    });
                }
            );
        }
    }
);


function generarBoleta(){

    let nombre =
    document.getElementById("nombreCliente").value;

    let dni =
    document.getElementById("dniCliente").value;

    let direccion =
    document.getElementById("direccionCliente").value;

    let celular =
    document.getElementById("celularCliente").value;

    if(dni.length !== 8){

        alert("El DNI debe tener 8 dígitos");

        return;
    }

    if(celular.length !== 9){

        alert("El celular debe tener 9 dígitos");

        return;
    }

    let ahora = new Date();

    document.getElementById("fechaActual")
    .textContent =
    ahora.toLocaleDateString();

    document.getElementById("horaActual")
    .textContent =
    ahora.toLocaleTimeString();

    document.getElementById("bNombre")
    .textContent = nombre;

    document.getElementById("bDni")
    .textContent = dni;

    document.getElementById("bDireccion")
    .textContent = direccion;

    document.getElementById("bCelular")
    .textContent = celular;

    let productosHTML = "";

    carrito.forEach(item => {

        productosHTML += `

        <p>

            ${item.nombre}

            |

            Cantidad:
            ${item.cantidad}

            |

            S/${(
                item.precio *
                item.cantidad
            ).toFixed(2)}

        </p>

        `;
    });

    document.getElementById(
        "productosBoleta"
    ).innerHTML = productosHTML;

    document.getElementById(
        "totalBoleta"
    ).textContent = calcularTotal();

    document.getElementById(
        "checkoutModal"
    ).style.display = "none";

    document.getElementById(
        "boletaModal"
    ).style.display = "flex";


}

function imprimirBoleta(){

    window.print();
}
function cerrarBoleta(){

    document.getElementById(
        "boletaModal"
    ).style.display = "none";

    cerrarCarrito();
}
function cambiarMetodoPago(){

    let metodo =
    document.getElementById(
        "metodoPago"
    ).value;

    let datosTarjeta =
    document.getElementById(
        "datosTarjeta"
    );

    let qrPago =
    document.getElementById(
        "qrPago"
    );

    let imagenQR =
    document.getElementById(
        "imagenQR"
    );

    if(metodo === "tarjeta"){

        datosTarjeta.style.display =
        "block";

        qrPago.style.display =
        "none";
    }

    else if(metodo === "yape"){

        datosTarjeta.style.display =
        "none";

        qrPago.style.display =
        "block";

        imagenQR.src = "img/yape.jpg";
    }

    else if(metodo === "plin"){

        datosTarjeta.style.display =
        "none";

        qrPago.style.display =
        "block";

        imagenQR.src = "img/plin.jpg";
    }
}

function cerrarCheckout(){

    document.getElementById("checkoutModal")
    .style.display = "none";
}


window.addEventListener("click", function(event){

    const modal =
    document.getElementById("boletaModal");

    if(event.target === modal){

        modal.style.display = "none";
    }
});