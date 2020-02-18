const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        title: 'Add Product'
    });
}) 

router.post('/product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.products = products;
exports.routes = router;