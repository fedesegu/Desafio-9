const socketClient = io();

const formAdd = document.getElementById("form-realtimeAdd");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputThumbnail = document.getElementById("thumbnail");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const divProductsRealTime = document.getElementById("products-realtime");


const formDelete = document.getElementById("form-realtimeDelete");
const inputIdProduct = document.getElementById("product-delete");

formDelete.onsubmit = (e) => {
    e.preventDefault();
    const id = inputIdProduct.value
    socketClient.emit("deleteProduct",id);
};

formAdd.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value
    const description = inputDescription.value
    const price = inputPrice.value
    const thumbnail = inputThumbnail.value
    const code = inputCode.value
    const stock = inputStock.value
    socketClient.emit("addProduct",{title,description,price,thumbnail,code,stock});
};

socketClient.on("productUpdated", (products) => {
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
    divProductsRealTime.innerHTML = arrayProducts
  });