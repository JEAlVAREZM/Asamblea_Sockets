

const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)

app.get('/', (req, res) => {
    res.sendFile(process.cwd()+'/register/index.html')
})

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
app.use(express.static('node_modules/bootstrap/dist'));