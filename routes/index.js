const routes        = require('express').Router()
const admin         = require('./admin')
const worker        = require('./worker')
const recruiter     = require('./recruiter')
const models        = require('../models')

routes.get('/',(req,res) => {
    res.render('../views/register-login/home')
})

routes.use('/admin',admin)
routes.use('/worker',worker)
routes.use('/recruiter',recruiter)

routes.get('/register',(req,res) => {
    if(!req.query.err) {
        let err = ''
        res.render('../views/register-login/register', {err : err})
    } else {
        let err = req.query.err
        res.render('../views/register-login/register', {err : err})
    }
})

routes.post('/register',(req,res) => {
    if(req.body.role == "worker") {
        models.Worker.create({
            username : req.body.username,
            password : req.body.password,
            name     : req.body.name,
            email    : req.body.email,
            telp     : req.body.telp,
            status   : 1
        })
        .then(() => {
            res.render('../views/register-login/register-landing')
        })
        .catch((err) => {
            res.redirect(`/register?err=${err.message}`)
        })
    } else if (req.body.role == "recruiter") {
        models.Recruiter.create({
            username : req.body.username,
            password : req.body.password,
            name     : req.body.name,
            email    : req.body.email,
            telp     : req.body.telp
        })
        .then(() => {
            res.render('../views/register-login/register-landing')
        })
        .catch((err) => {
            res.redirect(`/register?err=${err.message}`)
        })
    }
})

routes.get('/login',(req,res) => {
    res.render('../views/register-login/login')
})

routes.post('/login',(req,res) => {
    if(req.body.role == "worker") {
        models.Worker.findOne({
            where : { 
                username : req.body.username,
                password : req.body.password
            }
        })
        .then(worker => {
            if(worker) {
                req.session.userid   = worker.id;
                req.session.username = worker.username;
                req.session.role     = "worker"
                res.redirect('/worker')
            } else {
                res.redirect('/login')
            }
        })
        .catch(err => {
            res.send(err)
        })
    } else if (req.body.role == "recruiter") {
        models.Recruiter.findOne({
            where : { 
                username : req.body.username,
                password : req.body.password
            }
        })
        .then(recruiter => {
            if (recruiter) {
                req.session.userid   = recruiter.id;
                req.session.username = recruiter.username;
                req.session.role     = "recruiter"
                res.redirect('/recruiter')
            } else {
                res.redirect('/login')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
})


module.exports = routes;