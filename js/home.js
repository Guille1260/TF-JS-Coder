const formularioSuscribirse = document.getElementById("Newsletter-home");
const btnSuscribirse = document.getElementById("Suscribirse");
const contenedorProductos = document.getElementById("conteiner-tarjetas");  
const inputCorreio = document.getElementById("email-suscribirse").value;




async function obtenerProductos() {
    try {
          const respuesta = await fetch('https://raw.githubusercontent.com/Guille1260/tf-javaScript/main/json/productos.json');
      
        if (!respuesta.ok) {
          throw new Error('Error en la solicitud: ' + respuesta.status);
        }
  
          const datos = await respuesta.json();
          const productos = datos.productos;
          productosDestacados(productos);

        } catch (error) { 
          
          
          console.error('Error al obtener los datos:', error);
  
  
        }
}
//Carga productos
function cargarProductos(productosElegidos){
    productosElegidos.forEach( productos => {
        let div = document.createElement("article");
        div.classList.add("tarjeta");
        div.innerHTML = `
            <div class="conteiner-imagen">
              <img src="${productos.imagen}" alt="LOGO">
            </div>
            <div class="info">
              <article class="conteiner-descripcion">
                <p>${productos.titulo }</p>
              </article>
              <article class="conteiner-marca">
                <p>${productos.marca.toUpperCase() }</p>
              </article>
              <article class="conteiner-precio">
                <p> <span>$${productos.precio} ARS </span> </p>
              </article>
              <article class="conteiner-boton-agreggar">
                
                  <a href="./pages/productos.html">Ver Productos</a> 
                
              </article>
            </div>
        
        `;    
        contenedorProductos.append(div);
      })
    
}
function productosDestacados(productos){
    const auxProductos = [] ;
    productos.forEach(producto => {
        producto.destacado === true ? auxProductos.push(producto):0;
        
    });
    cargarProductos(auxProductos);
}
formularioSuscribirse.addEventListener("keydown",e=>{
    if(e.key === "Enter"){
        e.preventDefault();
        Newsletter();
    }
})
btnSuscribirse.addEventListener('click',e=>{
    e.preventDefault();
    Newsletter();
})
async function Newsletter() {
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


function mensajeCampo(){
    Swal.fire({
        title: "Complete el campo",
        background: "#10454F",
        color:"#fff"
    });
    
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
      formularioSuscribirse.reset();
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



obtenerProductos();
