
const formularioRegistro = document.getElementById('form-reg');
const btnCrearUsuario = document.getElementById('btn-crear-cuenta');


async function obtenerUsuarios() {
    try {
          const respuesta = await fetch('https://raw.githubusercontent.com/Guille1260/TF-JS-Coder/main/json/usuarios.json');
      
        if (!respuesta.ok) {
          throw new Error('Error en la solicitud: ' + respuesta.status);
        }
  
            const datos = await respuesta.json();
            const usuarios = datos.usuarios;

            btnCrearUsuario.addEventListener('click', e =>{
                e.preventDefault();  
                nuevoUsuario(usuarios); 
            })
            formularioRegistro.addEventListener('keydown',e =>{
                if (e.key === 'Enter') {
                    e.preventDefault(); 
                    nuevoUsuario(usuarios); 
                }
            })

           

        } catch (error) {     
          console.error('Error al obtener los datos:', error);
        }
  }


function nuevoUsuario(usuarios){

    const email = document.getElementById("email").value;
    const alias = document.getElementById("alias").value;
    const contrasena = document.getElementById("contraseña").value;
    const validarContrasena = document.getElementById("contraseña-confirmacion").value;
    const provincia = document.getElementById("provincia").value;
    const buscarMail = usuarios.find(usuario => usuario.correo === email);
    const buscarAlias = usuarios.find(usuario => usuario.alias === alias);

    validarCampo(email) == false ? mensaje():
    validarCampo(alias) == false ? mensaje():
    validarCampo(provincia) == false ? mensaje():
    validarCampo(contrasena) == false ? mensaje():
    validarCampo(validarContrasena) == false ? mensaje():

    validarEmail(email) != true ? mensajeMailValido():
    contrasena != validarContrasena ? contraseñas() :
    buscarMail ?  correoRegistrado():
    buscarAlias ? aliasRegistrado() :usuarioCreado(); 
    
  }
 
function validarCampo(valor){
    if(valor.trim() ==="" || valor === null){
        return false;
    }else{
        return true;
    }
  }
function mensaje(){
    Swal.fire({
        title: "Complete todos los campos",
        background: "#10454F",
        color:"#fff"
    });
}
function contraseñas(){
    Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        background: "#10454F",
        color:"#fff",
       
      });
}
function correoRegistrado(){
    Swal.fire({
        icon: "error",
        title: "Correo ya registrado",
        background: "#10454F",
        color:"#fff",
       
      });
}
function aliasRegistrado(){
    Swal.fire({
        icon: "error",
        title: "alias ya registrado",
        background: "#10454F",
        color:"#fff",
       
      });
}
function usuarioCreado(){
    Swal.fire({
        title: "!BIENVENIDO¡",
        text: "usuario creado con Exito",
        imageUrl: "https://th.bing.com/th/id/OIP.UsJEnnPhDqkY6TVCmVLwoQHaHa?rs=1&pid=ImgDetMain",
        imageWidth: 200,
        imageHeight: 200,
        background: "#10454F",
        color:"#fff",
        imageAlt: "Custom image",
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
 obtenerUsuarios();
 