import { cartsManager } from "../daos/mongoDB/cartsManagerDB.js"

export const findAllCarts = () => {
    const carts = cartsManager.findAll()
    return carts
}

export const cartBydId = (id) => {
    const cart = cartsManager.findCartById(id)
    return cart
}

export const addProductCart = (idCart, idProduct) => {
    const response = cartsManager.findCartById(idCart, idProduct)
    return response
}

export const createCart = () => {
    const cart = cartsManager.createCart()
    return cart
}

export const quantityUpdateCart = (cid,pid,quantity) => {
    const cart = cartsManager.quantityUpdate(cid,pid,quantity)
    return cart
}

export const cartUpdate = (cid,arrayProducts) => {
    const cart = cartsManager.cartUpdate(cid,arrayProducts)
    return cart
}

export const deleteProducttoCart = (cid,pid) => {
    const cart = cartsManager.deleteProductOfCart(cid,pid)
    return cart
}

export const deleteCartProducts = (cid) => {
    const cart = cartsManager.deleteCartProducts(cid)
    return cart
}