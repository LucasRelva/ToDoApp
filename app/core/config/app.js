const express = require('express')
const cors = require('cors')
const routes = require('../guards/routes')

require('./dbconnection')

const app = express()
const server = require('http').createServer(app)

app.use(express.json())
app.use(cors())
app.use(routes)

server.listen(8000, () => {
    console.log('Server running at 8000')
})
