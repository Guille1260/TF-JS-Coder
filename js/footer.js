const formularioNewsletter = document.getElementById("form-footer");
const btnEnviar = document.getElementById("btn-enviar-footer");
const inputCorreo = document.getElementById("form-footer").value;

console.log(inputCorreo)
btnEnviar.addEventListener('click',e=>{
    e.preventDefault();
    validarFormularioFooter();
})

formularioNewsletter.addEventListener("keydown",e=>{
    if(e.key === "Enter"){
        e.preventDefault();
        validarFormularioFooter();
    }
})


// function validarFormularioFooter(){
//     const email = document.getElementById("email").value; 
//     email.trim() === "" || email === null ? mensaje():
//     validarEmail(email) != true ? mensajeMailValido():  alert("formulario enviado");
//     formularioNewsletter.reset();
// }   

function mensaje(){
    Swal.fire({
        title: "Complete el campo",
        background: "#10454F",
        color:"#fff"
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
function mensajeCampo(){
    Swal.fire({
        title: "Complete el campo",
        background: "#10454F",
        color:"#fff"
    });
    
}
async function validarFormularioFooter() {
    const mail = document.getElementById("email-footer").value;
    if (mail.trim() === "" || mail === null) {
        mensajeCampo();
    } else if (validarEmail(mail)) {
        try {
            await emailjs.send("service_jl4jbu5", "template_2bh2906", {
                email: mail,
            });
            confirmacion();
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            Swal.fire({
                icon: "error",
                title: "Error al enviar el correo",
                text: "Inténtalo de nuevo más tarde.",
                background: "#10454F",
                color: "#fff",
            });
        }
    } else {
        mensajeMailValido();
    }
  }
  function confirmacion(){
    Swal.fire({
        icon:"success",
        title: "MAIL ENVIADO",
        text: "Te enviaremos nuestras ofertas",
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
      });
      formularioNewsletter.reset();
}