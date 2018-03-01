const routes = require('express').Router()
const models = require('../models')
const authAdmin     = require('../middlewares/authAdmin')

routes.get('/login',(req,res) => {
    res.render('../views/admin/admin-login')
})

routes.post('/login',(req,res) => {
    if(req.body.username == "admin" && req.body.password == "admin") {
        req.session.userid   = 1
        req.session.username = "admin"
        req.session.role     = "admin"
        res.redirect('/admin')
    } else {
        res.redirect('/admin/login')
    }
})

routes.get('/',authAdmin,(req,res) => {
    models.Service.findAll({
        order: [['id','ASC']]
      })
      .then(services => {
        //   res.send(services)
        res.render('admin/listService',{services:services});
      }).catch(err=>{
        res.send(err)
      });
})


routes.get('/addservice', authAdmin,(req,res) => {
    res.render('admin/formAddService',{})
})

routes.post('/addservice',authAdmin,(req,res) => {
    models.Service.create({
        name: req.body.service_name,
        description: req.body.description
    }).then(services => {
        res.redirect('/admin')
    }).catch(err => {
        res.send(err)
    })
})


routes.get('/editservice/:id', authAdmin,(req,res) => {
    models.Service.findById(req.params.id)
    .then(services => {
        res.render('admin/editService', {services: services})
    })
})

routes.post('/editservice/:id', authAdmin, (req,res) => {
    let objService = {
        name: req.body.service_name,
        description: req.body.description
    }

    models.Service.update(objService, {
        where: {
            id: req.params.id
        }
    }).then(services => {
        res.redirect('/admin')
    }).catch(err => {
        res.send(err)
    })
})


routes.get('/delservice/:id', authAdmin, (req,res) => {
    models.Service.findById(req.params.id)
    .then(service => {
        service.destroy()
        .then(() => {
            res.redirect('/admin')
        }).catch(err => {
            res.send(err)
        })
    })
})

module.exports = routes;