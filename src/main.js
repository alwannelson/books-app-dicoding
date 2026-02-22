const express = require('express')
const router = require('./routes.js')
const app = express()
const PORT = 9000
const HOST = 'localhost'

app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}\ncan acceess on:`)
    console.debug(`http://${HOST}:${PORT}`)
})