const routes        = require('express').Router()
const authWorker    = require('../middlewares/authWorker')
const models        = require('../models')
const Op            = require('sequelize').Op

routes.get('/',authWorker,(req,res) => {
    models.Worker.findById(req.session.userid)
    .then(workers => {
        res.render('worker/homeWorker', {workers:workers})
    })
})


routes.get('/:id/assignservice',authWorker,(req,res) => {
    models.Worker.findOne({
        where : { id : req.params.id},
        include : [{model : models.Service}, {model: models.WorkerService}]
    })
    .then(worker => {
        if(worker.Services.length > 0) {
            let arrId = [];

            for(let i = 0; i < worker.Services.length; i++) {
                arrId.push(worker.Services[i].id)
            }

            models.Service.findAll({
                where : { id : {[Op.notIn] : arrId}}
            })
            .then(services => {
                // res.send(worker)
                res.render('../views/worker/assign-service',{worker:worker,services:services});
            })
        } else {
            models.Service.findAll()
            .then(services => {
                res.render('../views/worker/assign-service',{worker:worker,services:services});
            })
        }
    })
})

routes.post('/:id/assignservice', authWorker, (req,res) => {
    models.WorkerService.create({
        WorkerId : req.params.id,
        ServiceId : req.body.service
    })
    .then(() => {
        res.redirect(`/worker/${req.params.id}/assignservice`)
    })
    .catch(err=>{
        res.send(err)
    })
})

routes.get('/:id/profile', (req,res) => {
    models.Worker.findById(req.session.userid)
    .then(workers => {
        res.render('worker/profileWorker', {workers:workers})
    })
})

routes.post('/:id/profile', (req,res) => {
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