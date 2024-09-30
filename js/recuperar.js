const formularioRecuperar = document.getElementById("form-recuperar");
const btnRecuperar = document.getElementById("btn-recuperar-contraseña");
const inputRecuperar = document.getElementById("correo-recuperar");


async function obtenerUsuarios() {
    try {
          const respuesta = await fetch('https://raw.githubusercontent.com/Guille1260/tf-javaScript/main/json/usuarios.json');
      
        if (!respuesta.ok) {
          throw new Error('Error en la solicitud: ' + respuesta.status);
        }
  
            const datos = await respuesta.json();
            const usuarios = datos.usuarios;
            btnRecuperar.addEventListener('click', e =>{
                e.preventDefault();  
                 validarUsuario(usuarios);
            })
            formularioRecuperar.addEventListener('keydown',e =>{
                if (e.key === 'Enter') {
                    e.preventDefault(); 
                    validarUsuario(usuarios);
                }
            })


        } catch (error) {     
          console.error('Error al obtener los datos:', error);
        }
  }



function validarUsuario(usuarios){
    const correo = document.getElementById("correo-recuperar").value;
    const buscarCorreo = usuarios.find(usuario => usuario.correo === correo ) ;
    validarCampo(correo) != true ? mensajeCampo():
    validarEmail(correo) != true  ? mensajeMailValido():
    buscarCorreo ?  confirmacion1() : mensajeVerificar();
    buscarCorreo? formularioRecuperar.reset():0;
}
function validarCampo(valor){
    if(valor.trim() === "" || valor === null){
        return false;
    }else{
        return true;
    }
}
function mensajeCampo(){
    Swal.fire({
        title: "Complete el campo",
        background: "#10454F",
        color:"#fff"
    });
}
function mensajeVerificar(){
    Swal.fire({
        icon: "error",
        title: "EL CORREO INGRESADO NO CORRESPONDE A UN USUARIO REGISTRADO",
        background: "#10454F",
        color:"#fff",
       
      });
}
function confirmacion1(){
    Swal.fire({
        icon:"success",
        title: "MAIL ENVIADO",
        text: "Te enviamos un mail con los pasos para recuperar contraseña",
        background: "#10454F",
        color:"#fff",
        showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "./loggin.html"; 
        }
    });
}
function validarEmail(email) {
  // Expresión regular para validar el formato del correo electrónico
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function mensajeMailValido(){
  Swal.fire({
      icon: "error",
      title: "Ingerse un correo valido",
      background: "#10454F",
      color:"#fff",
     
    });
}

obtenerUsuarios()

