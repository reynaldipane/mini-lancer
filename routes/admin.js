const routes        = require('express').Router()
const authAdmin     = require('../middlewares/authAdmin')

routes.get('/', authAdmin, (req,res) => {
    res.send('Ini halaman admin')
})

module.exports = routes;