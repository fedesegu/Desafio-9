const socketClient = io();
const form = document.getElementById("form");
const inputPrice = document.getElementById("price");
const priceP = document.getElementById("priceP");


form.onsubmit = (e) => {
  e.preventDefault();
  const price = inputPrice.value;
  socketClient.emit("newPrice", price);
};

socketClient.on("priceUpdated", (price) => {
  priceP.innerText = price[0].title;
});

