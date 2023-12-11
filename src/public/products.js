const socketClient = io();
const ButtonProducts = document.getElementById("button-products");
const productsView = document.getElementById("products-view");

ButtonProducts.onclick = () => {
    socketClient.emit("showProducts");
};

socketClient.on("sendProducts", (products) => {
    console.log(products)
    const divProducts = products.payload.docs.map(p=>{
        const product = `<div>${p.name}</div>
        <div>${p.description}</div>
        <div>${p.price}</div>
        <div>${p.stock}</div>
        <button>Agregar al Carrito</button>
        <br>`
        return product
    }).join(" ")
    productsView.innerHTML = divProducts;
  });