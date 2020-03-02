const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    console.log(prodId);
    const product = await Product.findById(prodId);
    res.render('shop/product-details', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts();
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cartProducts
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const cart = await req.user.getCart()

    const products = await cart.getProducts({where: {id: prodId}});
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    
    let quantity = 1;
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      quantity = oldQuantity + 1;
      await cart.addProduct(product, {
        through: {
          quantity: quantity
        }
      });
    } else {
      const fetchedProduct = await Product.findByPk(prodId);
      await cart.addProduct(fetchedProduct, {
        through: {
          quantity: quantity
        }
      });
    }

    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({where: {id: prodId}});
    const product = products[0];

    cart.removeProduct(product);

    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    const order = await req.user.createOrder();
    await order.addProducts(products.map(pr => {
      pr.orderItem = {quantity: pr.cartItem.quantity};
      return pr;
    }));

    await cart.setProducts(null);

    res.redirect('/orders')    
  } catch (error) {
    console.log(error);
  }
}

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({include: ['products']});
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
