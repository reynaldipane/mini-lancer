const routes        = require('express').Router()
const authRecruiter = require('../middlewares/authRecruiter')
const models         = require('../models')
const Op            = require('sequelize').Op

routes.get('/', authRecruiter, (req,res) => {
    res.render('../views/recruiter/recruiter-dashboard',{ userid : req.session.userid})
})


routes.get('/:id/searchjasa', authRecruiter,(req,res) => {
    models.WorkerService.findAll({
        include : [{model : models.Service}, {model : models.Worker, where : { status : 1 }}]
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

routes.post('/:id/searchjasa', authRecruiter, (req,res) => {
    models.WorkerService.findAll({
        include : [
            {model : models.Service,
             where : {
                name : {[Op.iLike] : req.body.jenis_jasa}
             }
            },
            {model : models.Worker, where : { status : 1 }}]
    })
    .then(workerservices => {
        models.Service.findAll()
        .then(services => {
            res.render('../views/recruiter/search-jasa',{workerservices : workerservices, services:services, userid:req.session.userid})
        })
    })
})

routes.get('/orderservice', authRecruiter, (req,res)=>{
    models.Transaction.create({
        WorkerId : req.query.WorkerId,
        ServiceId : req.query.ServiceId,
        RecruiterId : req.query.RecruiterId,
        status : "pending"
    })
    .then(() => {
        res.redirect(`/recruiter/${req.session.userid}/transactionlist`)
    })
    .catch(err=>{
        res.send(err)
    })
})

routes.get('/:id/transactionlist',authRecruiter,(req,res) => {
    models.Transaction.findAll({
        where : { RecruiterId : req.session.userid},
        include: [{model : models.Service}, {model : models.Recruiter}, {model : models.Worker}],
        attributes : ['id','status']
    })
    .then(transactions => {
        res.render('../views/recruiter/transaction-list',{transactions : transactions})
    })
    .catch(err => {
        res.send(err)
    })
})

routes.get('/markdone/:idtransaction/worker/:idworker', (req,res) => {
    models.Transaction.update({
        status : "done"
    },{
        where : {id : req.params.idtransaction}
    })
    .then(() => {
        models.Worker.update({
            status : 1
        },{
            where : {id : req.params.idworker}
        })
        .then(() => {
            res.redirect(`/recruiter/${req.session.userid}/transactionlist`)            
        })
        .catch(err=> {
            res.send(err)
        })
    })
    .catch(err => {
        res.send(err)
    })
})

routes.get('/viewworker/:idworker', authRecruiter,(req,res) => {
    models.Worker.findOne({
        where : {id : req.params.idworker}
    })
    .then((worker) => {
        res.render('../views/recruiter/view-worker',{worker : worker})
    })
    .catch(err => {
        res.send(err)
    })
})

routes.get('/logout',(req,res) => {
    req.session.destroy(err=>{
        res.redirect('/')
    })
})

module.exports = routes;