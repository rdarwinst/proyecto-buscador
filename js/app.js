// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');



const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Eventos

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar
    
    // Llena las opciones de año
    llenarSelect();
});

// Eventlisteners para los select de busqueda
marca.addEventListener('change', leerSelect);
year.addEventListener('change', leerSelect);
minimo.addEventListener('change', leerSelect);
maximo.addEventListener('change', leerSelect);
puertas.addEventListener('change', leerSelect);
transmision.addEventListener('change', leerSelect);
color.addEventListener('change', leerSelect);




// Funciones

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function leerSelect(e) {
    datosBusqueda[e.target.id] = e.target.value;
    filtrarAuto();
}

function mostrarAutos(autos){
    limpiarHTML();
    autos.forEach(auto => {
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color:  ${color}
        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    });
};

// Genera los años del select
function llenarSelect() {
    for(let i = max; i >= min; i--){
        // console.table(i);
        const opcion = document.createElement('OPTION');
        opcion.textContent = i;
        opcion.value = i;        
        year.appendChild(opcion);
    }

}
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(resultado.length) {        
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = `No hay resultados, intenta con otras opciones de búsqueda.`;

    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if(year) {
        return auto.year === parseInt(year);
    }
    return auto;
}
function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= parseInt(minimo);
    }
    return auto;
}
function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= parseInt(maximo);
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;

    if(puertas) {
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}
function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;

    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(autos) {
    const {color} = datosBusqueda;
    if(color) {
        return autos.color === color;
    }
    return autos;
}