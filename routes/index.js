const routes = require('express').Router()

routes.get('/',(req,res) => {
    res.send('hallo')
})

module.exports = routes;