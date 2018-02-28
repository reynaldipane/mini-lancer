const routes = require('express').Router()

routes.get('/',(req,res)=>{
    res.send('Ini halaman Recruiter')
})

module.exports = routes;