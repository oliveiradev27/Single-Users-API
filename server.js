const http = require("http")
const debug = require('debug')('nodestr:server')
const express = require('express')

const app = express()
const port = 3000
app.set('port', port)

const server = http.createServer(app)
const router = express.Router()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
var usermodel = require('./db').userModel()

const route = router.get('/', (request, response, next) => {
    response.status(200).send({
        title : 'Node API',
        version : '0.0.1'
    })
})

const routeListUsers = router.get('/users', (request, response) => {
    usermodel.findAll().then(users => {
        response.status(200).send(users)
    })
})

const routeListUsersActive = router.get('/users/active', (request, response) => {
    usermodel.findAll({where : {status : true}}).then(users => {
        response.status(200).send(users)
    })
})

const routeSingleUser = router.get('/user/:id', (request, response) => {
    usermodel.findById(request.params.id).then(user => {
        response.status(200).send(user)
    })
})

const routeInsertUsers = router.post('/user', (request, response) => {
    usermodel.create({
        id : request.body.id,
        name : request.body.name,
        bio : request.body.bio,
        status : request.body.status
    }).done(function(){
        response.status(201).send()
    })
    
})

const routeUpdateUsers = router.put('/user/:id', (request, response) => {
    usermodel.update({
        name : request.body.name,
        bio : request.body.bio,
        status : request.body.status
    },
    {
        where : {id : request.params.id}
    }
    ).done(function(){
        response.status(200).send()
    })
})

const routeDeleteUser = router.delete('/user/:id', (request, response) => {
    usermodel.destroy( {  where : {id : request.params.id} }
    ).done(function(){
        response.status(202).send()
    })
})

app.use('/', route)
app.use('/user', routeInsertUsers)
app.use('/users', routeListUsers)
app.use('/users/active', routeListUsersActive)
app.use('/user/:id', routeUpdateUsers)
app.use('/user/:id', routeSingleUser)
app.use('/user/:id', routeDeleteUser)
server.listen(port)