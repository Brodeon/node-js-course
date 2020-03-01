const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');
const errorController = require('./controllers/error');
const database = require('./util/database');
// const sequelize = require('./util/sql/database');
// const Product = require('./models/product')
// const User = require('./models/user');
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

app.use(errorController.get404);

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

database.mongoConnect(() => {
    app.listen(3000);
}); 