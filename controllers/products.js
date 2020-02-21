const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        title: 'Add Product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const newProduct = new Product(req.body.title);
    newProduct.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        console.log(products);
        res.render('shop', {prods: products, docTitle: 'My Shop', path: '/shop', title: 'Shop'});
    });
}