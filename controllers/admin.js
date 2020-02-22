const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    const newProduct = new Product(req.body.title);
    newProduct.save();
    res.redirect('/');
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        title: 'Add Product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const newProduct = new Product(req.body.title, req.body.imageURL, req.body.description, req.body.price);
    newProduct.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {prods: products, docTitle: 'Admin Products', path: '/admin/products', title: 'Admin Products'});
    });
}