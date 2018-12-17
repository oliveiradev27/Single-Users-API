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
var usermodel = require('./test').userModel()

const route = router.get('/', (request, response, next) => {
    response.status(200).send({
        title : 'Node API',
        version : '0.0.1'
    })
})

const routeListUsers = router.get('/users', (request, response) => {
    var db = require('./test')
    usermodel.findAll().then(users => {
        response.status(200).send(users)
    })
})

const routeInsertUsers = router.post('/user', (request, response) => {
    var bodyRequest = request.body
    var db = require('./test')
    usermodel.create({
        id : bodyRequest.id,
        name : bodyRequest.name,
        bio : bodyRequest.bio,
        status : bodyRequest.status
    }).done(function(){
        response.status(200).send({
            message : "success!"
        })
    })
})

app.use('/', route)
app.use('/user', routeInsertUsers)
app.use('/user', routeListUsers)
server.listen(port)