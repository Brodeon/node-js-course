const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
// const sequelize = require('./util/sql/database');
// const Product = require('./models/product')
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');


const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));

app.use(async (req, res, next) => {
    const user = await User.findById('5e6143bba675e136605b46c5');
    req.user = user;
    next();
});

// app.use(async (req, res, next) => {
//     try {
//         const user = await User.findByPk(1);
//         req.user = user;
//         next();
//     } catch (error) {
//         console.log(user);
//     }
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//        result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// let data;

// app.get('/test/:page', (req, res, next) => {
//     if (!data) {
//         data = [];
//         for (let i = 0; i < 700; i++) {
//             data.push({
//                 firstName: makeid(7),
//                 lastName: makeid(15),
//                 email: makeid(5) + '@email.com'
//             });
//         }

//     }

//     res.json(data.slice(20 * req.params.page, 20 * req.params.page + 20));
// });

app.use(errorController.get404);

mongoose.set('debug', false);

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    // const user = new User({
    //     username: 'brodeon',
    //     email: 'brodeon@email.com',
    //     cart: {
    //         items: []
    //     }
    // });

    // user.save();
    app.listen(3000);
})

// Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
// User.hasMany(Product);

// User.hasOne(Cart, {constraints: true});
// Cart.belongsTo(User);

// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});

// User.hasMany(Order, {constraints: true});
// Order.belongsTo(User);

// Order.belongsToMany(Product, {through: OrderItem});
// Product.belongsToMany(Order, {through: OrderItem});

// sequelize
//     .sync()
//     .then(async (result) => {
//         try {
//             const user = await User.findByPk(1);
//             if (!user) {
//                 user = await User.create({
//                     name: 'Przemek',
//                     email: 'Przemek@email.com'
//                 });

//                 await user.createCart();                
//             } else {

//             }
//         } catch (error) {
//             throw error;
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     });