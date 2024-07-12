
const ingresos = [
    new Ingreso('Salario', 5800.00),
    new Ingreso('Venta Coche', 2500),
    new Ingreso('Bono (buen rendimiento)', 300.00)
];

const egresos = [
    new Egreso('Renta Departamento', 900.00),
    new Egreso('Ropa', 400.00),
    new Egreso('Pension', 220.00)
];

let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for ( let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').textContent = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}


const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:1});
}


//Genera lista de ingresos
const cargarIngresos = ()  => {
    let ingresosHTML = '';
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

let crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha">
                        <div class="elemento_valor color-text">+ ${formatoMoneda(ingreso.valor)}</div>
                        <div class="icono-eliminar">
                            <button class="eliminar" onclick='eliminarIngreso(${ingreso.id})'>X</button>
                        </div>
                    </div>
                </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);

    cargarCabecero();
    cargarIngresos();
}


//Genera lista de egresos
const cargarEgresos = () => {
    
    let egresosHTML = '';
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

let crearEgresoHTML = (objeto) => {
    let porcentajeEgreso = formatoPorcentaje(objeto.valor / totalEgresos());
    let egresoHTML = `
    <div class="elemento">
                    <div class="elemento-descripcion">${objeto.descripcion}</div>
                    <div class="derecha">
                        <div class="elemento_valor">- ${objeto.valor}</div>
                        <div class="elemento_porcentaje porcentaje">${porcentajeEgreso}</div>
                        <div class="icono-eliminar">
                            <button class="eliminar" onclick='eliminarEgreso(${objeto.id})'>X</button>
                        </div>
                    </div>
                </div>
    `;
    return egresoHTML;
}

//Eliminar egreso
let eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( egreso => egreso.id == id );
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();

}


//Agregar datos desde el formulario

let agregarDato = () => {
    let formulario  = document.forms['formulario'];
    let tipo = formulario['tipo'];
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];

    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, parseFloat(valor.value)) );
            cargarCabecero();
            cargarIngresos();
        }else if (tipo.value === 'egreso'){
            egresos.push( new Ingreso(descripcion.value, parseFloat(valor.value)) );
            cargarCabecero();
            cargarEgresos();
        }
    }
}