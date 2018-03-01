const routes        = require('express').Router()
const authRecruiter = require('../middlewares/authRecruiter')

routes.get('/', authRecruiter, (req,res) => {
    res.send('Ini halaman recruiter')
})


routes.get('/add',(req,res) => {
    res.send('Halaman menambahkan Recruiter')
})

routes.post('/add',(req,res) => {
    res.send('Recruiter telah ditambahkan')
})


routes.get('/edit/:id',(req,res) => {
    res.send('Halaman merubah data Recruiter')
})

routes.post('/edit/:id',(req,res) => {
    res.send('Data Recruiter telah dirubah')
})


routes.get('/delete/:id', (req,res) => {
    res.send('Hapus data Recruiter')
})


module.exports = routes;