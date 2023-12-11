import { productsManager } from "../dao/products.dao.js"


export const findAllProducts = (obj) => {
    const users = productsManager.findAll(obj)
    return users
}

export const findProductById = (id) => {
    const user = productsManager.findById(id)
    return user
}

export const upDateProductById = (pid,data) => {
    const user = productsManager.updateOne(pid,data)
    return user
}

export const create = (data) => {
    const user = productsManager.createOne(data)
    return user
}

export const deleteProductById = (id) => {
    const user = productsManager.deleteOne(id)
    return user
}