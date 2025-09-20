// Constantes globales
const form = document.getElementById('vehiculo-form');
const contCars = document.querySelector('#cont-cards .row.g-3');
const inputFoto = document.getElementById('FotoCar');
const inputNombre = document.getElementById('nombreCar');
const inputMarca = document.getElementById('marcaCar');
const inputModelo = document.getElementById('modeloCar');
const inputKilometraje = document.getElementById('kilometrajeCar');
const inputPrecio = document.getElementById('precioCar');

// Imagen por defecto
const defaultImg = 'img/imagenPor Defecto.jpg';

// Función para crear tarjeta
function crearCard(vehiculo) {
    // Creamos el contenedor padre
    const col = document.createElement('div');
    col.classList.add('col-md-6', 'item-vehiculo');

    // Tarjeta
    const card = document.createElement('div');
    card.classList.add('card', 'h-100');

    // Imagen
    const imagen = document.createElement('img');
    imagen.classList.add('card-img-top', 'w-100');
    imagen.src = vehiculo.foto;
    imagen.alt = vehiculo.nombre;

    // Cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Usamos innerHTML para los datos
    cardBody.innerHTML = `
        <h3 class="card-title">${vehiculo.nombre}</h3>
        <h4 class="card-subtitle text-muted">${vehiculo.marca}</h4>
        <p>Modelo: ${vehiculo.modelo}</p>
        <p>Kilometraje: ${vehiculo.kilometraje} km</p>
        <h2 class="text-success">$${vehiculo.precio}</h2>
    `;

    // Contenedor de botones
    const contBtns = document.createElement('div');
    contBtns.classList.add('d-flex', 'justify-content-between', 'mt-3');

    // Botón Comprar
    const btnSuccess = document.createElement('button');
    btnSuccess.classList.add('btn', 'btn-success');
    btnSuccess.textContent = 'Comprar';
    btnSuccess.setAttribute('id', 'btnCompra');
    btnSuccess.addEventListener('click', () => {
        alert('Ya nos comunicaremos con usted');
    });

    // Botón Eliminar
    const btnDanger = document.createElement('button');
    btnDanger.classList.add('btn', 'btn-danger');
    btnDanger.textContent = 'Eliminar';
    btnDanger.addEventListener('click', () => col.remove());

    // Ensamblamos
    contBtns.appendChild(btnSuccess);
    contBtns.appendChild(btnDanger);
    cardBody.appendChild(contBtns);

    card.appendChild(imagen);
    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

// Evento submit del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Tomamos valores de los inputs
    const vehiculo = {
        foto: inputFoto.value.trim(),
        nombre: inputNombre.value.trim(),
        marca: inputMarca.value.trim(),
        modelo: inputModelo.value.trim(),
        kilometraje: inputKilometraje.value.trim(),
        precio: inputPrecio.value.trim()
    };

    // Validación: si falta algún campo obligatorio
    if (!vehiculo.nombre || !vehiculo.marca || !vehiculo.modelo || 
        !vehiculo.kilometraje || !vehiculo.precio) {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Si no hay foto, usar la predeterminada
    if (!vehiculo.foto) {
        vehiculo.foto = defaultImg;
    }

    // Crear y agregar tarjeta
    const newCard = crearCard(vehiculo);
    contCars.appendChild(newCard);

    // Limpiar formulario
    form.reset();
});

const btnStyle = document.getElementById('Btn_Change');
btnStyle.addEventListener('click', () => {
    const linckCss = document.getElementById('link_style');

    if (linckCss.getAttribute('href') === 'css/style.css') {
        linckCss.setAttribute('href', 'css/style_noche.css');
        btnStyle.textContent = 'Modo Noche';
    } else {
        linckCss.setAttribute('href', 'css/style.css');
        btnStyle.textContent = 'Modo Dia';
    }
});