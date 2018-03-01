const routes        = require('express').Router()
const authWorker    = require('../middlewares/authWorker')
const models = require('../models')



routes.get('/',authWorker,(req,res) => {
    models.Worker.findById(req.session.userid)
    .then(workers => {
        res.render('worker/homeWorker', {workers:workers})
    })
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


routes.get('/profile/:id', (req,res) => {
    models.Worker.findById(req.session.userid)
    .then(workers => {
        res.render('worker/profileWorker', {workers:workers})
    })
})

routes.post('/profile/:id', (req,res) => {
    let objWorker = {
        name: req.body.full_name,
        email: req.body.email,
        telp: req.body.telp
    }

    models.Worker.update(objWorker, {
        where: {
            id: req.params.id
        }
    }).then(workers => {
        // res.send(workers)
        res.redirect('/worker')
    }).catch(err => {
        res.send(err)
    })
})

module.exports = routes;