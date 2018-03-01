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
        if(worker.WorkerServices.length > 0) {
            let arrId = [];

            for(let i = 0; i < worker.WorkerServices.length; i++) {
                arrId.push(worker.WorkerServices[i].ServiceId)
            }

            models.Service.findAll({
                where : { id : {[Op.notIn] : arrId}}
            })
            .then(services => {
                models.Service.findAll({
                    where : { id : {[Op.in] : arrId}}
                })
                .then(servicesOwned => {
                    res.render('../views/worker/assign-service',{worker:worker,services:services,servicesOwned:servicesOwned});
                })
            })
        } else {
            let servicesOwned = []
            models.Service.findAll()
            .then(services => {
                res.render('../views/worker/assign-service',{worker:worker,services:services,servicesOwned : servicesOwned});
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

routes.get('/:id/profile', authWorker,  (req,res) => {
    models.Worker.findById(req.session.userid)
    .then(workers => {
        res.render('worker/profileWorker', {workers:workers})
    })
})

routes.post('/:id/profile', authWorker, (req,res) => {
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
        res.redirect('/worker')
    }).catch(err => {
        res.send(err)
    })
})

routes.get('/:id/orderlist', authWorker,(req,res) => {
    models.Transaction.findAll({
        where : { WorkerId : req.params.id},
        include: [{model : models.Service},{model : models.Worker},{model : models.Recruiter}],
        attributes: ['id','status']
    })
    .then(orders=>{
        // res.send(orders)
        res.render('../views/worker/order-list',{orders : orders})
    })
})

routes.get('/:idtransaction/acceptorder',authWorker,(req,res) => {
        models.Transaction.update(
            {
                status : "accept"
            },
            {
                where : {id : req.params.idtransaction}
            }
        )
        .then(() => {
            models.Worker.update(
                {
                    status : 0
                },
                {
                    where : {id : req.session.userid}
                }
            )
            .then(() => {
                res.redirect(`/worker/${req.session.userid}/orderlist`)
            })
            .catch(err=>{
                res.send(err)
            })
        })
        .catch(err=>{
            res.send(err)
        })
})

routes.get('/:idtransaction/rejectorder',authWorker,(req,res) => {
    models.Transaction.update(
        {
            status : "reject"
        },
        {
            where : {id : req.params.idtransaction}
        },
    )
    .then(()=>{
        res.redirect(`/worker/${req.session.userid}/orderlist`)
    })
    .catch(err=>{
        res.send(err)
    })
})
module.exports = routes;