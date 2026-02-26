class Producto {
    constructor(codigo, nombre, marca, cantidad, costo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.marca = marca;
        this.cantidad = cantidad;
        this.costo = costo;
    }
}

class Inventario {
    constructor() {
        this.listaProductos = new Map(); // El Map es como un diccionario que guarda "llave: valor". En este caso, la "llave" será el código del producto y el "valor" será el objeto Producto completo.
    }

    agregar(producto) {
        if (this.listaProductos.has(producto.codigo)) { // map.has(llave) nos dice si ya existe esa "llave" en el Map
            mostrarMensaje("Error: El código ya existe.", "error");
            return false; 
        }
        this.listaProductos.set(producto.codigo, producto); // map.set(llave, valor) agrega un nuevo par "llave: valor" al Map. Aquí la "llave" es el código del producto y el "valor" es el objeto Producto completo.
        mostrarMensaje("¡Producto guardado con éxito!", "exito");
        
        console.log(this.listaProductos); 
        return true;
    }
}

const miInventario = new Inventario();

function mostrarMensaje(texto, tipo) {
    const contenedor = document.getElementById("contenedor-mensajes");
    
    const divMensaje = document.createElement("div");
    divMensaje.textContent = texto;
    divMensaje.classList.add("mensaje", tipo);

    contenedor.appendChild(divMensaje); // appendChild hace que el mensaje aparezca en la página

    
    setTimeout(() => { // setTimeout hace que algo pase después de cierto tiempo (3000 milisegundos = 3 segundos)
        divMensaje.remove();
    }, 3000);
}

const formulario = document.getElementById("formulario-producto");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Evita que la página se recargue sola al dar clic en guardar

    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const marca = document.getElementById("marca").value;
    // parseFloat y parseInt = texto a números reales
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const costo = parseFloat(document.getElementById("costo").value);

    if (cantidad <= 0) {
        mostrarMensaje("Error: La cantidad debe ser mayor a 0", "error");
        return; // El "return" frena el código aquí, para que no guarde el producto
    }

    if (costo <= 0) {
        mostrarMensaje("Error: El costo debe ser mayor a 0", "error");
        return;
    }

    const nuevoProducto = new Producto(codigo, nombre, marca, cantidad, costo);

    const seGuardo = miInventario.agregar(nuevoProducto);

    // Si se guardó correctamente, limpiamos el formulario para agregar uno nuevo
    if (seGuardo) {
        formulario.reset(); // reset() limpia todos los campos del formulario
    }

});
