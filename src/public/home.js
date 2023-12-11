const socketClient = io();

const formProducts = document.getElementById("form-products");
const divProducts = document.getElementById("products");

formProducts.onsubmit = (e) => {
    e.preventDefault();
    socketClient.emit("showProducts");
};

socketClient.on("sendProducts", (products) => {
    const arrayProducts = products.map(i=>{
        const product = `<div>${i.title}</div>
        <div>${i.description}</div>
        <div>${i.price}</div>
        <div>${i.thumbnail}</div>
        <div>${i.code}</div>
        <div>${i.id}</div>
        <div>${i.stock}</div>
        <br>`
        return product
    }).join(" ")
    divProducts.innerHTML = arrayProducts
  });