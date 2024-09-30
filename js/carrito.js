let Carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const textoChangito = document.getElementById("numerocarrito");
const textoChangito2 = document.getElementById("numerocarrito1");
const cuerpoCarrito = document.querySelector(".cuerpo");
const totalApagar =  document.querySelector(".total");
const btonLimpiar =  document.querySelector(".Vaciar-Carrito");
const iconUsuario = document.getElementById("icono-usuario-desk");
const iconUsuario2 = document.getElementById("icono-usuario-movil");
const nuevaURL = "https://th.bing.com/th/id/OIP.-VigiXOTMsbHScdrbwsQqQHaHa?w=800&h=800&rs=1&pid=ImgDetMain";
const btnPageLoggin = document.getElementById("page-loggin");
const btnCrear = document.getElementById("page-crear");
const btnCerrarsesionDesk = document.getElementById("btn-icono-usuario-desk");
const btnCerrarsesionMovil = document.getElementById("btn-icono-usuario-movil");
const btnComprar = document.getElementById("btn-comprar");
let sesionIniciada = JSON.parse(sessionStorage.getItem("sesionBandera")) || false ;
let botonesEliminarArticulo = document.querySelectorAll(".boton-tacho");



function ProductosEncarrito(){
    textoChangito.innerText = Carrito.length;
    textoChangito2.innerText = Carrito.length; 
    
}
// cuerpo del carrito
function bodyCarrito(){
  
    if(Carrito.length == 0){
      cuerpoCarrito.innerHTML = `<div class="mensaje-vacio">
                                 <p>El carrito esta vacio &#128546; </p> 
                                </div>`
        totalCarrito(0);
    }else{
        cuerpoCarrito.innerHTML="";
        let totalCarro = 0;
        Carrito.forEach(productox => {
        let precioPorArticulo = productox.precio * productox.cantidad;
        totalCarro = totalCarro + precioPorArticulo;
        let div = document.createElement("article");
        div.classList.add("cajita");
        div.innerHTML = `
                <div class="conteiner-imagen">
                    <img src="${productox.imagen}" alt="${productox.titulo}">
                </div>
                <div class="conteiner-cantidad">
                  <div class="titulo">
                    <h6>cantidad</h6>
                  </div>
                  <div class="cuerpo-caja">
                    <p> ${productox.cantidad}</p>
                  </div>  
                </div>
                <div class="conteiner-talle">
                  <div class="titulo">
                    <h6>Talle</h6>
                  </div>
                  <div class="cuerpo-caja">
                    <select id="talle-${productox.id}">
                        
                        ${productox.talle.map(talle => `
                          <option value="${talle}" ${productox.talle === talle ? 'selected' : ''}>${talle}</option>
                      `).join('')}
                    </select>
                  </div>
                    
                </div>
                <div class="conteiner-precio">
                  <div class="titulo">
                    <h6>precio</h6>
                  </div>
                  <div class="cuerpo-caja">
                    <p>$${precioPorArticulo} ARS</p>
                  </div>
                    
                </div>
                <div class="conteiner-eliminar">
                  <button type="button" class=" btn btn-menu boton-tacho" id="${productox.id}"><i class="fa-solid fa-trash"></i></button>
                    
                </div>
                
        `;    
        cuerpoCarrito.append(div);
        totalCarrito(totalCarro);
      });
      
    } 
    eliminarArticulo()                  
}
  //Vaciar el carrito
function vaciarCarrito(){
    if(Carrito.length > 0){
      cuerpoCarrito.innerHTML = `<div class="mensaje-vacio">
                                    <p>El carrito esta vacio &#128546; </p>  
                                 </div>`;
      Carrito = []
      localStorage.setItem("carrito",JSON.stringify(Carrito));
      ProductosEncarrito()
    }
      totalCarrito(0);
  
}
  //Eliminar un articulo
function eliminarArticulo() {
    botonesEliminarArticulo = document.querySelectorAll(".boton-tacho"); 
    botonesEliminarArticulo.forEach(boton => {
      boton.addEventListener('click', e => {
        const idProducto = e.currentTarget.id;
        Carrito = Carrito.filter(producto => producto.id !== idProducto);
        ProductosEncarrito();
        bodyCarrito();
        localStorage.setItem("carrito",JSON.stringify(Carrito));
        Carrito.length === 0 && totalCarrito(0);
      });
    });
}
  
  //precio de cada producto
