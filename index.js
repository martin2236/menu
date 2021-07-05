function main(){
   //fetch platos del json
 document.addEventListener("DOMContentLoaded", ()=>{
     dataJson()
 })
    
const dataJson = async()=>{
    try{
        const res= await fetch("api.json")
        const data = await res.json()
        //console.log(data)
        crearEl(data)
    }catch(error){
        console.log(error)
    }
}
 ///templates

const tarjetas = document.querySelector(".formulario");
const template = document.querySelector(".template").content
const fragment = document.createDocumentFragment()


const crearEl = data =>{
    data.forEach(prod =>{
        template.querySelector("h5").textContent = prod.nombre
        template.querySelector(".p-platos").textContent = prod.precio
        template.querySelector("img").setAttribute("src",prod.imagen)
        template.querySelector(".btn").dataset.id = prod.id
        const clone = template.cloneNode(true)
        
        fragment.appendChild(clone) //esto es muy importante
        
        tarjetas.appendChild(fragment);
    })
}

    ///pedido
const platos = document.querySelector(".formulario")
let carrito = {};


platos.addEventListener("click",(e)=>{
if (e.target.classList.contains("btn")){
     pedido(e.target.parentElement)
 } 
 e.stopPropagation()
})

const pedido = objeto =>{
    const producto = {
        id:objeto.querySelector(".btn").dataset.id,
        nombre:objeto.querySelector("h5").textContent,
        precio:objeto.querySelector(".p-platos").textContent,
        cantidad:1
    }
    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito();
    
}
/// carrito de compras
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content 
const items = document.getElementById("items")
const footer = document.getElementById("footer")

const pintarCarrito=()=>{
   console.log(Object.values(carrito)) 
     items.innerHTML=""  // con esto no se multiplican los productos evita que se sobre escriba 
   Object.values(carrito).forEach(producto =>{                //utilizar Object.values para poder iterar
         templateCarrito.querySelector("th").textContent = producto.id
         templateCarrito.querySelectorAll("td")[0].textContent = producto.nombre    //al utilizar queryselectorAll se forma un array
         templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad     // por lo que podemos indicar a que posición queremos afectar utilizando Ej : [0]
         templateCarrito.querySelector(".btn-info").dataset.id = producto.id           
         templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
         templateCarrito.querySelector("span").textContent = producto.precio * producto.cantidad

         const clon = templateCarrito.cloneNode(true)
        fragment.appendChild(clon)
      
     })
   items.appendChild(fragment)
} 
const escribirFooter = () =>{
    footer.innerHTML = ""
    if (Object.keys(carrito).length === 0){            //pregunta si el carrito esta vacio
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
    }
   
}
 const nCantidades = Object.values(carrito).reduce((acc,{cantidad})=>acc + cantidad ,0)            //acc es un acumulador que suma todas las cantidades
console.log(nCantidades)

}



main()