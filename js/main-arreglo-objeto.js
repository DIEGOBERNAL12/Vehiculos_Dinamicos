// === Selección de elementos ===
const form = document.getElementById("vehiculo-form");

const inputFoto = document.getElementById("FotoCar");
const inputNombre = document.getElementById("nombreCar");
const inputMarca = document.getElementById("marcaCar");
const inputModelo = document.getElementById("modeloCar");
const inputKilometraje = document.getElementById("kilometrajeCar");
const inputPrecio = document.getElementById("precioCar");

const contCards = document.querySelector("#cont-cards .row.g-3");
const contCarrito = document.querySelector(".cont-carrito");

// Botones del carrito
const btnAbrirCarrito = document.getElementById("carrito");
const btnCerrarCarrito = document.getElementById("carritos");
const panelCarrito = document.querySelector(".panel");


// Array de imágenes predeterminadas
const defaultImgs = 'img/imagenPor Defecto.jpg';

// === Función para crear tarjeta en "Vehículos Registrados" ===
function createCardVehiculo(vehiculo) {
    const col = document.createElement("div");
    col.classList.add("col-md-6", "item-vehiculo");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    const img = document.createElement("img");
    img.classList.add("card-img-top", "w-100");
    img.src = vehiculo.foto;
    img.alt = vehiculo.nombre;

    const body = document.createElement("div");
    body.classList.add("card-body");

    body.innerHTML = `
        <h3 class="card-title">${vehiculo.nombre}</h3>
        <h4 class="card-subtitle text-muted">${vehiculo.marca}</h4>
        <h4 class="card-text">Modelo: ${vehiculo.modelo}</h4>
        <h4 class="card-text">Kilometraje: ${vehiculo.kilometraje} km</h4>
        <h2 class="text-success">$${vehiculo.precio}</h2>
    `;

    // Botones
    const btns = document.createElement("div");
    btns.classList.add("d-flex", "justify-content-between", "mt-3");

    const btnComprar = document.createElement("button");
    btnComprar.classList.add("btn", "btn-success");
    btnComprar.textContent = "Añadir";

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.textContent = "Eliminar";

    // Eventos botones
    btnEliminar.addEventListener("click", () => col.remove());

    btnComprar.addEventListener("click", () => {
        const newCardCarrito = createCardCarrito(vehiculo);
        contCarrito.appendChild(newCardCarrito);
        sumaTotal()
    }); //este es el active de la funcion

    btns.appendChild(btnComprar);
    btns.appendChild(btnEliminar);

    body.appendChild(btns);
    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);

    return col;
}



// === Evento del formulario ===
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const vehiculo = {
        foto: inputFoto.value.trim() || defaultImgs,
        nombre: inputNombre.value.trim(),
        marca: inputMarca.value.trim(),
        modelo: inputModelo.value.trim(),
        kilometraje: inputKilometraje.value.trim(),
        precio: inputPrecio.value.trim(),
    };

    // Si no hay foto, usar la predeterminada

    if (!vehiculo.foto) {
        vehiculo.foto = defaultImgs;
    }

    // Validación: si falta algún campo obligatorio
    if (!vehiculo.nombre || !vehiculo.marca || !vehiculo.modelo || !vehiculo.kilometraje || !vehiculo.precio) {
        alert("No se puede hacer un registro si los campos no estan completos.");
        return;
    }

    // Crear tarjeta en "Vehículos Registrados"
    const newCard = createCardVehiculo(vehiculo);
    contCards.appendChild(newCard);

    const newVehiculo = {
        foto : vehiculo.foto,
        nombre : vehiculo.nombre,
        marca : vehiculo.marca,
        modelo : vehiculo.modelo,
        kilometraje : vehiculo.kilometraje,
        precio : vehiculo.precio
    }

    /////////////////////////////////////////////
    //Capturamos el arreglo existente en el localStorage O se crea vacio si no Existe Previamente
    const vehiculosGuardado = JSON.parse(localStorage.getItem("carritos")) || [];
    ///////////////////////////////////////
    //Agregamos el arreglo de vehiculosGuardados al nuevo carritos [] dentro de la constante anterior vehiculo
    vehiculosGuardado.push(newVehiculo)
    //Se guarda Nuevamente en el array actualizdo
    // Envia el item a localStorage y lo convierte en string
    localStorage.setItem("carritos", JSON.stringify(vehiculosGuardado));

    /////////////
    form.reset();
});



// === Función para crear tarjeta en el carrito ===
function createCardCarrito(vehiculo) {
    const cont = document.createElement("div");
    cont.classList.add("card-carrito", "mb-2", "p-2", "row", "align-items-center");

    const colImg = document.createElement("div");
    colImg.classList.add("col-md-4");

    const img = document.createElement("img");
    img.classList.add("carrito-img", "w-100");
    img.src = vehiculo.foto;
    img.alt = vehiculo.nombre;

    const colInfo = document.createElement("div");
    colInfo.classList.add("col-md-5");
    colInfo.innerHTML = `
        <h4 class="card-title">${vehiculo.nombre}</h4>
        <h5 class="card-subtitle text-muted">${vehiculo.marca}</h5>
        <h6 class="text-success">$${vehiculo.precio}</h6>
    `;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "col-md-2");
    btnEliminar.textContent = "X";
    btnEliminar.addEventListener("click", () => {
        cont.remove();
        sumaTotal();
    });

    colImg.appendChild(img);
    cont.appendChild(colImg);
    cont.appendChild(colInfo);
    cont.appendChild(btnEliminar);

    const newVehiculoCarrito = {
        foto : vehiculo.foto,
        nombre : vehiculo.nombre,
        marca : vehiculo.marca,
        modelo : vehiculo.modelo,
        kilometraje : vehiculo.kilometraje,
        precio : vehiculo.precio
    }

    //Agregar al localStore al agregar al carrito
    const carritoCompra = JSON.parse(localStorage.getItem("carritoCompra")) || [];
    //Se agrega el localStorage vehiculo
    carritoCompra.push(newVehiculoCarrito)
    //Para enviar el item a localStorage y lo convierte en string
    localStorage.setItem("carritoCompra", JSON.stringify(carritoCompra));

    return cont;
}




// desde aca se empieza lo que es el panel para la tienda
// const contCarrito = document.querySelector('.cont-carrito');
const carritoBtn = document.getElementById("carrito");
const remov = document.getElementById("carritos")
const panel = document.querySelector(".panel");

// Abrir panel
carritoBtn.addEventListener("click", () => {
    panel.classList.add("active");
});

// Cerrar panel
remov.addEventListener("click", () => {
    panel.classList.remove("active");
});



// Botón de modo noche
const changeStyleBtn = document.getElementById("Btn_Change");

changeStyleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Cambiar el texto del botón según el modo
    if (document.body.classList.contains("dark-mode")) {
        changeStyleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
        changeStyleBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
    }
});

function sumaTotal() {
    let total = 0;

    // Recorremos todos los items del carrito
    const precios = contCarrito.querySelectorAll("h6.text-success");

    precios.forEach(precio => {
        const valor = parseFloat(precio.textContent.replace("$", "").replace(/,/g, ""));
        if (!isNaN(valor)) {
            total += valor;
        }
    });

    // Mostrar el total
    const totalDiv = document.getElementById("total_suma");
    totalDiv.textContent = "Total = $" + total.toLocaleString("es-CL");
}
