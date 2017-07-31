const { host, port } = require('./config.js')
const express = require('express')
const bodyParser = require('body-parser')

console.log(host, port)

//setup
const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))

//server stattup
app.listen(port, () => {
    console.log(`Server started at http://${host}:${port}`)
})