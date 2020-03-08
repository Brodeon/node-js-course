exports.login = (req, res, next) => {
    const isLoggedIn = console.log(req.get('Cookie').trim().split('=')[1]);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
    });
}

exports.postLogin = (req, res, next) => {
    req.isLoggedIn = true;
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
}