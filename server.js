const express = require('express')
const server = express()
const port = 5000

const routes = require('./routes/routes')

server.use(express.json());
server.use(routes);


server.listen(port, () => {
  console.log(`Server port ${port}`)
})