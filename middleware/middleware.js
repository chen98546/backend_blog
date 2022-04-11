let middleware = {};

middleware.checkSessionAuth = (req, res, next) => {
    let reqPath = req.path.toLowerCase();
    let notAuth = ['/register', '/registerdata', '/login', '/logindata']
    if (notAuth.includes(reqPath)) {
        next();
    } else {
        if (req.session.record) {
            next();
        } else {
            res.redirect('/login');
            return;
        }
    }
}

module.exports = middleware