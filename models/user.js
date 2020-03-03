const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id; 
    }

    async save() {
        const db = getDb();
        return await db.collection('users').insertOne(this);
    }

    async addToCart(product) {
        try {
            const updatedCart = {items: [{...product, quantity: 1}]};
            const db = getDb();
            db.collection('users').updateOne({_id: new mongodb.ObjectId(new mongodb.ObjectId(this._id))}, {$set: {cart: updatedCart}});


        } catch (error) {
            console.log(error);
        }
    }

    static async findById(id) {
        const db = getDb();
        const user = await db.collection('users').findOne({_id: new mongodb.ObjectId(id)});
        return new User(user.username, user.email, user.cart, user._id);
    }

    

}

module.exports = User;