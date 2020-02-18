const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.pug')); //bez puga

    const products = adminData.products;
    res.render('shop', {prods: products, docTitle: 'My Shop', path: '/shop', title: 'Shop'}); //z pugiem
})

module.exports = router;