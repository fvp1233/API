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


//Agregar un nuevo registrp
const modal = document.getElementById("modal-agregar");// Cuadro de dialogo
const btnAgregar = document.getElementById("btnAbrirModal");// + para abrir
const btnCerrar = document.getElementById("btnCerrarModal") // x para cerrar

btnAgregar.addEventListener("click", () => {
    modal.showModal(); //Abrir el modal al hacer click al boton
});

btnCerrar.addEventListener("click", () => {
    modal.close(); //Cerrar el modal
})

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" Reprsenta "Event Submit" - evita que el formulario se envie de golpe

    //Capturar los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !email || !edad){
        alert("Complete todos los campos")
        return; //Evitar que el formulario se envie
    }

    //Llamar a la API para enviar el usuario
    const respuesta = await fecth(API_URL, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, email, edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario y cerrar el modal
        document.getElementById("frmAgregar").reset();

        modal.close();

        //Recargar la tabla
        obtenerPersonas();
    }
    else{
        alert("Existe un error al agregar");
    }

});

