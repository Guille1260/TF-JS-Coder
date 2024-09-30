const contenedorProductos = document.getElementById("conteiner-tarjetas");  
const botonesCat = document.querySelectorAll(".botonesCategoria");
const contenedorFiltro = document.getElementById("parrafo");
const contenedorFiltro1 = document.getElementById("parrafo1");
const añadir = document.querySelectorAll("añadir-carro");
const cuerpoCarrito = document.querySelector(".cuerpo");
const btonLimpiar =  document.querySelector(".Vaciar-Carrito");
const totalApagar =  document.querySelector(".total");
const search = document.getElementById("navegacion-search");
const textoChangito = document.getElementById("numerocarrito");
const textoChangito2 = document.getElementById("numerocarrito1");
const iconUsuario = document.getElementById("icono-usuario-desk");
const iconUsuario2 = document.getElementById("icono-usuario-movil");
const nuevaURL = "https://th.bing.com/th/id/OIP.-VigiXOTMsbHScdrbwsQqQHaHa?w=800&h=800&rs=1&pid=ImgDetMain";
const btnPageLoggin = document.getElementById("page-loggin");
const btnCrear = document.getElementById("page-crear");
const btnCerrarsesionDesk = document.getElementById("btn-icono-usuario-desk");
const btnCerrarsesionMovil = document.getElementById("btn-icono-usuario-movil");
const btnComprar = document.getElementById("btn-comprar");
let ordenar = document.getElementById("sort");
let botonesAgregar = document.querySelectorAll(".añadir-carrito");
let botonesEliminarArticulo = document.querySelectorAll(".boton-tacho");
let Carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let sesionIniciada = JSON.parse(sessionStorage.getItem("sesionBandera")) || false ;
// Asegúrate de que arrayFiltros es un array y lo inicializas si es necesario
let arrayFiltros = [];

async function obtenerProductos() {
    try {
          const respuesta = await fetch('https://raw.githubusercontent.com/Guille1260/tf-javaScript/main/json/productos.json');
         
        if (!respuesta.ok) {
          throw new Error('Error en la solicitud: ' + respuesta.status);
        }
  
          const datos = await respuesta.json();
          const productos = datos.productos;
          const filtroSeleccionado = getQueryParam('filtro');
          
          if (filtroSeleccionado) {
              arrayFiltros.push(filtroSeleccionado);
              console.log(arrayFiltros)
              filtroProductos(productos,arrayFiltros);
              
          } else {
              cargarProductos(productos);
          }
          ProductosEncarrito()
          bodyCarrito()
          
          ordenar.addEventListener('change',e=>{
            
            e.currentTarget.value === "price-ascending"? ordenarMenoraMayor(productos): ordenarMayoraMenor(productos);
          })
          botonesCat.forEach(boton => {
            boton.addEventListener("click", e => {
                let apretado = e.target.id; 
                if (apretado === "todos") {
                    cargarProductos(productos); 
                    filtroUtilizado(""); 
                    arrayFiltros = [];
                } else {
                    arrayFiltros.push(apretado);
                    filtroProductos(productos, arrayFiltros);
                }
                
            });
        });
          btonLimpiar.addEventListener('click', e=>{
            vaciarCarrito()
          });
          search.addEventListener('keyup',e=>{
            filtrarProductos(productos, e);
          })
          btnCerrarsesionDesk.addEventListener('click', e =>{
            mensajeSesioncerrada();
          })
          btnCerrarsesionMovil.addEventListener('click', e => {
            mensajeSesioncerrada();
          })
        } catch (error) { 
          
          
          console.error('Error al obtener los datos:', error);
  
  
        }
}

