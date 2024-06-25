const express = require('express')
const server = express()

server.use((req, res) => {
  res.send('Estou criando uma nova :) 2024')
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('Server listening on http://localhost:' + PORT)
})
