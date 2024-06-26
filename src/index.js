const express = require('express')
const server = express()


server.get('/', (req, res) => {
  res.sendFile(__dirname +'/html/index.html')
})

// server.use((req, res) => {
//   res.send('Retorno estudos nodejs 2024')
//   res.open('http://stackoverflow.com');
// })

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('Server listening on http://localhost:' + PORT)
})
