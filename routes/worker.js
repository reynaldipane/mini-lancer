const routes        = require('express').Router()
const authWorker    = require('../middlewares/authWorker')

routes.get('/',authWorker,(req,res) => {
    res.send('Ini halaman worker')
})

module.exports = routes;