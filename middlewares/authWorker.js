function cekLogin(req,res,next) {
    if (req.session.userid && req.session.role == "worker") {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = cekLogin;