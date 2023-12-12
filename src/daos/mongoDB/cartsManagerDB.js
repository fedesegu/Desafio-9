import { cartsModel } from "../../dao/models/carts.model.js";
import { productsManager } from "../../daos/mongoDB/productManagerDB.js";

class CartsManager {
    async findAll() {
        const result = await cartsModel.find();
        return result;
    }
    

    async findById(id) {
        const result = await cartsModel.findById(id)
        .populate({
            path: "products.product",
            model: "Products", 
            select: ["title", "description", "price", "stock", "code", "category", "status", "thumbail"]
        });
        return result;
    }

    async createOne() {
        const newCart = {
            products: []
        };
        const result = await cartsModel.create(newCart);
        return result;
    }
    

    
    async addProductToCart(cid, pid) {
        const selectedCart = await cartsModel.findById(cid);
        if (selectedCart) {
            const productIndex = selectedCart.products.findIndex(p => p.product.equals(pid));   
            console.log(productIndex);
            if (productIndex !== -1) {
                selectedCart.products[productIndex].quantity += 1;
            } else {
                selectedCart.products.push({
                    product: pid,
                    quantity: 1,
                });
            }   
            
            const totalProducts = selectedCart.products.reduce((total, product) => total + product.quantity, 0);
            let totalPrice = 0;
            selectedCart.products.forEach(async cartProduct => {
                const product = await productsManager.findById(cartProduct.product);
                const productPriceUnit = product ? product.price : 0;
                const individualProductPrice = cartProduct.quantity * productPriceUnit;
                totalPrice += individualProductPrice;
            });
            selectedCart.totalProducts = totalProducts;
            selectedCart.totalPrice = totalPrice;
            console.log(totalProducts, totalPrice);
            return (selectedCart.save());
        }
    }   
    async deleteOne(cid, pid) {
        const selectedCart = await cartsModel.findById(cid);
    
        if (selectedCart) {
            const productIndex = selectedCart.products.findIndex(p => p.product.equals(pid));
            if (productIndex !== -1) {
                if (selectedCart.products[productIndex].quantity > 1) {
                    selectedCart.products[productIndex].quantity -= 1;
                } else {
                    selectedCart.products.splice(productIndex, 1);
                } 
                const totalProducts = selectedCart.products.reduce((total, product) => total + product.quantity, 0);
                let totalPrice = 0;
                selectedCart.products.forEach(async cartProduct => {
                    const product = await productsManager.findById(cartProduct.product);
                    const productPriceUnit = product ? product.price : 0;
                    const individualProductPrice = cartProduct.quantity * productPriceUnit;
                    totalPrice += individualProductPrice;
                });
                selectedCart.totalProducts = totalProducts;
                selectedCart.totalPrice = totalPrice;   
                return selectedCart.save();
            }
        }
    }
    async deleteAll(cid) {
        const selectedCart = await cartsModel.findById(cid);
        if (selectedCart) {
            selectedCart.products = [];

        } else {
            res.status(200).json({ message: "Cart not found"});
        }
        selectedCart.totalProducts = 0,
        selectedCart.totalPrice = 0
        return selectedCart.save();
    }

    async update(cid, pid, quantity) {
        const selectedCart = await cartsModel.findById(cid);
        if (selectedCart) {
            const productIndex = selectedCart.products.findIndex(p => p.product.equals(pid));
            console.log(productIndex);
            if (productIndex !== -1) {
                selectedCart.products[productIndex].quantity = quantity;
            } else {            
                selectedCart.products.push({ product: pid, quantity: quantity });
            }     
            const totalProducts = selectedCart.products.reduce((total, product) => total + product.quantity, 0);
                let totalPrice = 0;
                selectedCart.products.forEach(async cartProduct => {
                    const product = await productsManager.findById(cartProduct.product);
                    const productPriceUnit = product ? product.price : 0;
                    const individualProductPrice = cartProduct.quantity * productPriceUnit;
                    totalPrice += individualProductPrice;
                });
                selectedCart.totalProducts = totalProducts;
                selectedCart.totalPrice = totalPrice;       
            return selectedCart.save();
        }
    }
    
};

export const cartsManager = new CartsManager();