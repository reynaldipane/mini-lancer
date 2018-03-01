const routes = require('express').Router()
const models = require('../models')

routes.get('/',(req,res) => {
    res.send('Ini halaman admin')
})


routes.get('/listservice',(req,res) => {
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


routes.get('/addservice',(req,res) => {
    res.render('admin/formAddService',{})
})

routes.post('/addservice',(req,res) => {
    models.Service.create({
        name: req.body.service_name,
        description: req.body.description
    }).then(services => {
        res.redirect('/admin/listservice')
    }).catch(err => {
        res.send(err)
    })
})


routes.get('/editservice/:id',(req,res) => {
    models.Service.findById(req.params.id)
    .then(services => {
        res.render('admin/editService', {services: services})
    })
})

routes.post('/editservice/:id',(req,res) => {
    let objService = {
        name: req.body.service_name,
        description: req.body.description
    }

    models.Service.update(objService, {
        where: {
            id: req.params.id
        }
    }).then(services => {
        res.redirect('/admin/listservice')
    }).catch(err => {
        res.send(err)
    })
})


routes.get('/delservice/:id',(req,res) => {
    models.Service.destroy({
        where: {
            id: req.params.id
        }
    }).then(services => {
        res.redirect('/admin/listservice')
    }).catch(err => {
        res.send(err)
    })
})

module.exports = routes;