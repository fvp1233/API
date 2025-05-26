const API_URL = "https://retoolapi.dev/CgGj6W/data" 

//Función que manda a traer el JSON (asincrona)
async function obtenerPersonas(){
    //Respuesta del servidor
    const res = await fetch(API_URL); // Se hae una llamada al endpoin

    //Pasamos a JSON la respuesta del servidor
    const data = await res.json();//Esto es un JSON 

    //Enviamos el JSON que nos manda la API a la funcion que crea la tabla en HTML
    mostrarDatos(data);

}


//La funcion lleva un parámetro "datos que representa al JSON"
function mostrarDatos(datos){
    //Se llama al tbody dentro del elemento con id "tabla"
    const tabla = document.querySelector('#tabla tbody');
    tabla.innerHTML = ''; //vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.email}</td>
            <td>${persona.edad}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>        
        </tr>
        
        `
    }); 
}
//Llamada inicial para que se carguen los datos que vienen del servidor
obtenerPersonas();

