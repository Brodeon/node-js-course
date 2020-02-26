const fs = require('fs');
const pa = require('path');

const products = [];

module.exports = class Product {
    
    constructor(id = null, title, imageUrl, description, price) {
        this.title = title;
        this.id = id;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        Product.getProductsFromFile(products => {
            if (this.id) {
                console.log('editing');
                const existingProductIndex = products.findIndex(pr => pr.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                const p = pa.join(pa.dirname(process.mainModule.filename), 'data', 'products.json');
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                console.log('not editing');
                this.id = Math.random().toString();
                Product.getProductsFromFile(products => {
                    const p = pa.join(pa.dirname(process.mainModule.filename), 'data', 'products.json');
                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        console.log(err);
                    });
                });
            }
        });
    }

    static fetchAll(cb) {
        Product.getProductsFromFile(cb);
    }

    static getProductsFromFile = (cb) =>  {
        const p = pa.join(pa.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, data) => {
            if (err) {
                cb([]);
            }

            cb(JSON.parse(data));
        });
    }

    static findById(id, cb) {
        this.getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static deleteById(id) {
        Product.getProductsFromFile(products => {
            const updatedProducts = products.filter(pr => pr.id !== id);
            const p = pa.join(pa.dirname(process.mainModule.filename), 'data', 'products.json');
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                console.log(err);
            });
        });
    }

}