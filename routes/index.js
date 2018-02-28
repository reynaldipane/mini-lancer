const routes = require('express').Router()
const admin  = require('./admin')
const worker = require('./worker')
const recruiter = require('./recruiter')

routes.use('/admin',admin)
routes.use('/worker',worker)
routes.use('/recruiter',recruiter)

module.exports = routes;