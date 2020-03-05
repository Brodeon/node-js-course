const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    cart: {
        items: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                require: true
            }, 
            quantity: {
                type: Number,
                require: true
            }
        }]
    }

});

userSchema.methods.addToCart = async function(product) {
    try {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({productId: product._id, quantity: newQuantity});
        }

        const updatedCart = {items: updatedCartItems};
        this.cart = updatedCart;
        return this.save();
        // .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = mongoose.model('User', userSchema);







// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class User {
//     constructor(username, email, cart, id) {
//         this.username = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id; 
//     }

//     async save() {
//         const db = getDb();
//         return await db.collection('users').insertOne(this);
//     }

    // async addToCart(product) {
    //     try {
    //         const cartProductIndex = this.cart.items.findIndex(cp => {
    //             return cp.productId.toString() === product._id.toString();
    //         });

    //         let newQuantity = 1;
    //         const updatedCartItems = [...this.cart.items];
            
    //         if (cartProductIndex >= 0) {
    //             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    //             updatedCartItems[cartProductIndex].quantity = newQuantity;
    //         } else {
    //             updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity});
    //         }

    //         const updatedCart = {items: updatedCartItems};
    //         const db = getDb();
    //         db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}});
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

//     static async findById(id) {
//         const db = getDb();
//         const user = await db.collection('users').findOne({_id: new mongodb.ObjectId(id)});
//         return new User(user.username, user.email, user.cart, user._id);
//     }

//     async getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map(pr => {
//             return pr.productId;
//         });
//         let cartProducts = await db.collection('products').find({_id: {
//             $in: productIds
//         }});
//         cartProducts = await cartProducts.toArray();
//         return cartProducts.map(pr => {
//             return {...pr, quantity: this.cart.items.find(p => {
//                 return p.productId.toString() === pr._id.toString();
//             }).quantity}
//         });
//     }

//     async addOrder() {
//         const db = getDb();
//         const products = await this.getCart();
//         const order = await db.collection('orders').insertOne({
//             items: products,
//             user: {
//                 _id: new mongodb.ObjectId(this._id),
//                 username: this.username,
//                 email: this.email,
//             }
//         });
//         this.cart = [];
//         await db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {
//             $set: {
//                 cart: {
//                     items: this.cart
//                 }
//             }
//         });
//     }

//     async getOrders() {
//         const db = getDb();
//         const orders = await db.collection('orders').find({'user._id': new mongodb.ObjectId(this._id)});
//         return orders.toArray();
//     }

//     async deleteItemFromCart(id) {
//         const db = getDb();
//         const updatedCartItems = this.cart.items.filter(i => {
//             return i.productId.toString() !== id.toString();
//         });
//         console.log(updatedCartItems);

//         await db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {
//             $set: {
//                 cart: {
//                     items: updatedCartItems
//                 }
//             }
//         });
//     }

    

// }

// module.exports = User;