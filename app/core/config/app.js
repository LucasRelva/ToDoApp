const express = require('express')
const cors = require('cors')

const app = express()
const server = require('http').createServer(app)

app.use(express.json())
app.use(cors())

server.listen(8000, () => {
    console.log('Server running at 8000')
})


