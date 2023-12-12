import { Router } from "express";
import { messagesManager } from "../daos/mongoDB/messageManagerDB.js";
import { usersManager } from "../daos/mongoDB/usersManagerDB.js";
import { productsManager } from "../daos/mongoDB/productManagerDB.js";
import { cartsManager } from "../daos/mongoDB/cartsManagerDB.js";

const router = Router();

router.get("/chat", async (req, res) => {
  if(!req.session.user){
    res.redirect(`/login`);
  }else{
  const messages = await messagesManager.findAll();
  const {username } = username;
  res.render("chat", { messages, username });
  }
});

router.get("/products", async (req, res) => {
  const products = await productsManager.findAggregation(req.query);
  res.render("products", { products: products });
});

router.get("/cart/:idCart", async (req, res) => {
  const {idCart} = req.params;
  const cartProducts = await cartsManager.findProductsInCart(idCart);
  res.render("cart", {idCart, products:cartProducts} );
});

router.get("/signup", (req, res) => {
  if(req.session.user){
    res.redirect(`/profile/${req.session.user.userId}`);
  }else{
    res.render("signup");
  }
});

router.get("/login", async (req, res) => {
  if(req.session.user){
    res.redirect(`/profile/${req.session.user.userId}`);
  }else{
    res.render("login");
  }
});

router.get("/profile/:idUser", async (req, res) => {
  if(!req.session.user){
    res.redirect(`/login`);
  }else{
  const { idUser } = req.params;
  const user = await usersManager.findById(idUser);
  const products = await productsManager.findAll();
  const { first_name, last_name, username } = user;
  res.render("profile", { first_name, last_name, username, products });
  }
});

router.get("/profile",(req, res)=>{
  /*
  console.log("probando", req);
  res.render("profile", {user:{first_name:"", username:""}});
  */
  if (!req.session.passport){
    return res.redirect("/login");
  }
  const {username} = req.user;
  res.render("profile", {username});
});

router.get("/restaurar",(req, res) =>{
  res.render("restaurar");
});

router.get("/error",(req, res)=>{
  res.render("error");
});

export default router;