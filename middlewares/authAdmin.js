function cekLogin(req,res,next) {
    if (req.session.userid && req.session.role == "admin") {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports =cekLogin;