const routes        = require('express').Router()
const authWorker    = require('../middlewares/authWorker')

routes.get('/',authWorker,(req,res) => {
    res.send('Ini halaman worker')
})


routes.get('/add',(req,res) => {
    res.send('Halaman menambahkan Worker')
})

routes.post('/add',(req,res) => {
    res.send('Worker telah ditambahkan')
})


routes.get('/edit/:id',(req,res) => {
    res.send('Halaman merubah data Worker')
})

routes.post('/edit/:id',(req,res) => {
    res.send('Data Worker telah dirubah')
})


routes.get('/delete/:id', (req,res) => {
    res.send('Hapus data Worker')
})


module.exports = routes;