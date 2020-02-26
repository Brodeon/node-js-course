const product = require('./product');
const pa = require('path');
const fs = require('fs');

const p = pa.join(pa.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {

    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const existingIndex= cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProduct] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
    }

    static deleteProductById(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }

            const cart = JSON.parse(fileContent);

            const updatedProducts = cart.products.filter(pr => pr.id !== id);
            const updatedPrice = cart.totalPrice - productPrice;

            cart.products = updatedProducts;
            cart.totalPrice = updatedPrice;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
    }

}