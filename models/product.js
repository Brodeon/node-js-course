const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    async save() {
        try {
            const db = getDb();
            return db.collection('products').insertOne(this);
        } catch (error) {
            console.log(error);
        }
    }

    static async fetchAll() {
        try {
            const db = getDb();
            const products = await db.collection('products').find().toArray();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    static async findById(prodId) {
        try {
            const db = getDb();
            const product = await db.collection('products').findOne({_id: new mongodb.ObjectId(prodId)})
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteProduct(prodId) {
        try {
            const db = getDb();
            await db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
        } catch (error) {
            console.log(error);
        }
    }

    static async updateProduct(prodId, product) {
        try {
            const db = getDb();
            await db.collection('products').updateOne({_id: new mongodb.ObjectId(prodId)}, {$set: product});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Product;
