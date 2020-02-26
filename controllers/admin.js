const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    const newProduct = new Product(req.body.title);
    newProduct.save();
    res.redirect('/');
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        path: '/admin/add-product',
        title: 'Add Product',
        editing: false,
    });
}

exports.postAddProduct = (req, res, next) => {
    const newProduct = new Product(req.body.title, req.body.imageURL, req.body.description, req.body.price);
    newProduct.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    Product.findById(req.params.productId, (product) => {
        if (!product) {res.redirect('/');}
        res.render('admin/edit-product', {
            path: '/admin/edit-product',
            title: 'Edit Product',
            editing: editMode,
            product: product,
        });
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {prods: products, docTitle: 'Admin Products', path: '/admin/products', title: 'Admin Products'});
    });
}

exports.editProduct = (req, res, next) => {
    const product = new Product(req.params.productId, req.body.title, req.body.imageURL, req.body.description, req.body.price);
    product.save();
    res.redirect('/admin/products');
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
}