function totalCarrito(total){
    totalApagar.innerText = "$"+total+"ARS" 
}
function usuarioActivo(){
  iconUsuario.src = nuevaURL;
  iconUsuario2.src = nuevaURL;
  habilitarBotones()
  ocultarRutas()
}
function usuarioInactivo(){
  iconUsuario.src = "https://th.bing.com/th/id/OIP.k4QGYt_FPEcajz18OEfvFwHaHa?pid=ImgDet&w=191&h=191&c=7";
  iconUsuario2.src = "https://th.bing.com/th/id/OIP.k4QGYt_FPEcajz18OEfvFwHaHa?pid=ImgDet&w=191&h=191&c=7";
  deshabilitarBotones()
  mostrarRutas()
}
function ocultarRutas(){
  btnPageLoggin.style.display = "none" ;
  btnCrear.style.display = "none"
}
function mostrarRutas(){
  btnPageLoggin.style.display = "block" ;
  btnCrear.style.display = "block"
}
function mensajeSesioncerrada(){
  Swal.fire({
    title: "Cerrar session",
    text: "Estas seguro que quieres cerrar sesion?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "SI , Cerrar sesion",
    background: "#10454F",
    color:"#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Que tengas lindo dia",
        text: "Sesion cerrada con exito",
        icon: "success",
        background: "#10454F",
        color:"#fff",
      }).then((res) => {
        if (result.isConfirmed){
          sesionIniciada = false;
          sessionStorage.setItem("sesionBandera",JSON.stringify(sesionIniciada));
          if (window.location.pathname.endsWith("index.html")) {
            window.location.href = "./index.html"; // Redirigir si ya está en index.html
          } else {
            window.location.href = "../index.html"; // Redirigir a la página index en otra ubicación
          }
        }
      })
      
    }
  });
}
function deshabilitarBotones() {
  btnCerrarsesionDesk.disabled = true; // Desactivar el botón de escritorio
  btnCerrarsesionMovil.disabled = true; // Desactivar el botón móvil
}
function habilitarBotones() {
  btnCerrarsesionDesk.disabled = false; // Desactivar el botón de escritorio
  btnCerrarsesionMovil.disabled = false; // Desactivar el botón móvil
}
function mensajeCompra(){
  Swal.fire({
    title: "Comprar Carrito",
    text: "Estas seguro de Realizar la compra?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "SI , comprar",
    background: "#10454F",
    color:"#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Gracias por su compra",
        text: "Que tenga lindo dia",
        icon: "success",
        background: "#10454F",
        color:"#fff",
      }).then((res) => {
        if (result.isConfirmed){
          vaciarCarrito();
          
        }
      })
      
    }
  });
}
function mensajeInicieSesion(){
  Swal.fire({
    icon: "error",
    title: "iniciar session",
    text: "Para realizar la compra debe iniciar sesion",
    background: "#10454F",
    color:"#fff",
    footer: footerMensaje()
    
  });
}

function footerMensaje(){
  const currentPage = window.location.pathname.split('/').pop();
  let footerContent;
  if (currentPage === 'index.html') {
    return footerContent = `
      <p>No tienes cuenta? <a href="./pages/registrar.html">Crear una cuenta</a></p>
      <p>¿Ya tienes una cuenta? <a href="./pages/loggin.html">Iniciar sesión</a></p>
    `;
  } else {
  return footerContent = `
    <p>No tienes cuenta? <a href="./registrar.html">Crear una cuenta</a></p>
    <p>¿Ya tienes una cuenta? <a href="./loggin.html">Iniciar sesión</a></p>
  `;
  }
}

function mensajeCarritovacio(){
  Swal.fire({
    title: "Carrito Vacio, agrege elementos",
    background: "#10454F",
    color:"#fff"
  });
}

btonLimpiar.addEventListener('click', e=>{
    vaciarCarrito()
});
btnCerrarsesionDesk.addEventListener('click', e =>{
  mensajeSesioncerrada();
})

btnCerrarsesionMovil.addEventListener('click', e => {
  mensajeSesioncerrada();
})

btnComprar.addEventListener('click', e =>{
  Carrito.length === 0 ? mensajeCarritovacio():
  sesionIniciada === true ? mensajeCompra() : mensajeInicieSesion();
})

sesionIniciada === true ? usuarioActivo() : usuarioInactivo() ;

ProductosEncarrito();
bodyCarrito()
