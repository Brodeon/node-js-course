const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');

const app = express();

app.set('view engine', 'pug');
// app.set('views', 'views'); //domyślnie jest pod folder views

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));


app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {title: 'Page not found'});
});

app.listen(3000);
 