function cargarProductos(productosElegidos){
    if(productosElegidos.length === 0){
      contenedorProductos.innerHTML = `
            <div class="conteiner-mensaje-sinproductos">
               <p> No se encontraron productos </p>
            </div>`;
    }else{
        contenedorProductos.innerHTML = "";
        ordenar.addEventListener('change',e=>{
          if(e.target.value === "price-descending"){
            ordenarMayoraMenor(productosElegidos);
      
          }else{
            ordenarMenoraMayor(productosElegidos)
          }
        })
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
                  <button type="button" class="añadir-carrito"  id="${productos.id}">
                    <i class="fa-solid fa-cart-shopping"></i><span class="texto-tarjeta">Añadir</span> 
                  </button>
                </article>
              </div>
          
          `;    
          contenedorProductos.append(div);
        })
    }
      
      acutualizarBotones(productosElegidos);
}
function acutualizarBotones(productos){
    botonesAgregar = document.querySelectorAll(".añadir-carrito");
    botonesAgregar.forEach(boton => {
      boton.addEventListener('click',e =>{
        agregarAlCarrito(e.currentTarget.id,productos);
      });
    });
}
//Filtro
function filtroProductos(productos, arrayFiltros) {
    const auxProductos = [];
    if (Array.isArray(arrayFiltros) && arrayFiltros.length > 0) {
        productos.forEach(producto => {
            
            const cumpleFiltro = arrayFiltros.every(filtro => 
                (producto.referencia && producto.referencia.includes(filtro)) ||
                (producto.color && producto.color.includes(filtro)) || 
                (producto.talle && producto.talle.includes(filtro))
            );
            if (cumpleFiltro) {
                auxProductos.push(producto);
            }
        });

        cargarProductos(auxProductos); 
        filtroUtilizado(arrayFiltros.join("> ")); // Muestra los filtros utilizados
    } else {
        cargarProductos(productos); // Carga todos los productos si no hay filtros
        filtroUtilizado("");
    }
}
function filtroUtilizado(apretado){
    contenedorFiltro.innerText = apretado;
    contenedorFiltro1.innerText = apretado;
    
}
function ordenarMayoraMenor(productos){
    const aux = productos.sort((a,b)=> b.precio - a.precio);
    cargarProductos(aux);
}
 function ordenarMenoraMayor(productos){
   const aux = productos.sort((a,b)=>  a.precio - b.precio );
   cargarProductos(aux);
}

//agrego elemento al carrito
function agregarAlCarrito(apretado,productos){
  const productoAgregado = productos.find(producto => producto.id === apretado);
  if(Carrito.some(producto => producto.id === apretado)){
    const index = Carrito.findIndex(producto => producto.id === apretado);
    Carrito[index].cantidad++;
    
  }else{
    productoAgregado.cantidad = 1;
    Carrito.push(productoAgregado);
  }
  ProductosEncarrito();
  localStorage.setItem("carrito",JSON.stringify(Carrito));
  bodyCarrito();
}

//spam de tamaño del carrito
function ProductosEncarrito(){
  textoChangito.innerText = Carrito.length;
  textoChangito2.innerText = Carrito.length; 
  
}
// cuerpo del carrito
function bodyCarrito(){
  
  if(Carrito.length == 0){
    cuerpoCarrito.innerHTML = `<div class="mensaje-vacio">
                               <p>El carrito esta vacio &#128546;</p> 
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
                  <h4>cantidad</h4>
                </div>
                <div class="cuerpo-caja">
                  <p> ${productox.cantidad}</p>
                </div>  
              </div>
              <div class="conteiner-talle">
                <div class="titulo">
                  <h4>Talle</h4>
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
                  <h4>precio</h4>
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
  totalApagar.innerText = totalApagar.innerText = "$"+total+"ARS";
 
}

function usuarioActivo(){
  iconUsuario.src = nuevaURL;
  iconUsuario2.src = nuevaURL;
  habilitarBotones();
  ocultarRutas();
}
function usuarioInactivo(){
  iconUsuario.src = "https://th.bing.com/th/id/OIP.k4QGYt_FPEcajz18OEfvFwHaHa?pid=ImgDet&w=191&h=191&c=7";
  iconUsuario2.src = "https://th.bing.com/th/id/OIP.k4QGYt_FPEcajz18OEfvFwHaHa?pid=ImgDet&w=191&h=191&c=7";
  deshabilitarBotones();
  mostrarRutas();
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
function filtrarProductos(productos, e){
  const textoBusqueda = e.target.value.toLowerCase();
  console.log(textoBusqueda);
  if(textoBusqueda.trim() === ""){
    cargarProductos(productos);
  }else{
    const productosFiltrados = productos.filter(producto =>
      producto.referencia.includes(textoBusqueda) ||
      producto.categorias.includes(textoBusqueda) ||
      producto.titulo.toLowerCase().includes(textoBusqueda) ||
      producto.marca.toLowerCase().includes(textoBusqueda) 
    );
  
    // Imprime los productos filtrados en la consola
    cargarProductos(productosFiltrados);
  }
  
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
btnComprar.addEventListener('click', e =>{
  Carrito.length === 0 ? mensajeCarritovacio():
  sesionIniciada === true ? mensajeCompra() : mensajeInicieSesion();
})
// Función para obtener parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}




obtenerProductos();
sesionIniciada === true ? usuarioActivo() : usuarioInactivo() ; 