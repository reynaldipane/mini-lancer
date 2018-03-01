const routes        = require('express').Router()
const authRecruiter = require('../middlewares/authRecruiter')
const models         = require('../models')
const Op            = require('sequelize').Op

routes.get('/', authRecruiter, (req,res) => {
    res.render('../views/recruiter/recruiter-dashboard',{ userid : req.session.userid})
})


routes.get('/:id/searchjasa',(req,res) => {
    models.WorkerService.findAll({
        include : [{model : models.Service}, {model : models.Worker}]
    })
    .then(workerservices => {
        models.Service.findAll()
        .then(services => {
            res.render('../views/recruiter/search-jasa',{workerservices : workerservices, services:services, userid:req.session.userid})
        })
    })
    .catch(err => {
        res.send(err)
    })
})

routes.post('/:id/searchjasa', (req,res) => {
    if(req.body.jenis_jasa == "Asisten Rumah Tangga") {
        models.WorkerService.findAll({
            include : [
                {model : models.Service,
                 where : {
                    name : {[Op.iLike] : req.body.jenis_jasa}
                 }
                },
                {model : models.Worker}]
        })
        .then(workerservices => {
            models.Service.findAll()
            .then(services => {
                res.render('../views/recruiter/search-jasa',{workerservices : workerservices, services:services, userid:req.session.userid})
            })
        })
    } else if (req.body.jenis_jasa == "Cleaning Service") {
        models.WorkerService.findAll({
            include : [
                {model : models.Service,
                 where : {
                    name : {[Op.iLike] : req.body.jenis_jasa}
                 }
                },
                {model : models.Worker}]
        })
        .then(workerservices => {
            models.Service.findAll()
            .then(services => {
                res.render('../views/recruiter/search-jasa',{workerservices : workerservices, services:services, userid:req.session.userid})
            })
        })
    } else if (req.body.jenis_jasa == "Security") {
        models.WorkerService.findAll({
            include : [
                {model : models.Service,
                 where : {
                    name : {[Op.iLike] : req.body.jenis_jasa}
                 }
                },
                {model : models.Worker}]
        })
        .then(workerservices => {
            models.Service.findAll()
            .then(services => {
                res.render('../views/recruiter/search-jasa',{workerservices : workerservices, services:services, userid:req.session.userid})
            })
        })
    } else if (req.body.jenis_jasa == "Baby Sitter") {
        models.WorkerService.findAll({
            include : [
                {model : models.Service,
                 where : {
                    name : {[Op.iLike] : req.body.jenis_jasa}
                 }
                },
                {model : models.Worker}]
        })
        .then(workerservices => {
            models.Service.findAll()
            .then(services => {
                res.render('../views/recruiter/search-jasa',{workerservices : workerservices, services:services, userid:req.session.userid})
            })
        })
    }
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