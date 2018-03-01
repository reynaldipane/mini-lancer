const routes        = require('express').Router()
const authRecruiter = require('../middlewares/authRecruiter')

routes.get('/', authRecruiter, (req,res) => {
    res.send('Ini halaman recruiter')
})

module.exports = routes;