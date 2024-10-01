const formulario = document.getElementById('form-loggin');
const btonInniciarSesion = document.getElementById('btn-inisiarSeseion');
const btnGoogle = document.getElementById('btn-google');

async function obtenerUsuarios() {
    try {
          const respuesta = await fetch('https://raw.githubusercontent.com/Guille1260/TF-JS-Coder/main/json/usuarios.json');
          
        if (!respuesta.ok) {
          throw new Error('Error en la solicitud: ' + respuesta.status);
        }
  
          const datos = await respuesta.json();
          const usuarios = datos.usuarios;
          
            btonInniciarSesion.addEventListener('click', e =>{
                e.preventDefault();  
                validarFormulario(usuarios)  ;   
            })
            formulario.addEventListener('keydown',e =>{
                if (e.key === 'Enter') {
                    e.preventDefault(); 
                    validarFormulario(usuarios)
                }
            })
            // btnGoogle.addEventListener('click', e=>{

            // })

        } catch (error) {     
          console.error('Error al obtener los datos:', error);
        }
  }

function mensajeNocoinsiden(){
    Swal.fire({
        icon: "error",
        title: "Contraseña o Usuarios no coinciden",
        text: "con un usuario registrado",
        background: "#10454F",
        color:"#fff",
        footer: '<p> No tenes cuneta? <a href="./registrar.html">Crear una cuenta</a> </p>',
        showClass: {
            popup: `
              animate__animated
              animate__backInDown
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
      });
}
function mensajeLoggin(){
    Swal.fire({
        title: "!BIENVENIDO¡",
        text: "Inicio de sesion Exitoso",
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
            sesionIniciada = true;
            sessionStorage.setItem("sesionBandera",JSON.stringify(sesionIniciada));
            window.location.href = "../index.html"; 
        }
    });
}
function mensajeCampo(){
    Swal.fire({
        title: "Complete todos los campos",
        background: "#10454F",
        color:"#fff"
    });
}

function validarFormulario(usuarios){
    const alias = document.getElementById("alias").value;
    const contrasena = document.getElementById("password").value;
    const usuarioEncontrado = usuarios.find(usuario => usuario.alias === alias && usuario.contraseña === contrasena);
    alias.trim() === "" || alias === null ? mensajeCampo():
    contrasena.trim() === "" || contrasena == null? mensajeCampo():
    usuarioEncontrado ?   mensajeLoggin() :  mensajeNocoinsiden();

}
 obtenerUsuarios();


