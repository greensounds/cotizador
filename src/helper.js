//Obtiene la diferencia de anio
export function obtenerDiferenciaYear(year) {
    return new Date().getFullYear() - year;
}

//Calcula total a pagar segun la marca
export function calcularMarca(marca) {
    let incremento;
    switch(marca){
        case 'europeo':
            incremento = 1.3;
            break;
        case 'americano':
            incremento = 1.15;
            break
        case 'asiatico':
            incremento = 1.05;
            break;
        default: 
            break;
    }
    return incremento;
}

//calcular el tipo de seguro 

export function obtenerPlan(plan) {
    return(plan === "basico") ? 1.20 : 1.5;
}
